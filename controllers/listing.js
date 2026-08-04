const Listing = require('../models/listing')
const { cloudinary } = require('../config/cloudinary')

const createListing = async (req, res) => {
    try {
        const {
            title, type, origin, destination, continent,
            departureDate, returnDate, duration, price,
            currency, seatsAvailable, description
        } = req.body

        if (!title || !type || !origin || !destination || !continent || !departureDate || !price || !seatsAvailable) {
            return res.status(400).json({ status: false, message: 'All required fields must be filled' })
        }

        if (!req.file) {
            return res.status(400).json({ status: false, message: 'Image is required' })
        }

        const stream = cloudinary.uploader.upload_stream(
            { folder: 'emmey-travels/listings' },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ status: false, message: 'Image upload failed' })
                }

                const listing = await Listing.create({
                    title,
                    type,
                    origin,
                    destination,
                    continent,
                    departureDate,
                    returnDate,
                    duration,
                    price,
                    currency: currency || 'NGN',
                    seatsAvailable,
                    description,
                    image: result.secure_url,
                    imageId: result.public_id,
                    createdBy: req.user.userID,
                })

                return res.status(201).json({
                    status: true,
                    message: 'Listing created successfully',
                    listing,
                })
            }
        )

        stream.end(req.file.buffer)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const getAllListings = async (req, res) => {
    try {
        const { type, continent, search } = req.query

        const filter = {}
        if (type) filter.type = type
        if (continent) filter.continent = continent
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { origin: { $regex: search, $options: 'i' } },
                { destination: { $regex: search, $options: 'i' } },
            ]
        }

        const listings = await Listing.find(filter).sort({ createdAt: -1 })

        return res.status(200).json({
            status: true,
            message: 'Listings fetched successfully',
            listings,
            total: listings.length,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const getSingleListing = async (req, res) => {
    try {
        const { id } = req.params
        const listing = await Listing.findById(id)

        if (!listing) {
            return res.status(404).json({ status: false, message: 'Listing not found' })
        }

        return res.status(200).json({
            status: true,
            message: 'Listing fetched successfully',
            listing,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const updateListing = async (req, res) => {
    try {
        const { id } = req.params

        const listing = await Listing.findById(id)
        if (!listing) {
            return res.status(404).json({ status: false, message: 'Listing not found' })
        }

        const updatedListing = await Listing.findByIdAndUpdate(id, req.body, { new: true })

        return res.status(200).json({
            status: true,
            message: 'Listing updated successfully',
            listing: updatedListing,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

const deleteListing = async (req, res) => {
    try {
        const { id } = req.params

        const listing = await Listing.findById(id)
        if (!listing) {
            return res.status(404).json({ status: false, message: 'Listing not found' })
        }

        if (listing.imageId) {
            await cloudinary.uploader.destroy(listing.imageId)
        }

        await Listing.findByIdAndDelete(id)

        return res.status(200).json({
            status: true,
            message: 'Listing deleted successfully',
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = { createListing, getAllListings, getSingleListing, updateListing, deleteListing }
