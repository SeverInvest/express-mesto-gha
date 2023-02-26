const { STATUS_NOT_FOUND } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class CardNotFoundError extends ApplicationError {
  constructor() {
    super(STATUS_NOT_FOUND, 'Card not found');
  }
}

module.exports = CardNotFoundError;
