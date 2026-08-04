const User = require('../models/user')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        return res.status(200).json({
            status: true,
            message: 'Users fetched successfully',
            users,
            total: users.length,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = { getAllUsers }