const crypto = require('crypto');

function generateShortKey(url, length = 8) {
    return crypto
        .createHash('sha256')
        .update(url)
        .digest('base64url')
        .substring(0, length);
}

module.exports = { generateShortKey };