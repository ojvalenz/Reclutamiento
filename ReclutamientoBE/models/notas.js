const db = require('./db');
const PQ = require('pg-promise').ParameterizedQuery;
const helper = require('pg-promise')().helpers;

function getNotas(id_candidato) {
    let personas = require('../models/personas');

    return db.tx(t => {
        return t.map('SELECT id_nota, persona_creacion, fecha_creacion FROM notas_candidato WHERE activo = true AND id_candidato = $1', [id_candidato], nota => {
            return t.one(personas.getPersona(nota.persona_creacion))
                .then(persona => {
                    nota.persona = persona;
                    return nota;
                })
        }).then(t.batch)
    })
}

function insertNota(nota) {
    let query = helper.insert(nota, ['id_candidato', 'persona_creacion', 'nota', 'fecha_creacion'], 'notas_candidato');

    return db.task(t => {
        return t.none(query);
    })
}

function deleteNota(id_nota) {
    return db.task(t => {
        return t.none('UPDATE notas_candidato SET activo = false WHERE id_nota = $1', [id_nota]);
    })
}



module.exports = {
    getNotas,
    insertNota,
    deleteNota
}