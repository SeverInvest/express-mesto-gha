const { STATUS_NOT_FOUND } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class IncorrectPathError extends ApplicationError {
  constructor() {
    super(STATUS_NOT_FOUND, 'Incorrect path');
  }
}

module.exports = IncorrectPathError;
