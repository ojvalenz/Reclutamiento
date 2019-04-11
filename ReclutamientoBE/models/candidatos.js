const db = require('./db');
const PQ = require('pg-promise').ParameterizedQuery;
const helper = require('pg-promise')().helpers;
const model_persona = require('./personas');

const tbl_candidatos = helper.ColumnSet([
    'id_persona',
    'pais',
    'ciudad',
    'codigo_postal',
    'fecha_graduacion',
    'universidad',
    'curriculum_vitae',
    'cv_digital',
    'foto',
    'skype',
    'grado_estudios',
    'grado_ingles',
    /*, "sueldo_actual",
    "prestaciones_actual",
    "expectativa_actual",
    "fecha_actualizacion",
    "id_reclutador_alta",
    "id_fuente",
    "oferta",
    "fecha_oferta",
    "id_reclutador_oferta",
    "R2R",
    "tipo_casa",
    "trabajo_actual",
    "razon_cambio_trabajo",
    "reubicacion",
    "estado_civil",
    "dependientes_economicos",
    "ingresos_extras",
    "ingreso_extra_fam",
    "proceso_reclutamiento",*/
], {
    table: 'candidatos'
});

function getCandidatos() {
    let query_c = new PQ('SELECT * FROM candidatos;');
    let query_p = new PQ('SELECT * FROM personas WHERE id_persona = $1;');

    return db.task(t => {
        return t.map(query_c, [], candidato => {
            return t.one(query_p, candidato.id_persona)
                .then(persona => {
                    candidato.persona = persona;
                    return candidato;
                });
        }).then(t.batch);
    });
}

function getCandidato(id_candidato) {
    let query_c = new PQ('SELECT * FROM candidatos WHERE id_candidato = $1;');

    return db.task(t => {
        return t.map(query_c, [id_candidato], candidato => {
            return t.one(model_persona.getPersona(candidato.id_persona))
                .then(persona => {
                    candidato.persona = persona;
                    return candidato;
                });
        }).then(t.batch);
    });
}

function insertCandidato(candidato, persona) {
    if (persona.pass == undefined || persona.pass == null || persona.pass === '') {
        persona.pass = 'Pass1234';
    }

    return db.tx(tx => {
        return tx.map(model_persona.insertPersona(persona), [], persona => {
            candidato.id_persona = persona.id_persona;
            let query = helper.insert(candidato, tbl_candidatos) + ' RETURNING id_candidato;';
            return tx.map(query, null, c => {
                candidato.skills.forEach(skill => Object.assign(skill, {
                    id_candidato: c.id_candidato
                }))
                let query_skills = helper.insert(candidato.skills, ['id_candidato', 'id_skill', 'nivel'], 'skills_candidatos');
                return tx.none(query_skills);
            })
        }).then(tx.batch);
    });
}

function updateCandidato(candidato, persona) {
    let query = helper.update(candidato, tbl_candidatos) + ' WHERE id_candidato = ' + candidato.id_candidato;

    return db.tx(tx => {
        return tx.batch([
            tx.none(model_persona.updatePersona(persona)),
            tx.none(query)
        ]);
    })
}

function deleteCandidato(id_candidato) {

}

function asignarVacantes(obj) {
    let query = helper.insert(obj, ['id_vacante', 'id_candidato', 'id_reclutador', 'fecha_asignacion', 'estatus_candidato_proceso'], 'candidato_vacante');
    return db.none(query);
}

module.exports = {
    getCandidatos,
    getCandidato,
    insertCandidato,
    updateCandidato,
    deleteCandidato,
    asignarVacantes
};