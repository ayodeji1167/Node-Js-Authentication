const express = require("express");
const {signup, login, logout,handleRefreshToken} = require("../controller/auth");
const authRouter = express.Router();
const validateSchema = require('../middleware/validate_schema');
const verifyToken = require("../middleware/verify_token");
const {memberSchema,memberLoginSchema} = require("../schema/member_schema");


authRouter.post("/signup", signup)
authRouter.post("/login",login);
authRouter.get('/logout',logout )
authRouter.get('/refresh', handleRefreshToken)


module.exports = authRouter