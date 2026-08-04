const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const User = require('../models/user')
const envObj = require('../config/env')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')
const { sendVerificationEmail } = require('../utils/mailer')

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ status: false, message: 'All fields are required' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ status: false, message: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(Number(envObj.salt))
        const hashedPassword = await bcrypt.hash(password, salt)

        const verificationToken = crypto.randomBytes(32).toString('hex')
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            verificationToken,
            verificationTokenExpiry,
        })

        await sendVerificationEmail(user, verificationToken)

        return res.status(201).json({
            status: true,
            message: 'Account created successfully. Please check your email to verify your account.',
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ status: false, message: 'All fields are required' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ status: false, message: 'Invalid credentials' })
        }

        if (!user.isVerified) {
            return res.status(403).json({ status: false, message: 'Please verify your email before logging in', isVerified: false })
        }

        if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.status(403).json({ status: false, message: 'Account locked. Try again later.' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            user.loginAttempts += 1
            if (user.loginAttempts >= 5) {
                user.lockUntil = new Date(Date.now() + 15 * 60 * 1000)
            }
            await user.save()
            return res.status(400).json({ status: false, message: 'Invalid credentials' })
        }

        user.loginAttempts = 0
        user.lockUntil = null
        user.lastLogin = new Date()
        await user.save()

        const payload = { userID: user._id, role: user.role, name: user.name }
        const token = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload)

        user.refreshToken = refreshToken
        await user.save()

        return res.status(200).json({
            status: true,
            message: 'Login successful',
            token,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { token, id } = req.query

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send('<h1>User not found</h1>')
        }

        if (user.isVerified) {
            return res.status(200).send('<h1>Email already verified. You can log in.</h1>')
        }

        if (user.verificationToken !== token || user.verificationTokenExpiry < Date.now()) {
            return res.status(400).send('<h1>Invalid or expired verification link.</h1>')
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiry = undefined
        await user.save()

        return res.status(200).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Email Verified - EMMEY Travels</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
                <style>
                    body { font-family: 'Inter', sans-serif; background: #0a1628; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
                    .card { background: #fff; border-radius: 16px; padding: 48px; text-align: center; max-width: 400px; }
                    h1 { color: #0a1628; font-size: 24px; margin-bottom: 12px; }
                    p { color: #666; font-size: 14px; margin-bottom: 24px; }
                    a { display: inline-block; padding: 12px 32px; background: #c9a84c; color: #0a1628; border-radius: 8px; font-weight: 700; text-decoration: none; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Email Verified!</h1>
                    <p>Your EMMEY Travels account is now active. You can log in.</p>
                    <a href="${envObj.clientUrl}/login">Go to Login</a>
                </div>
            </body>
            </html>
        `)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const resendVerification = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' })
        }

        if (user.isVerified) {
            return res.status(400).json({ status: false, message: 'Email already verified' })
        }

        const verificationToken = crypto.randomBytes(32).toString('hex')
        user.verificationToken = verificationToken
        user.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
        await user.save()

        await sendVerificationEmail(user, verificationToken)

        return res.status(200).json({ status: true, message: 'Verification email resent' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = { registerUser, loginUser, verifyEmail, resendVerification }