const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'finalapt',
    password: '0325',
    port: 5432,
});

module.exports = pool;