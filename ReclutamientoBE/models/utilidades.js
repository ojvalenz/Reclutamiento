const db = require('./db');
const PQ = require('pg-promise').ParameterizedQuery;
const helper = require('pg-promise')().helpers;

function getCatalogos(categorias, lenguaje) {
    var query_base = 'SELECT DISTINCT categoria FROM catalogos';

    if (categorias !== undefined && categorias.length > 0) {
        categorias = categorias.map(c => {
            return c.trim().toLowerCase()
        })
        query_base += ' WHERE LOWER(categoria) in ($1:csv)';
    }

    return db.tx(tx => {
        console.log(query_base);
        return tx.map(query_base, [categorias], c => {
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