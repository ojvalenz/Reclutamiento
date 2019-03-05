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
    {
        name: 'skills',
        mod: ':json'
    }
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
    return db.tx(tx => {
        return tx.map(model_persona.insertPersona(persona), [], persona => {
            candidato.id_persona = persona.id_persona;
            let query = helper.insert(candidato, tbl_candidatos);
            return tx.none(query)
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

module.exports = {
    getCandidatos,
    getCandidato,
    insertCandidato,
    updateCandidato,
    deleteCandidato
};