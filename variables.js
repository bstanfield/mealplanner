const { Pool, Client } = require('pg');

// IP FOR CLOUDSQL: 35.185.213.57
// IP FOR LOCAL DEV: 127.0.0.1
// IP FOR CE: 35.236.39.233

const devPort = 8080;
const prodPort = 80;

const prodPool = new Pool({
    user: 'postgres',
    host: '35.185.213.57',
    database: 'postgres',
    password: 'simplepassword',
    port: 5432,
});

// Need to also run gcloud proxy
const devPool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'simplepassword',
    port: 8080,
});

// For timekeeping
const time = new Date().toLocaleString();
const logTime = `[ ${time} ] Request from:`;

module.exports = {
    devPort,
    prodPort,
    prodPool,
    devPool,
    logTime,
}