const mongoose = require('mongoose');
const ValidationError = require('../errors/ValidationError');
const ConflictedError = require('../errors/ConflictedError');
const NotFoundError = require('../errors/NotFoundError');

function handleError(error, _, res, next) {
  let err = error;

  if (error instanceof mongoose.Error) {
    switch (true) {
      case error instanceof mongoose.Error.DocumentNotFoundError:
        err = new NotFoundError('Data not found');
        break;
      default:
        err = new ValidationError('Incorrect data');
        break;
    }
  } else {
    switch (true) {
      case error.code === 11000:
        err = new ConflictedError('Such a user already exists');
        break;
      default:
        if (!error.status) {
          err.status = 500;
          err.message = 'Internal server error';
        }
        break;
    }
  }
  res.status(err.status);
  res.send({ message: err.message });
  next();
}

module.exports = handleError;
