const jwt = require('jsonwebtoken')
const envObj = require('../config/env')
const generateAccessToken = (payload) => jwt.sign(payload, envObj.jwtSecret, { expiresIn: envObj.jwtExpire })
const generateRefreshToken = (payload) => jwt.sign(payload, envObj.jwtRefreshSecret, { expiresIn: envObj.jwtRefreshExpire })
module.exports = { generateAccessToken, generateRefreshToken }
