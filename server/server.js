const cors = require('cors');
const express = require('express');
const app = express();
const { db, initDb } = require('./db');
const { generateShortKey, saveUrl, getAllData, getFullUrlByKey } = require('./urlService');

app.use(cors({
    origin: ['http://localhost:5173']
}));

app.use(express.json());

app.post('/gen-url', async (req, res) => {
  console.log(req.body.url); 
  const hostUrl = req.protocol + '://' + req.get('host');
  const key = generateShortKey(req.body.url);
  console.log('key ==>', key);
  await saveUrl(key, req.body.url, hostUrl + "/" + key);
  res.status(201).json({
    "key": key,
    "fullUrl": req.body.url,
    "shortUrl": hostUrl + "/" + key
  });
});

app.get('/all', async (req, res) => {
  const data = await getAllData();
  res.status(200).json({
    "data": data
  });
});

app.get('/:key', async (req, res) => {
    const key = req.params.key;
    console.log(`Key is: ${key}`);
    const data = await getFullUrlByKey(key);
    console.log(`Full URL is: ${data.full_url}`);
    res.redirect(data.full_url)
});

app.listen(3000, () => {
    console.log('Server running ...');
    initDb();
});