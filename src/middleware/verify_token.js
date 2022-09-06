const jwt = require("jsonwebtoken");
const BadRequestError = require("../error/bad_request_error");
require("dotenv").config();


const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) {
        throw new BadRequestError("Token Not Found");
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401)
    }

    const token = authHeader.split(' ')[1];


    jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
        if (err) {
            
            return res.status(403).json({mssg:'token has expired'})
        };//invalid token
        req.user = decodedData.userName;
        req.roles = decodedData.roles;

        return next()

    })

}

module.exports = verifyToken;