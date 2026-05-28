const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    port: process.env.PG_PORT
});

module.exports = pool;