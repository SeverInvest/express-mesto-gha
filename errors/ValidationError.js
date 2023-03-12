const { STATUS_BAD_REQUEST } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class ValidationError extends ApplicationError {
  constructor(message) {
    super();
    this.status = STATUS_BAD_REQUEST;
    this.message = message;
  }
}
//  'Incorrect data'

module.exports = ValidationError;
