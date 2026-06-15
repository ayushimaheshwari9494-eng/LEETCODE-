 const { createClient } = require('redis');

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-17315.c99.us-east-1-4.ec2.cloud.redislabs.com',
        port: 17315
    }
});
module.exports = client;