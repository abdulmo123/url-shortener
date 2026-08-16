const express = require('express');
const urlRouter = express.Router();
const urlService = require('./url.service');

urlRouter.post('/gen-short-url', (req, res) => {
    const hostUrl = req.protocol + '://' + req.get('host');
    // console.log('hostUrl = ', hostUrl);

    // let shortUrl = `${req.protocol}://${req.hostname}:`;
    // let shortUrl = `${req.protocol}://${req.get('host')}/${key}`
    // console.log('shortUrl =', shortUrl);
    const body = req.body;
    // console.log('body -->', body);
    urlService.generateShortUrl(hostUrl, body);
    res.send(body);
});


module.exports = urlRouter;