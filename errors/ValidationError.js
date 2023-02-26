// const { STATUS_NOT_FOUND } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class ValidationError extends ApplicationError {
  constructor() {
    super(400, 'Uncorrect data');
    // this.status = STATUS_NOT_FOUND;
    // this.message = 'User not found';
    // this.name = 'UserNotFoundError';
  }
}

module.exports = ValidationError;
