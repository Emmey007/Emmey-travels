const express = require('express')
const router = express.Router()
const {
    createListing,
    getAllListings,
    getSingleListing,
    updateListing,
    deleteListing,
} = require('../controllers/listing')
const tokenVerification = require('../middlewares/verify')
const isAdmin = require('../middlewares/isAdmin')
const { upload } = require('../utils/multer')
const { generalLimiter } = require('../middlewares/rateLimiter')

router.get('/', generalLimiter, getAllListings)
router.get('/:id', generalLimiter, getSingleListing)
router.post('/', tokenVerification, isAdmin, upload.single('image'), createListing)
router.put('/:id', tokenVerification, isAdmin, updateListing)
router.delete('/:id', tokenVerification, isAdmin, deleteListing)

module.exports = router