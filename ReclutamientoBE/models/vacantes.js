const db = require('./db');
const PQ = require('pg-promise').ParameterizedQuery;

function getAllVacantes() {
    return db.any(allVacantes);
};


function getVacante(id) {
    return db.one('SELECT * FROM vw_select_vacante WHERE id_vacante=$1 LIMIT 1;', [id])
};

function insertVacante(vacante) {
    return db.none('SELECT fn_insert_vacante(${nombreCorto}, ${descripcion}, ${tiempo}, ${contrato}, ${ciudad}, ${duracion}, ${requerimientos}, ${costomaximo}, ${fechainicio}, ${posiciones}, ${prioridad}, ${comentarios})',
        vacante);
};

function updateVacante(vacante) {
    return db.none('SELECT fn_update_vacante(${nombreCorto}, ${descripcion}, ${tiempo}, ${contrato}, ${ciudad}, ${duracion}, ${requerimientos}, ${costomaximo}, ${fechainicio}, ${posiciones}, ${prioridad}, ${comentarios})',
        vacante);
};

function deleteVacante(id) {
    return db.none('SELECT fn_delete_vacante($1)', [id]);
};

module.exports = {
    getAllVacantes: getAllVacantes,
    getVacante: getVacante,
    insertVacante: insertVacante,
    updateVacante: updateVacante,
    deleteVacante: deleteVacante
}


const allVacantes = new PQ('SELECT * FROM vacantes ORDER BY id_vacante;');