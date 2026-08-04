const mongoose = require('mongoose')
const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    type: { type: String, enum: ['booking', 'payment', 'enquiry', 'general'], default: 'general' },
}, { timestamps: true })
module.exports = mongoose.model('notification', notificationSchema)
