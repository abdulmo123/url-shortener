const crypto = require('crypto');
const express = require('express');
const { saveUrlObjDb } = require('./db');

async function generateShortUrl(hostUrl, req, length = 10) {
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
    // console.log('urlObj ==>' , urlObj);

    const data = await saveUrlObjDb(urlObj);
    if (data === undefined) return;
    console.log('data item inserted ...', data);
}

module.exports = { generateShortUrl };