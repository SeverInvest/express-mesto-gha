const ApplicationError = require('./ApplicationError');

class InternalServerError extends ApplicationError {
  constructor() {
    super(500, 'Internal Server Error');
  }
}

module.exports = InternalServerError;
