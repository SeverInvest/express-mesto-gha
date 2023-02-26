const { STATUS_BAD_REQUEST } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class ValidationError extends ApplicationError {
  constructor() {
    super(STATUS_BAD_REQUEST, 'Incorrect data');
  }
}

module.exports = ValidationError;
