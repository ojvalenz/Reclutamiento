const db = require('./db');
const PQ = require('pg-promise').ParameterizedQuery;
const helper = require('pg-promise')().helpers;

function getCatalogos() {
    return db.tx(tx => {
        return tx.map("sELECT DISTINCT categoria FROM catalogos", null, c => {
            return tx.batch([tx.any("select * from catalogos where categoria = $1", c.categoria)]).then(data => {
                c.elementos = data[0];
                return c;
            })
        }).then(tx.batch)
    })
}

module.exports = {
    getCatalogos
}