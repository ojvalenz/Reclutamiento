var express = require('express');
var router = express.Router();
var model = require('../models/skills');

router.get('/', (rq, rs) => {
    model.getGrupoSkills()
        .then(grupoSkills => {
            rs.json({
                grupoSkills: grupoSkills
            })
        })
        .catch(err => {
            rs.status(500).json(err);
        })
});

router.get('/:idgrupo', (rq, rs) => {
    model.getSkills(rq.params.idgrupo)
        .then(skills => {
            rs.json({
                skills: skills
            });
        })
        .catch(err => {
            rs.status(500).json(err);
        })
});

router.get('/gruposkills/:idgruposkill', (rq, rs) => {
    model.getGrupoSkill()
    model.getSkills(rq.params.idgruposkill)
        .then(

        )
        .catch(err => {
            rs.status(500).json(err);
        })
});

router.post('/grupoSkills', (rq, rs) => {
    model.insertGrupoSkills(rq.body)
        .then(() => {
            rs.status(200).send('');
        })
        .catch(err => {
            rs.status(500).json(err);
        })
});

router.post('/Skills', (rq, rs) => {
    model.insertSkill(rq.body)
        .then(() => {
            rs.status(200).send('');
        })
        .catch(err => {
            rs.status(500).json(err);
        })
});

router.put('/grupoSkills', (rq, rs) => {
    model.updateGrupoSkills(rq.body)
        .then(() => {
            rs.status(200).send('');
        })
        .catch(err => {
            rs.status(500).json(err);
        })
});

router.put('/Skills', (rq, rs) => {
    model.updateSkill(rq.body)
        .then(() => {
            rs.status(200).send('');
        })
        .catch(err => {
            rs.status(500).json(err);
        })
});

module.exports = router;