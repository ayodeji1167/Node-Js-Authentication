const errorHandler = (err, req, res, next)=>{
    const ApiErrorObject = {
        message: err.message || "Internal Server Error",
        statusCode: err.statusCode || 500
    }
    res.status(ApiErrorObject.statusCode).json({mssg: ApiErrorObject.message})
}

module.exports = errorHandler;