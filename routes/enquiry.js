const express = require('express')
const router = express.Router()
const { createEnquiry, getAllEnquiries, replyToEnquiry, deleteEnquiry } = require('../controllers/enquiry')
const tokenVerification = require('../middlewares/verify')
const isAdmin = require('../middlewares/isAdmin')
const { generalLimiter } = require('../middlewares/rateLimiter')

router.post('/', generalLimiter, createEnquiry)
router.get('/', tokenVerification, isAdmin, getAllEnquiries)
router.put('/:id/reply', tokenVerification, isAdmin, replyToEnquiry)
router.delete('/:id', tokenVerification, isAdmin, deleteEnquiry)

module.exports = router