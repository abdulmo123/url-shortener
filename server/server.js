const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
    origin: ['http://localhost:5173']
}))

app.use(express.json());

app.post('/gen-url', (req, res) => {
  console.log(req.body.url);
  res.json({ shortUrl: req.body.url });
});

app.listen(3000, () => {
    console.log('Server running ...');
});