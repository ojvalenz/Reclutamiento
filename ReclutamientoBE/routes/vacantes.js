var express = require('express');
var router = express.Router();
var model = require('../models/vacantes');
var modelTipos = require('../models/tipoVacantes');


router.get('/', (rq, rs) => {
    model.getAllVacantes()
        .then(vacantes => {
            rs.json({
                vacantes: vacantes
            });
        })
        .catch(err => {
            rs.status(500).json(err);
        })

});

router.get('/vacante/new', (rq, rs) => {
    modelTipos.getTipos()
        .then(data => {
            rs.json({
                vacantes: data[0],
                contratos: data[1]
            });
        })
        .catch(err => {
            rs.status(500).json(err);
        })
});

router.get('/:id', (rq, rs) => {
    model.getVacante(rq.params.id)
        .then(vacante => {
            modelTipos.getTipos()
                .then(dataTipos => {
                    rs.json({
                        vacante: vacante,
                        tiempo: dataTipos[0],
                        contratos: dataTipos[1]
                    });
                })
        })
        .catch(err => {
            rs.status(500).json(err);
        })
})

router.post('/', (rq, rs) => {
    model.insertVacante(rq.body)
        .then(data => {
            rs.status(200).send('');
        })
        .catch((err) => {
            rs.status(500).json(err);
        })
});

router.put('/', (rq, rs) => {
    model.updateVacante(rq.body)
        .then(data => {
            rs.status(200).send('');
        })
        .catch((err) => {
            rs.status(500).json(err);
        })
});

router.delete('/:id', (rq, rs) => {
    model.deleteVacante(rq.params.id)
        .then(data => {
            rs.status(200).send('');
        })
        .catch((err) => {
            rs.status(500).json(err);
        })
});

module.exports = router;