const { createClient } = require('redis');

let client;

async function getRedisClient() {
    if (!client) {
        client = createClient({
            url: 'redis://localhost:6379'
        });

        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
    }

    return client;
}

module.exports = { getRedisClient };