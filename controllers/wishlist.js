const Wishlist = require('../models/wishlist')

const addToWishlist = async (req, res) => {
    try {
        const { listingId } = req.body

        if (!listingId) {
            return res.status(400).json({ status: false, message: 'Listing ID is required' })
        }

        const existing = await Wishlist.findOne({ user: req.user.userID, listing: listingId })
        if (existing) {
            return res.status(400).json({ status: false, message: 'Already in wishlist' })
        }

        const wishlist = await Wishlist.create({
            user: req.user.userID,
            listing: listingId,
        })

        return res.status(201).json({ status: true, message: 'Added to wishlist', wishlist })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ user: req.user.userID })
            .populate('listing')
            .sort({ createdAt: -1 })

        return res.status(200).json({ status: true, wishlist, total: wishlist.length })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params

        const item = await Wishlist.findOneAndDelete({ user: req.user.userID, listing: id })
        if (!item) {
            return res.status(404).json({ status: false, message: 'Item not found in wishlist' })
        }

        return res.status(200).json({ status: true, message: 'Removed from wishlist' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = { addToWishlist, getWishlist, removeFromWishlist }