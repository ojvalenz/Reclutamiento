var express = require('express');
var router = express.Router();
var model = require('../models/notas');

router.use(require('./auth').validarUsuario);

router.get('/:id_candidato', (rq, rs, n) => {
    model.getNotas(rq.params.id_candidato)
        .then(notas => {
            rs.json(rs.app.locals.respuesta('S', 'Notas Candidato', notas))
        })
        .catch(err => {
            rs.status(500).json(rs.app.locals.respuesta('E', err.message, err.stack))
        })
})

router.post('/', (rq, rs, n) => {
    model.insertNota(rq.body)
        .then(() => {
            rs.json(rs.app.locals.respuesta('S', 'Nota Guardada', ''))
        })
        .catch(err => {
            rs.status(500).json(rs.app.locals.respuesta('E', err.message, err.stack))
        })
})

router.delete('/:id_nota', (rq, rs, n) => {
    model.deleteNota(rq.params.id_nota)
        .then(() => {
            rs.json(rs.app.locals.respuesta('S', 'Nota Eliminada', ''))
        })
        .catch(err => {
            rs.status(500).json(rs.app.locals.respuesta('E', err.message, err.stack))
        })
})


module.exports = router;