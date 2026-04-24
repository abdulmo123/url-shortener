const crypto = require('crypto');
const { db } = require('./db');

function generateShortKey(url, length = 8) {
    return crypto
        .createHash('sha256')
        .update(url)
        .digest('base64url')
        .substring(0, length);
}

function saveUrl(key, fullUrl, shortUrl) {
    const sql = 'INSERT INTO url (key, full_url, short_url) VALUES(?, ?, ?)';
    const params = [key, fullUrl, shortUrl];

    db.run(sql, params, function(err){
        if (err) {
            console.error('Error inserting into url table:', err.message);
        } 
    });
}

module.exports = { generateShortKey, saveUrl };