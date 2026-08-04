const Booking = require('../models/booking')
const Listing = require('../models/listing')
const Notification = require('../models/notification')
const User = require('../models/user')
const { sendBookingConfirmation, sendBookingFailure, sendAdminBookingAlert } = require('../utils/mailer')
const crypto = require('crypto')

const generateReference = () => {
    return 'EMT-' + crypto.randomBytes(4).toString('hex').toUpperCase()
}

const createBooking = async (req, res) => {
    try {
        const { listing, seats, occasion, passengers, totalPrice, currency } = req.body

        if (!seats || !occasion || !passengers || !totalPrice) {
            return res.status(400).json({ status: false, message: 'All fields are required' })
        }

       const mongoose = require("mongoose");

let listingData = null;

if (listing) {
    if (!mongoose.Types.ObjectId.isValid(listing)) {
        return res.status(400).json({
            status: false,
            message: "Invalid listing ID",
        });
    }

    listingData = await Listing.findById(listing);

    if (!listingData) {
        return res.status(404).json({
            status: false,
            message: "Listing not found",
        });
    }

    if (listingData.seatsAvailable < seats) {
        return res.status(400).json({
            status: false,
            message: "Not enough seats available",
        });
    }
}

        const reference = generateReference()

        const booking = await Booking.create({
            user: req.user.userID,
            listing: listing || null,
            reference,
            seats,
            occasion,
            passengers,
            totalPrice,
            currency: currency || 'NGN',
            status: 'confirmed',
            paymentStatus: 'unpaid',
        })

        if (listingData) {
            listingData.seatsAvailable -= seats
            await listingData.save()
        }

        const user = await User.findById(req.user.userID)

        await sendBookingConfirmation(user, { ...booking.toObject(), listing: listingData })

        await Notification.create({
            user: req.user.userID,
            message: `Your booking to ${listingData?.destination || 'your destination'} (${reference}) has been confirmed!`,
            type: 'booking',
        })

        const admins = await User.find({ role: { $in: ['admin', 'superadmin'] } })
        for (const admin of admins) {
            await sendAdminBookingAlert(admin, user, { ...booking.toObject(), listing: listingData })
            await Notification.create({
                user: admin._id,
                message: `New booking by ${user.name} — ${reference} to ${listingData?.destination || 'unknown destination'}`,
                type: 'booking',
            })
        }

        return res.status(201).json({
            status: true,
            message: 'Booking confirmed successfully',
            booking,
            reference,
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.userID })
            .populate('listing')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            status: true,
            message: 'Bookings fetched successfully',
            bookings,
            total: bookings.length,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('listing')
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            status: true,
            message: 'All bookings fetched successfully',
            bookings,
            total: bookings.length,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true })
        if (!booking) {
            return res.status(404).json({ status: false, message: 'Booking not found' })
        }

        await Notification.create({
            user: booking.user,
            message: `Your booking ${booking.reference} has been ${status}.`,
            type: 'booking',
        })

        return res.status(200).json({
            status: true,
            message: 'Booking status updated',
            booking,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params
        const booking = await Booking.findByIdAndDelete(id)
        if (!booking) {
            return res.status(404).json({ status: false, message: 'Booking not found' })
        }
        return res.status(200).json({ status: true, message: 'Booking deleted successfully' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = { createBooking, getUserBookings, getAllBookings, updateBookingStatus, deleteBooking }
