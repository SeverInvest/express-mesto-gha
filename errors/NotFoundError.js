const { STATUS_NOT_FOUND } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class NotFoundError extends ApplicationError {
  constructor() {
    super(STATUS_NOT_FOUND, 'Resource not found');
  }
}

module.exports = NotFoundError;
