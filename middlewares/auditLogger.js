const AuditLog = require('../models/auditLog')
const auditLogger = (action) => async (req, res, next) => {
    try {
        await AuditLog.create({
            user: req.user?.userID,
            action,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
        })
    } catch (error) {
        console.log('Audit log error:', error.message)
    }
    next()
}
module.exports = auditLogger
