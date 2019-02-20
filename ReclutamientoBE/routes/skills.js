var express = require('express');
var router = express.Router();
var model = require('../models/skills');

router.get('/', (rq, rs) => {
    model.getGrupoSkills()
        .then(grupoSkills => {
            model.getSkills()
                .then(skills => {
                    rs.json({
                        grupoSkills: grupoSkills,
                        skills: skills
                    })
                })
        })
        .catch(err => {
            rs.status(500).json(err);
        })
});

router.get('/:idgrupo', (rq, rs) => {
    model.getGrupoSkill(rq.params.idgrupo)
        .then(grupoSkill => {
            model.getSkillsByGrupoSkill(grupoSkill.id_grupo_skill)
                .then(skills => {
                    rs.json({
                        grupoSkill: grupoSkill,
                        skills: skills
                    });
                })
                .catch(err => {
                    return err;
                })
        })
        .catch(err => {
            rs.status(500).json(err);
        })
});

router.post('/grupoSkills', (rq, rs) => {
    model.insertGrupoSkills(rq.body)
        .then((data) => {
            rs.status(200).json(data);
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