const { STATUS_UNAUTHORIZED_ERROR } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class UnauthorizedError extends ApplicationError {
  constructor() {
    super(STATUS_UNAUTHORIZED_ERROR, 'Incorrect password or email');
  }
}

module.exports = UnauthorizedError;
