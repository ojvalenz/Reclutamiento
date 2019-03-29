const db = require('./db');
const PQ = require('pg-promise').ParameterizedQuery;
const helper = require('pg-promise')().helpers;

const tbl_personas = new helper.ColumnSet([
    'nombre',
    'apellido_paterno',
    'apellido_materno',
    'tel_celular',
    'email',
    'pass'
], {
    table: 'personas'
});

function getPersonas() {
    return new PQ('SELECT * FROM persona;');
}

function getPersona(id_persona) {
    let query = new PQ('SELECT * FROM personas WHERE id_persona = $1;');
    query.values = [id_persona];
    return query;
}

function insertPersona(persona) {
    let query = new PQ(helper.insert(persona, tbl_personas) + ' RETURNING id_persona;');
    return query;
}

function updatePersona(persona) {
    let query = helper.update(persona, tbl_personas) + ' WHERE id_persona = ' + persona.id_persona;
    return query;
}

function deletePersona(id_persona) {
    let query = new PQ(helper.update(id_persona, ['activo'], 'personas') + ' WHERE id_persona = ' + id_persona);
    return query
}


module.exports = {
    getPersonas,
    getPersona,
    insertPersona,
    updatePersona,
    deletePersona
}