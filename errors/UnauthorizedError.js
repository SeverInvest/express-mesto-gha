const { STATUS_UNAUTHORIZED_ERROR } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super();
    this.status = STATUS_UNAUTHORIZED_ERROR;
    this.message = message;
  }
}
// 'Incorrect password or email'
// 'Needed authorization'

module.exports = UnauthorizedError;
