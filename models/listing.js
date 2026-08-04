const mongoose = require('mongoose')
const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['flight', 'bus', 'ship-cruise', 'boat-cruise'], required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    continent: { type: String, required: true },
    departureDate: { type: Date, required: true },
    returnDate: { type: Date },
    duration: { type: String },
    price: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    seatsAvailable: { type: Number, required: true },
    image: { type: String, default: '' },
    imageId: { type: String, default: '' },
    description: { type: String },
    isAvailable: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true })
module.exports = mongoose.model('listing', listingSchema)
