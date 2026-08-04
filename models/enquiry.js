const mongoose = require('mongoose')
const enquirySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'listing' },
    status: { type: String, enum: ['open', 'resolved'], default: 'open' },
    adminReply: { type: String, default: '' },
}, { timestamps: true })
module.exports = mongoose.model('enquiry', enquirySchema)
