const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'listing', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
}, { timestamps: true })
module.exports = mongoose.model('review', reviewSchema)
