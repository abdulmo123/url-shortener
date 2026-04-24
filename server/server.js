const cors = require('cors');
const express = require('express');
const app = express();
const { db, initDb } = require('./db');
const { generateShortKey } = require('./urlService');

app.use(cors({
    origin: ['http://localhost:5173']
}));

app.use(express.json());

app.post('/gen-url', (req, res) => {
  console.log(req.body.url); 
  const key = generateShortKey(req.body.url);
  console.log('key ==>', key);
  res.send(key);
});

app.listen(3000, () => {
    console.log('Server running ...');
    initDb();
});