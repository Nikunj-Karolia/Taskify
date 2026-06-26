const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.PG_PORT
});

module.exports = pool;