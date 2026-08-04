const sanitize = (obj) => {
    const sanitized = {}
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            sanitized[key] = obj[key].replace(/[$.]/, '')
        } else {
            sanitized[key] = obj[key]
        }
    }
    return sanitized
}
module.exports = sanitize
