const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ status: false, message: 'Access denied. Admins only.' })
    }
    next()
}
module.exports = isAdmin
