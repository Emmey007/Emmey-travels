const rateLimit = require('express-rate-limit')
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { status: false, message: 'Too many attempts. Please try again after 15 minutes.' }
})
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { status: false, message: 'Too many requests. Please try again later.' }
})
module.exports = { authLimiter, generalLimiter }
