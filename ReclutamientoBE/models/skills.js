const db = require('./db');
const PQ = require('pg-promise').ParameterizedQuery;
const helper = require('pg-promise')().helpers;

function getGrupoSkills() {
    let query = new PQ('SELECT * FROM grupo_skills ORDER BY id_grupo_skill;');

    return db.any(query);
}

function getGrupoSkill(idGrupoSkill) {
    let query = new PQ('SELECT * FROM grupo_skills WHERE id_grupo_skill = $1');
    query.values = [idGrupoSkill];

    return db.one(query);
}

function getSkills() {
    let query = new PQ('SELECT * FROM skills ORDER BY id_grupo_skill, id_skill;');

    return db.any(query);
}

function getSkillsByGrupoSkill(idGrupoSkill) {
    let query = new PQ('SELECT * FROM skills WHERE id_grupo_skill = $1');
    query.values = [idGrupoSkill];

    return db.any(query);
}

function insertGrupoSkills(grupoSkills) {
    let query = helper.insert(grupoSkills, null, 'grupo_skills')
    return db.none(query);
}

function insertSkill(skill) {
    let query = helper.insert(skill, null, 'skills');
    return db.none(query);
}

function updateGrupoSkills(grupoSkills) {
    let query = helper.update(grupoSkills, ['nombre'], 'grupo_skills') + ' WHERE id_grupo_skill = ' + grupoSkills.id_grupo_skill
    return db.none(query);
}

function updateSkill(skill) {
    let query = helper.update(skill, ['id_grupo_skill', 'nombre'], 'skills') + ' WHERE id_skill = ' + skill.id_skill;
    return db.none(query);
}

module.exports = {
    getGrupoSkills: getGrupoSkills,
    getGrupoSkill: getGrupoSkill,
    getSkills: getSkills,
    getSkillsByGrupoSkill: getSkillsByGrupoSkill,
    insertGrupoSkills: insertGrupoSkills,
    insertSkill: insertSkill,
    updateGrupoSkills: updateGrupoSkills,
    updateSkill: updateSkill
}