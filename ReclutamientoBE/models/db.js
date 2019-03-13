const promise = require('bluebird');

const pgp = require('pg-promise')({
    promiseLib: promise
});

/* const conn = {
    host: 'localhost',
    port: '5432',
    database: 'Reclutamiento',
    user: 'postgres',
    password: 'migesa_admin'
}; */
const dev_conn_str = 'postgress://postgres:migesa_admin@localhost:5432/Reclutamiento';
const conn = process.env.POSTGRES_URI || dev_conn_str;

const db = pgp(conn);

module.exports = db;