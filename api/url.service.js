const crypto = require('crypto');
const express = require('express');
const { saveUrl } = require('./db');

async function generateShortUrl(hostUrl, req, length = 12) {
    const fullUrl = req.url;
    // console.log('fullUrl = ', fullUrl);

    const key = crypto.createHash('sha256')
        .update(fullUrl)
        .digest('base64url')
        .substring(0, length);

    // console.log('key = ', key);

    const shortUrl = `${hostUrl}/${key}`;
    // console.log('shortUrl = ', shortUrl);

    const urlObj = {
        key: key,
        shortUrl: shortUrl,
        fullUrl: fullUrl
    };

    await saveUrl(urlObj);

    // saveUrl(urlObj)
}

// function saveUrl(urlObj) {
//     console.log('urlObj ==>', urlObj);
// }

module.exports = { generateShortUrl };