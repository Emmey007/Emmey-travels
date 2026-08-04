const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
    avatar: { type: String, default: '' },
    avatarId: { type: String, default: '' },
    phone: { type: String, default: '' },
    passportNumber: { type: String, default: '' },
    dateOfBirth: { type: Date },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpiry: { type: Date },
    refreshToken: { type: String },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    lastLogin: { type: Date },
}, { timestamps: true })
module.exports = mongoose.model('user', userSchema)
