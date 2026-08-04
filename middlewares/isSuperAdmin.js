const isSuperAdmin = (req, res, next) => {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ status: false, message: 'Access denied. Super admins only.' })
    }
    next()
}
module.exports = isSuperAdmin
