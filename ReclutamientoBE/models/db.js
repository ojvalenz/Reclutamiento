const promise = require('bluebird');

const pgp = require('pg-promise')({
    promiseLib: promise
});

const conn = {
    host: 'localhost',
    port: '5432',
    database: 'Reclutamiento',
    user: 'postgres',
    password: 'migesa_admin'
};

const db = pgp(conn);

module.exports = db;