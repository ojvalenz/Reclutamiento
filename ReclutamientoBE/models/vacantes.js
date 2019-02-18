const db = require('./db');

function getAllVacantes() {
    return db.any('SELECT * FROM vacantes ORDER BY idvacante;')
};


function getVacante(id) {
    return db.one('SELECT * FROM vw_selectvacante WHERE idvacante=$1 LIMIT 1;', [id])
};

function insertVacante(vacante) {  
    return db.none('INSERT INTO vacantes( nombrecorto,descripcion,idTipoVacante,idTipoContrato,ciudad,duracion,requerimientos,costomaximo,fechainicio,posiciones,prioridad,comentarios)'+ 
                        'VALUES(${nombreCorto}, ${descripcion}, ${tiempo}, ${contrato}, ${ciudad}, ${duracion}, ${requerimientos}, ${costomaximo}, ${fechainicio}, ${posiciones}, ${prioridad}, ${comentarios})',
                        vacante);                            
};

function updateVacante(vacante) {
    return db.none('UPDATE vacantes SET '+
        'nombrecorto = ${nombreCorto}, '+
        'descripcion=${descripcion}, '+
        'idtipovacante=${tiempo}, '+
        'idtipocontrato=${contrato}, '+
        'ciudad=${ciudad}, '+
        'duracion=${duracion}, '+
        'requerimientos=${requerimientos}, '+
        'costomaximo=${costomaximo}, '+
        'fechainicio=${fechainicio}, '+
        'posiciones=${posiciones}, '+
        'prioridad=${prioridad}, '+
        'comentarios=${comentarios} '+
        'WHERE idvacante = ${idvacante}',
    vacante);
};

function deleteVacante(id) {

};

module.exports = {
    getAllVacantes: getAllVacantes,
    getVacante: getVacante,
    insertVacante: insertVacante,
    updateVacante: updateVacante,
    deleteVacante: deleteVacante
}