const express = require('express')
const router = express.Router()
const { registerUser, loginUser, verifyEmail, resendVerification } = require('../controllers/auth')
const { authLimiter } = require('../middlewares/rateLimiter')

router.post('/register', authLimiter, registerUser)
router.post('/login', authLimiter, loginUser)
router.get('/verify-email', verifyEmail)
router.post('/resend-verification', resendVerification)

module.exports = router