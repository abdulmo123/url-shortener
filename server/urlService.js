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
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO url (key, full_url, short_url) VALUES(?, ?, ?)';
        const params = [key, fullUrl, shortUrl];

        db.run(sql, params, function(err){
            if (err) {
                console.error('Save error:', err.message);
                reject(err);
            } else {
                console.log('Saved successfully, rows affected:', this.changes);
                resolve();
            }
        });
    });
}

function getAllData() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from url';
        db.all(sql, [], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getFullUrlByKey(key) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT full_url from url where key = ?';
        const params = [key];

        db.get(sql, params, function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

module.exports = { generateShortKey, saveUrl, getAllData, getFullUrlByKey };