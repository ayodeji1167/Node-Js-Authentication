const jwt = require("jsonwebtoken");
const BadRequestError = require("../error/bad_request_error");
require("dotenv").config();


const verifyToken = async (req,res,next)=>{
    const token = req.header("Authorization");
    if(!token){
        throw new BadRequestError("Token Not Found");
    }

    // Implements Starts with BEARER

    const isVerified = jwt.verify(token , process.env.JWT_SECRET)
    if(!isVerified){
        throw new UnAuthorizedError("Access Denied")
    }

    return next()

}

module.exports = verifyToken;