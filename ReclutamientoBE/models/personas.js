const db = require('./db');
const PQ = require('pg-promise').ParameterizedQuery;
const helper = require('pg-promise')().helpers;

const tbl_personas = new helper.ColumnSet([
    'nombre',
    'apellido_paterno',
    'apellido_materno',
    'tel_celular',
    'email'
], {
    table: 'personas'
});

function getPersonas() {
    return new PQ('SELECT * FROM persona;');
}

function getPersona(id_persona) {
    let query = new PQ('SELECT id_persona, nombre, apellido_paterno, apellido_materno, id_rol, tel_celular, email, id_empresa, ubicacion FROM personas WHERE id_persona = $1;');
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

function validarPersona(email) {
    let query = new PQ('SELECT EXITS(SELECT email FROM personas WHERE email = $1);', [email]);
    return query;
}

function getPassword(id_persona) {
    let query = new PQ('SELECT pass FROM personas WHERE id_persona = $1', [id_persona]);

    return db.one(query);
}

function changePassword(pass_change) {
    return db.task(t => {
        return t.none('UPDATE personas SET pass = ${new_password} WHERE id_persona = ${id_persona} AND pass = ${old_password}', pass_change)
    });
}

module.exports = {
    getPersonas,
    getPersona,
    insertPersona,
    updatePersona,
    deletePersona,
    validarPersona,
    getPassword,
    changePassword
}