const express = require('express');
const urlRouter = express.Router();
const urlService = require('./url.service');

urlRouter.post('/gen-short-url', async (req, res) => {
    const hostUrl = req.protocol + '://' + req.get('host');
    const body = req.body;

    const data = await urlService.generateShortUrl(hostUrl, body);
    console.log('im gonna send this back dude', data);
    res.send(data);
});

urlRouter.get('/:key', async (req, res) => {
    const key = req.params.key;

    const data = await urlService.getStoredUrl(key);
    res.redirect(data.full_url);
});


module.exports = urlRouter;