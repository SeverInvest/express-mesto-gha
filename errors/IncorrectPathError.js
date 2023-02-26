// const { STATUS_NOT_FOUND } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class IncorrectPathError extends ApplicationError {
  constructor() {
    super(404, 'Incorrect path');
  }
}

module.exports = IncorrectPathError;
