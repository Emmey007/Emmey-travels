const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'listing', required: false },
    reference: { type: String, unique: true },
    passengers: [{ name: String, passportNumber: String, dateOfBirth: Date }],
    occasion: { type: String },
    seats: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' },
    paystackReference: { type: String },
}, { timestamps: true })
module.exports = mongoose.model('booking', bookingSchema)