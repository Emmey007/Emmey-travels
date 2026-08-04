const cloudinary = require('cloudinary').v2
const envObj = require('./env')
cloudinary.config({
    cloud_name: envObj.cloudinaryName,
    api_key: envObj.cloudinaryApiKey,
    api_secret: envObj.cloudinaryApiSecret,
})
module.exports = { cloudinary }
