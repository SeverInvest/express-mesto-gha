const { STATUS_INTERNAL_SERVER_ERROR } = require('../utils/statuses');

class ApplicationError extends Error {
  constructor(
    status = STATUS_INTERNAL_SERVER_ERROR,
    message = 'Internal Server Error',
  ) {
    super();
    this.message = message;
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApplicationError;
