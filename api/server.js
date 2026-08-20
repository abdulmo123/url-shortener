const express = require('express');
const { getRedisClient } = require('./redis');
const { getDbClient, createUrlTable } = require('./db');
const app = express();
const port = 8080;
const urlRoute = require('./url.route');
const cors = require('cors');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use('/url', urlRoute);

app.get('/', async (req, res) => {
    // create instance of redis client
    const redisClient = await getRedisClient();
    const dbClient = await getDbClient();

    await redisClient.set('key', 'value');
    const value = await redisClient.get('key');
    console.log('value = ', value);
    res.send("Hello World from Express!");
})

app.listen(port, () => {
    // need to create db table from data.sql on startup
    createUrlTable();
    console.log(`listening on port ${port}`);
});