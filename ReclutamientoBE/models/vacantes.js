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
    /* {
         name: 'grupo_skills',
         cast: 'int[]'
     },
     "id_estatus",
     "id_reclutador_creacion",
     "id_reclutador_asignado",
     "tarifa",
     "id_empresa_contratante",
     "trabajando_actualmente",
     "empresa_empleadora"*/
], {
    table: 'vacantes'
});

const query_skills = new PQ('SELECT sv.id_skill, sv.nivel, sv.comentarios FROM skills_vacantes sv JOIN skills s ON s.id_skill = sv.id_skill WHERE sv.activo = true AND sv.id_vacante = $1;')

function getAllVacantes() {
    let query = new PQ('SELECT * FROM vacantes WHERE activo = true ORDER BY id_vacante;');

    return db.tx(tx => {
        return tx.map(query, null, vacante => {
            query_skills.values = [vacante.id_vacante];
            return tx.any(query_skills)
                .then(skills => {
                    vacante.skills = skills;
                    return vacante;
                })
        }).then(tx.batch)
    })
};


function getVacante(id_vacante) {
    let query = new PQ('SELECT * FROM vacantes WHERE activo = true AND id_vacante=$1 LIMIT 1;');
    query.values = [id_vacante];
    query_skills.values = [id_vacante];

    return db.tx(tx => {
        return tx.map(query, null, vacante => {
            return tx.any(query_skills)
                .then(skills => {
                    vacante.skills = skills;
                    return vacante;
                })
        }).then(tx.batch)
    })
};

function insertVacante(vacante) {
    let query = helper.insert(vacante, tbl_vacantes) + ' RETURNING id_vacante;';

    return db.tx(tx => {
        return tx.map(query, null, v => {
            vacante.skills.forEach(skill => {
                Object.assign(skill, {
                    id_vacante: v.id_vacante
                })
            });
            let query_skills = helper.insert(vacante.skills, ['id_vacante', 'id_skill', 'nivel'], 'skills_vacantes')
            return tx.none(query_skills);
        }).then(tx.batch)
    })
};

function updateVacante(vacante) {
    let query = helper.update(vacante, tbl_vacantes) + ' WHERE id_vacante = ' + vacante.id_vacante;

    return db.tx(tx => {
        return tx.batch([
            tx.none(query),
            vacante.skills.forEach(skill => {
                Object.assign(skill, {
                    id_vacante: vacante.id_vacante
                });
                let values;
                if (skill.comentario)
                    values = helper.values(skill, ['id_vacante', 'id_skill', 'nivel', 'comentario'])
                else
                    values = helper.values(skill, ['id_vacante', 'id_skill', 'nivel'])

                return tx.none('SELECT * FROM fn_update_skills_vacantes' + values);
            })
        ])
    })
};

function deleteVacante(id) {
    return db.none('UPDATE vacantes SET activo = false WHERE id_vacante = $1', [id]);
};

module.exports = {
    getAllVacantes: getAllVacantes,
    getVacante: getVacante,
    insertVacante: insertVacante,
    updateVacante: updateVacante,
    deleteVacante: deleteVacante
}