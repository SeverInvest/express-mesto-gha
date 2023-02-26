const { STATUS_INTERNAL_SERVER_ERROR } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class InternalServerError extends ApplicationError {
  constructor() {
    super(STATUS_INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
}

module.exports = InternalServerError;
