var express = require('express');
var router = express.Router();
const model = require('../models/candidatos');

router.use(require('./auth').validarUsuario);

router.get('/', (rq, rs) => {
    model.getCandidatos()
        .then(candidatos => {
            rs.status(200)
                .json(rs.app.locals.respuesta('S', 'Listado de candidatos.', candidatos));
        })
        .catch(err => {
            rs.status(500)
                .json(rs.app.locals.respuesta('E', err.name, err));
        })
});

router.get('/:id_candidato', (rq, rs) => {
    model.getCandidato(rq.params.id_candidato)
        .then(candidato => {
            rs.status(200)
                .json(rs.app.locals.respuesta('S', 'Candidato', candidato));
        })
        .catch(err => {
            rs.status(500)
                .json(rs.app.locals.respuesta('E', err.name, err));
        })
});

router.post('/new', (rq, rs) => {
    let persona = rq.body.persona;
    let candidato = rq.body.candidato;

    if (persona != undefined || candidato != undefined) {
        model.insertCandidato(candidato, persona)
            .then(() => {
                rs.status(200)
                    .json(rs.app.locals.respuesta('S', 'Candidato Guardado', ''));
            })
            .catch(err => {
                console.log(err);
                rs.status(500)
                    .json(rs.app.locals.respuesta('E', err.name, err));
            })
    } else {
        rs.status(500)
            .json(rs.app.locals.respuesta('E', 'Persona o Candidato falante', ''));
    }
});

router.put('/', (rq, rs) => {
    let persona = rq.body.persona;
    let candidato = rq.body.candidato;

    if (persona != undefined || candidato != undefined) {
        model.updateCandidato(candidato, persona)
            .then(
                rs.status(200)
                .json(rs.app.locals.respuesta('S', 'Candidato actualizado', ''))
            )
            .catch(err => {
                rs.status(500)
                    .json(rs.app.locals.respuesta('E', err.name, err));
            })
    } else {
        rs.status(500)
            .json(rs.app.locals.respuesta('E', 'Persona o Candidato falante', ''));
    }
})

router.post('/asignar/vacantes', (rq, rs) => {
    model.asignarVacantes(rq.body)
        .then(() =>
            rs.status(200)
            .json(rs.locals.respuesta('S', 'Vacantes asignadas', ''))
        )
        .catch(err => rs.status(500)
            .json(rs.app.locals.respuesta('E'.err.name, err))
        )
})

module.exports = router;