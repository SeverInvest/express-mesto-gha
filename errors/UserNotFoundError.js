const { STATUS_NOT_FOUND } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class UserNotFoundError extends ApplicationError {
  constructor() {
    super(STATUS_NOT_FOUND, 'User not found');
  }
}

module.exports = UserNotFoundError;
