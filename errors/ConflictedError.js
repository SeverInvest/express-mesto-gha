const { STATUS_CONFLICTED } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class ConflictedError extends ApplicationError {
  constructor(message) {
    super();
    this.status = STATUS_CONFLICTED;
    this.message = message;
  }
}
// 'Such a user already exists'

module.exports = ConflictedError;
