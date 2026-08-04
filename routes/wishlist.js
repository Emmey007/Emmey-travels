const express = require('express')
const router = express.Router()
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlist')
const tokenVerification = require('../middlewares/verify')

router.post('/', tokenVerification, addToWishlist)
router.get('/', tokenVerification, getWishlist)
router.delete('/:id', tokenVerification, removeFromWishlist)

module.exports = router