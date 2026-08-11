const Enquiry = require('../models/enquiry')
const Notification = require('../models/notification')
const User = require('../models/user')
const { sendEnquiryConfirmation, sendAdminEnquiryAlert } = require('../utils/mailer')

const createEnquiry = async (req, res) => {
    try {
        const { name, email, message, listing } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({ status: false, message: 'All fields are required' })
        }

        const enquiry = await Enquiry.create({
            user: req.user?.userID || null,
            name,
            email,
            message,
            listing: listing || null,
        })

        await sendEnquiryConfirmation({ name, email }, message)

        const admins = await User.find({ role: { $in: ['admin', 'superadmin'] } })
        for (const admin of admins) {
            await sendAdminEnquiryAlert(admin, { name, email, message })
            await Notification.create({
                user: admin._id,
                message: `New enquiry from ${name} (${email})`,
                type: 'enquiry',
            })
        }

        return res.status(201).json({
            status: true,
            message: 'Enquiry submitted successfully',
            enquiry,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find()
            .populate('user', 'name email')
            .populate('listing', 'title origin destination')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            status: true,
            enquiries,
            total: enquiries.length,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const replyToEnquiry = async (req, res) => {
    try {
        const { id } = req.params
        const { adminReply } = req.body

        if (!adminReply) {
            return res.status(400).json({ status: false, message: 'Reply is required' })
        }

        const enquiry = await Enquiry.findByIdAndUpdate(
            id,
            { adminReply, status: 'resolved' },
            { new: true }
        )

        if (!enquiry) {
            return res.status(404).json({ status: false, message: 'Enquiry not found' })
        }

        if (enquiry.user) {
            await Notification.create({
                user: enquiry.user,
                message: `Your enquiry has been replied to by EMMEY Travels support.`,
                type: 'enquiry',
            })
        }

        return res.status(200).json({
            status: true,
            message: 'Reply sent successfully',
            enquiry,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.params
        const enquiry = await Enquiry.findByIdAndDelete(id)
        if (!enquiry) {
            return res.status(404).json({ status: false, message: 'Enquiry not found' })
        }
        return res.status(200).json({ status: true, message: 'Enquiry deleted' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = { createEnquiry, getAllEnquiries, replyToEnquiry, deleteEnquiry }