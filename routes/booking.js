const express = require('express')
const router = express.Router()
const {
    createBooking,
    getUserBookings,
    getAllBookings,
    updateBookingStatus,
    deleteBooking,
} = require('../controllers/booking')
const tokenVerification = require('../middlewares/verify')
const isAdmin = require('../middlewares/isAdmin')
const { generalLimiter } = require('../middlewares/rateLimiter')

router.post('/', tokenVerification, generalLimiter, createBooking)
router.get('/my-bookings', tokenVerification, getUserBookings)
router.get('/', tokenVerification, isAdmin, getAllBookings)
router.put('/:id', tokenVerification, isAdmin, updateBookingStatus)
router.delete('/:id', tokenVerification, isAdmin, deleteBooking)

module.exports = router