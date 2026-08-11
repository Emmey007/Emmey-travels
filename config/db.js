const mongoose = require('mongoose')
const envObj = require('./env')

let isConnected = false

const connectDB = async () => {
    if (isConnected) return

    try {
        const db = await mongoose.connect(envObj.mongodbUrl, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })
        isConnected = true
        console.log('EMMEY Travels Database Connected Successfully')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB