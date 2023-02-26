class ApplicationError extends Error {
  constructor(status = 500, message = 'Internal Server Error') {
    super();
    this.message = message;
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApplicationError;
