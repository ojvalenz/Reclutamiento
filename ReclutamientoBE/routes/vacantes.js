var express = require('express');
var router = express.Router();
var model = require('../models/vacantes');
var modelTipos = require('../models/tipoVacantes');

router.use(require('./auth').validarUsuario);

router.get('/', (rq, rs) => {
    model.getAllVacantes()
        .then(vacantes => {
            rs.json(rs.app.locals.respuesta("S", 'Listado vacantes', vacantes));
        })
        .catch(err => {
            rs.status(500)
                .json(rs.app.locals.respuesta('E', err.name, err));
        })

});

router.get('/vacante/new', (rq, rs) => {
    modelTipos.getTipos()
        .then(data => {
            rs.json(rs.app.locals.respuesta('S', 'Datos de tipo de vacante y tipo de contrato', {
                vacantes: data[0],
                contratos: data[1]
            }));
        })
        .catch(err => {
            rs.status(500)
                .json(rs.app.locals.respuesta('E', err.name, err));
        })
});

router.get('/:id', (rq, rs) => {
    model.getVacante(rq.params.id)
        .then(vacante => {
            modelTipos.getTipos()
                .then(dataTipos => {
                    rs.json(rs.app.locals.respuesta('S', 'Vacante', {
                        vacante,
                        tiempo: dataTipos[0],
                        contratos: dataTipos[1]
                    }));
                })
        })
        .catch(err => {
            rs.status(500)
                .json(rs.app.locals.respuesta('E', err.name, err));
        })
})

router.post('/', (rq, rs) => {
    model.insertVacante(rq.body)
        .then(data => {
            rs.json(rs.app.locals.respuesta('S', 'La vacante se guardo con exito', ''));
        })
        .catch((err) => {
            rs.status(500)
                .json(rs.app.locals.respuesta('E', err.name, err));
        })
});

router.put('/', (rq, rs) => {
    model.updateVacante(rq.body)
        .then(data => {
            rs.json(rs.app.locals.respuesta('S', 'La vacante se actualizo', ''));
        })
        .catch((err) => {
            rs.status(500)
                .json(rs.app.locals.respuesta('E', err.name, err));
        })
});

router.delete('/:id', (rq, rs) => {
    model.deleteVacante(rq.params.id)
        .then(data => {
            rs.status(200).send('');
        })
        .catch((err) => {
            rs.status(500)
                .json(rs.app.locals.respuesta('E', err.name, err));
        })
});

module.exports = router;