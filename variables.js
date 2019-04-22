const { Pool, Client } = require('pg');
require('dotenv').load();

const devPort = 1330;
const prodPort = 3000;

const prodPool = new Pool({
    user: 'postgres',
    host: process.env.POSTGRES_DB_IP,
    database: 'postgres',
    password: process.env.POSTGRES_DB_PASSWORD,
    port: 5432,
});

// Need to also run gcloud proxy
const devPool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: process.env.POSTGRES_DB_PASSWORD,
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
