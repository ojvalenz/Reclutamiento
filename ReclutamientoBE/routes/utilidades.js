var express = require('express');
var router = express.Router();
var model = require('../models/utilidades');

router.use(require('./auth').validarUsuario);

router.get('/catalogos', (rq, rs, n) => {
    model.getCatalogos()
        .then(d => rs.status(200)
            .json(rs.app.locals.respuesta(d)))
        .catch(err => rs.send(500)
            .json(rs.app.locals.respuesta(err)))
})

/*
router.get('/', (rq, rs) => {
    console.log(rq);
    rs.send(rq.cookies);
})
*/

module.exports = router;