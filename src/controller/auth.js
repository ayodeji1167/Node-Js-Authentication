const BadRequestError = require("../error/bad_request_error");
const UserModel = require("../model/user-model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const createToken = require('../utils/crypto')
const UnAuthorizedError = require("../error/unauthorized_error");
const ConflictError = require("../error/conflict-error");
require("dotenv").config();

const signup = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        throw new BadRequestError('Username and password required')
    }
    const foundUser = await UserModel.findOne({ userName });
    if (foundUser) {
        throw new ConflictError('User Exist')
    }

    try {
        //Encrypt the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const member = await UserModel.create({ ...req.body, password: hashedPassword });
        res.status(200).json({ mssg: "User Created  successfully", member })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const login = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        throw new BadRequestError('Username and password required')
    }
    //Checking if User Exist by username
    const user = await UserModel.findOne({ userName });
    if (!user) {
        throw new UnAuthorizedError("User Doesn't Exist")
    }

    //Check If the users password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new UnAuthorizedError("Invalid Password")
    }

    //Get user Roles
    const roles = Object.values(user.roles).filter(Boolean)
    //Generate Token
    const acessToken = createToken({ userName, roles }, '120s')
    const refreshToken = createToken({ userName }, '1d')

    //Save the refres token to the user
    user.refreshToken = refreshToken;
    const result = await user.save()

    //Set a cookie for the  refresh token
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

    res.status(200).json({
        mssg: "User Logged In Successfully",
        acessToken,
        roles,
        userName: result.userName
    })
}

const handleRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.jwt
    if (!refreshToken) {
        throw new UnAuthorizedError('Token is not present')
    }
    console.log(refreshToken);

    const foundUser = await UserModel.find({ refreshToken })

    if (!foundUser) {
        return res.status(403).json({ message: 'forbidden' })
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || foundUser.userName !== decoded.userName) {
            return res.status(403).json({ message: 'forbidden' })
        }
        const roles = Object.values(user.roles).filter(Boolean)
        //Generate Token
        const acessToken = createToken({ userName: decoded.userName, roles }, '120s')
        res.status(200).json({
            acessToken,
            roles,
        })
    })
}

const logout = async (req, res) => {
    // On client , delete the access token
    const refreshToken = req.cookies.jwt
    if (!refreshToken) {
        throw new UnAuthorizedError('Token is not present')
    }

    const foundUser = await UserModel.find({ refreshToken })

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.status(204)
    }

    foundUser.refreshToken = ''
    await foundUser.save()
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    return res.status(204)
}



module.exports = { signup, login, logout, handleRefreshToken };