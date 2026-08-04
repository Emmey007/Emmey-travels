const express = require('express')
const router = express.Router()
const { getNotifications, markAllRead } = require('../controllers/notification')
const tokenVerification = require('../middlewares/verify')

router.get('/', tokenVerification, getNotifications)
router.put('/mark-read', tokenVerification, markAllRead)

module.exports = router