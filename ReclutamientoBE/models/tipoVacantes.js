const db = require('./db');

function getTipoVacantesTipoContratos() {
    return db.multi('SELECT * FROM tiempo_vacantes; SELECT * FROM tipo_contratos;');
}

module.exports = {
    getTipos: getTipoVacantesTipoContratos
}