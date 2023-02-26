// const { STATUS_NOT_FOUND } = require('../utils/statuses');
const ApplicationError = require('./ApplicationError');

class CardNotFoundError extends ApplicationError {
  constructor() {
    super(404, 'Card not found');
  }
}

module.exports = CardNotFoundError;
