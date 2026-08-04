const mongoose = require('mongoose')
const wishlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'listing', required: true },
}, { timestamps: true })
module.exports = mongoose.model('wishlist', wishlistSchema)
