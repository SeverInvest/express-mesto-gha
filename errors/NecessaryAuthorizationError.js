const { STATUS_UNAUTHORIZED_ERROR } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class NecessaryAuthorizationError extends ApplicationError {
  constructor() {
    super(STATUS_UNAUTHORIZED_ERROR, 'needed authorization');
  }
}

module.exports = NecessaryAuthorizationError;
