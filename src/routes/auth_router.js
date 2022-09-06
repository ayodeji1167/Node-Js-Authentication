const express = require("express");
const {signup, login, logout,handleRefreshToken} = require("../controller/auth");
const getAllUsers = require("../controller/user-controller");
const authRouter = express.Router();
const verifyToken = require("../middleware/verify_token");


authRouter.post("/signup", signup)
authRouter.post("/login",login);
authRouter.get('/logout',logout )
authRouter.get('/refresh', handleRefreshToken)

//Add user routes for examples

authRouter.get('/all', verifyToken , getAllUsers )

module.exports = authRouter