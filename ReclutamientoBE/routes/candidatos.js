var express = require('express');
var router = express.Router();
const model = require('../models/candidatos');

router.get('/', (rq, rs) => {
    model.getCandidatos()
        .then(candidatos => {
            rs.status(200).json(candidatos);
        })
        .catch(err => {
            rs.status(500).json(err);
        })
});

router.get('/:id_candidato', (rq, rs) => {
    model.getCandidato(rq.params.id_candidato)
        .then(candidatos => {
            rs.status(200).json(candidatos);
        })
        .catch(err => {
            rs.status(500).json(err);
        })
});

router.post('/new', (rq, rs) => {
    let persona = rq.body.persona;
    let candidato = rq.body.candidato;

    if (persona != undefined || candidato != undefined) {
        model.insertCandidato(candidato, persona)
            .then(() => {
                rs.status(200).send('Candidato gradado');
            })
            .catch(err => {
                console.log(err);
                rs.status(500).json(err);
            })
    } else {
        rs.status(500).send('no persona o candidato.');
    }
});

router.put('/', (rq, rs) => {
    let persona = rq.body.persona;
    let candidato = rq.body.candidato;

    if (persona != undefined || candidato != undefined) {
        model.updateCandidato(candidato, persona)
            .then(
                rs.status(200).send('Ok')
            )
            .catch(err => {
                rs.status(500).json(err);
            })
    } else {
        rs.status(500).send('no persona o candidato.');
    }
})

module.exports = router;