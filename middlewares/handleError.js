const mongoose = require('mongoose');
const ValidationError = require('../errors/ValidationError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictedError = require('../errors/ConflictedError');
const ForbiddenError = require('../errors/ForbiddenError');

function handleError(error, req, res, next) {
  let err = error;
  switch (true) {
    case error.message === 'Validation failed':
      err = new ValidationError('Incorrect data');
      break;
    case error.code === 11000:
      err = new ConflictedError('Such a user already exists');
      break;
    case error instanceof mongoose.Error.ValidationError:
      err = new ValidationError('Incorrect data');
      break;
    case error instanceof mongoose.Error.CastError:
      err = new ValidationError('Incorrect data');
      break;
    case error instanceof NotFoundError:
      break;
    case error instanceof ForbiddenError:
      break;
    case error instanceof UnauthorizedError:
      break;
    case error instanceof ValidationError:
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
