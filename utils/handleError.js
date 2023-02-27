const mongoose = require('mongoose');
const ValidationError = require('../errors/ValidationError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');

function handleError(error, req, res, next) {
  let err = error;
  switch (true) {
    case error instanceof mongoose.Error.ValidationError:
      err = new ValidationError();
      break;
    case error instanceof mongoose.Error.CastError:
      err = new ValidationError();
      break;
    case error instanceof NotFoundError:
      break;
    default:
      err = new InternalServerError();
      break;
  }
  res.status(err.status);
  res.send({ message: err.message });
  next();
}

module.exports = handleError;
