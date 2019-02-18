const db = require('./db');

function getTipoVacantesTipoContratos() {
    return db.multi('SELECT * FROM TipoVacantes; SELECT * FROM tipocontratos;');
}

module.exports = {
    getTipos: getTipoVacantesTipoContratos
}