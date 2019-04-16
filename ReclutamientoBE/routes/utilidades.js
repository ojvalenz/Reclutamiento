var express = require('express');
var router = express.Router();
var model = require('../models/utilidades');

router.use(require('./auth').validarUsuario);

router.get('/catalogos/:idioma/:categorias?', (rq, rs, n) => {
    var categorias = rq.params.categorias ? rq.params.categorias.split(',') : undefined;
    var idioma = rq.params.idioma;

    model.getCatalogos(categorias, idioma)
        .then(d => rs.status(200)
            .json(rs.app.locals.respuesta('S', 'Catalogos', d)))
        .catch(err =>
            rs.status(500)
            .json(rs.app.locals.respuesta('E', err.name, err)))
})

router.get('/password/:id_persona', (rq, rs, n) => {
    let persona = require('../models/personas');
    persona.getPassword(rq.params.id_persona)
        .then(d => rs.json(rs.app.locals.respuesta('S', 'Password', d)))
        .catch(err => rs.status(500).json(rs.app.locals.respuesta('E', err.name, err)))
})

router.post('/password', (rq, rs, n) => {
    let pass_change = rq.body;
    if (pass_change == undefined &&
        (pass_change.id_persona == undefined || pass_change.id_persona == '') &&
        (pass_change.old_password == undefined || pass_change.old_password == '') &&
        (pass_change.new_password == undefined || pass_change.new_password == '')
    ) {
        rs.status(500).json(rs.app.locals.respuesta('E', 'El objecto no existe o hace falta un campo.', ''))
    }

    let persona = require('../models/personas');
    persona.changePassword(pass_change)
        .then(() => {
            rs.json(rs.app.locals.respuesta('S', 'Password Actualizado', ''))
        })
        .catch(err => rs.status(500).json(rs.app.locals.respuesta('E', err.message, err.stack)))
})

/*
router.get('/', (rq, rs) => {
    console.log(rq);
    rs.send(rq.cookies);
})
*/

module.exports = router;