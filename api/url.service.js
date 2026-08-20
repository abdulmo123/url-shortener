const crypto = require('crypto');
const express = require('express');
const { saveUrlObjDb, getDbStoredUrl } = require('./db');

async function generateShortUrl(hostUrl, req, length = 10) {
    const fullUrl = req.url;

    const key = crypto.createHash('sha256')
        .update(fullUrl)
        .digest('base64url')
        .substring(0, length);

    const shortUrl = `${hostUrl}/url/${key}`;

    const urlObj = {
        key: key,
        shortUrl: shortUrl,
        fullUrl: fullUrl
    };

    const data = await saveUrlObjDb(urlObj);
    if (data === undefined) return;
    return data;
}

async function getStoredUrl(key) {
    return await getDbStoredUrl(key);
}

module.exports = { generateShortUrl, getStoredUrl };