require('dotenv').config()
module.exports = {
    port: process.env.PORT || 4000,
    mongodbUrl: process.env.MONGODB_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '7d',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE || '30d',
    salt: process.env.SALT || 10,
    baseUrl: process.env.BASE_URL || 'https://emmey-travels.vercel.app/api/v1',
    clientUrl: process.env.CLIENT_URL || 'https://emmey-travels.vercel.app',
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    gmailUser: process.env.GMAIL_USER,
    gmailPass: process.env.GMAIL_PASS,
    paystackSecret: process.env.PAYSTACK_SECRET_KEY,
}