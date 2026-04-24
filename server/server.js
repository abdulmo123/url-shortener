const cors = require('cors');
const express = require('express');
const app = express();
const { db, initDb } = require('./db');
const { generateShortKey, saveUrl, getAllData } = require('./urlService');

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
    "full_url": req.body.url,
    "short_url": hostUrl + "/" + key
  });
});

app.get('/all', async (req, res) => {
  const data = await getAllData();
  res.status(200).json({
    "data": data
  });
});

app.listen(3000, () => {
    console.log('Server running ...');
    initDb();
});