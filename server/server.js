const cors = require('cors');
const express = require('express');
const app = express();
const { db, initDb } = require('./db');

app.use(cors({
    origin: ['http://localhost:5173']
}));

app.use(express.json());

app.post('/gen-url', (req, res) => {
  console.log(req.body.url); 
});

app.listen(3000, () => {
    console.log('Server running ...');
    initDb();
});