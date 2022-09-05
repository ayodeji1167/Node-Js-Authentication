const CustomError = require("./custom_error");

class UnAuthorizedError extends CustomError{
    constructor(message){
        super(message);
        this.statusCode = 401
    }
}

module.exports = UnAuthorizedError;