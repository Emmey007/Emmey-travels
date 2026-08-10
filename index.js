const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const connectDB = require('./config/db')
const envObj = require('./config/env')

const authRoute = require('./routes/auth')
const listingRoute = require('./routes/listing')
const bookingRoute = require('./routes/booking')
const wishlistRoute = require('./routes/wishlist')
const enquiryRoute = require('./routes/enquiry')
const reviewRoute = require('./routes/review')
const notificationRoute = require('./routes/notification')
const paymentRoute = require('./routes/payment')
const userRoute = require('./routes/user')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }))

server.use('/api/v1/auth', authRoute)
server.use('/api/v1/listing', listingRoute)
server.use('/api/v1/booking', bookingRoute)
server.use('/api/v1/wishlist', wishlistRoute)
server.use('/api/v1/enquiry', enquiryRoute)
server.use('/api/v1/review', reviewRoute)
server.use('/api/v1/notification', notificationRoute)
server.use('/api/v1/payment', paymentRoute)
server.use('/api/v1/user', userRoute)

server.get('/', (req, res) => {
    res.send('Welcome to EMMEY Travels API')
})

connectDB()

if (require.main === module) {
    server.listen(envObj.port, () => {
        console.log(`EMMEY Travels server running on port ${envObj.port}`)
    })
}

module.exports = server