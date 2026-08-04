const jwt = require('jsonwebtoken')
const envObj = require('../config/env')
const tokenVerification = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: false, message: 'Access denied. No token provided.' })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, envObj.jwtSecret)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ status: false, message: 'Invalid or expired token.' })
    }
}
module.exports = tokenVerification
