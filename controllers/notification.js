const Notification = require('../models/notification')

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.userID })
            .sort({ createdAt: -1 })
            .limit(20)

        const unreadCount = await Notification.countDocuments({ user: req.user.userID, isRead: false })

        return res.status(200).json({
            status: true,
            notifications,
            unreadCount,
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

const markAllRead = async (req, res) => {
    try {
        await Notification.updateMany({ user: req.user.userID, isRead: false }, { isRead: true })
        return res.status(200).json({ status: true, message: 'All notifications marked as read' })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = { getNotifications, markAllRead }