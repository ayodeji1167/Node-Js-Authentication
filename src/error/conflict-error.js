const CustomError = require('./custom_error');

class ConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
