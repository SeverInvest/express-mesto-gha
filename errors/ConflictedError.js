const { STATUS_CONFLICTED } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class ConflictedError extends ApplicationError {
  constructor() {
    super(STATUS_CONFLICTED, 'Such a user already exists');
  }
}

module.exports = ConflictedError;
