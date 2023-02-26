// const { STATUS_NOT_FOUND } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class UserNotFoundError extends ApplicationError {
  constructor() {
    super(404, 'User not found');
    // this.status = STATUS_NOT_FOUND;
    // this.message = 'User not found';
    // this.name = 'UserNotFoundError';
  }
}

module.exports = UserNotFoundError;
