const express = require('express')
const router = express.Router()
const { getAllUsers } = require('../controllers/user')
const tokenVerification = require('../middlewares/verify')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', tokenVerification, isAdmin, getAllUsers)

module.exports = router