const { STATUS_NOT_FOUND } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class NotFoundError extends ApplicationError {
  constructor(message) {
    super();
    this.status = STATUS_NOT_FOUND;
    this.message = message;
  }
}
// 'Resource not found'

module.exports = NotFoundError;
