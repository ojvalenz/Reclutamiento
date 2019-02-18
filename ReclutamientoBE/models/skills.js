const db = require('./db');

function getGrupoSkills() {
    return db.any('SELECT * FROM gruposkills order by idgruposkill;');
}

function getGrupoSkill(idGrupoSkill) {
    return db.one('SELECT * FROM gruposkills WHERE idgruposkill = $1;', idGrupoSkill);
}

function getSkills(idGrupoSkills) {
    return db.any('SELECT * FROM skills WHERE idgruposkill = $1 ORDER BY idskill;', idGrupoSkills);
}

function insertGrupoSkills(grupoSkills) {
    return db.none('insert into gruposkills(nombre) values(${nombre})', grupoSkills)
}

function insertSkill(skill) {
    return db.none('insert into skills(idgruposkill, nombre) values(${idgruposkills}, ${nombre});', skill);
}

function updateGrupoSkills(grupoSkills) {
    return db.none('UPDATE gruposkills SET nombre=${nombre}', grupoSkills);
}

function updateSkill(skill) {
    return db.none('UPDATE skills SET idgruposkills=${idgruposkill}, nombre=${nombre}', skill);
}

module.exports = {
    getGrupoSkills: getGrupoSkills,
    getSkills: getSkills,
    insertGrupoSkills: insertGrupoSkills,
    insertSkill: insertSkill,
    updateGrupoSkills: updateGrupoSkills,
    updateSkill: updateSkill
}