const db = require('./db');
const PQ = require('pg-promise').ParameterizedQuery;
const helper = require('pg-promise')().helpers;

const tbl_vacantes = helper.ColumnSet([
    'nombre_corto',
    'descripcion',
    'id_tiempo_vacante',
    'id_tipo_contrato',
    'ciudad',
    'duracion',
    'requerimientos',
    'costo_maximo',
    'fecha_inicio',
    'posiciones',
    'prioridad',
    'comentarios',
    {
        name: 'grupo_skills',
        cast: 'int[]'
    },
    "id_estatus",
    "id_reclutador_creacion",
    "id_reclutador_asignado",
    "tarifa",
    "id_empresa_contratante",
    "trabajando_actualmente",
    "empresa_empleadora"
], {
    table: 'vacantes'
});

function getAllVacantes() {
    let query = new PQ('SELECT * FROM vacantes WHERE activo = true ORDER BY id_vacante;');
    return db.any(query);
};


function getVacante(id_vacante) {
    let query = new PQ('SELECT * FROM vacantes WHERE activo = true AND id_vacante=$1 LIMIT 1;');
    query.values = [id_vacante];
    return db.one(query);
};

function insertVacante(vacante) {
    let query = helper.insert(vacante, tbl_vacantes);
    return db.none(query);
};

function updateVacante(vacante) {
    let query = helper.update(vacante, tbl_vacantes) + ' WHERE id_vacante = ' + vacante.id_vacante;
    return db.none(query);
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