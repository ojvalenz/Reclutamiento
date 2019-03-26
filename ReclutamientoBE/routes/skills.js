var express = require('express');
var router = express.Router();
var model = require('../models/skills');

router.use(require('./auth').validarUsuario);

router.get('/', (rq, rs) => {
    model.getGrupoSkills()
        .then(grupoSkills => {
            model.getSkills()
                .then(skills => {
                    rs.json(rs.app.locals.respuesta('S', 'Listado de Grupo Skills y Skills', {
                        grupoSkills,
                        skills
                    }))
                })
        })
        .catch(err => {
            rs.status(500).json(rs.app.locals.respuesta('E', err.name, err));
        })
});

router.get('/:idgrupo', (rq, rs) => {
    model.getGrupoSkill(rq.params.idgrupo)
        .then(grupoSkill => {
            model.getSkillsByGrupoSkill(grupoSkill.id_grupo_skill)
                .then(skills => {
                    rs.json(rs.app.locals.respuesta('S', 'Listado Skills por Grupo Skills', {
                        grupoSkill,
                        skills
                    }));
                })
                .catch(err => {
                    rs.status(500).json(rs.app.locals.respuesta('E', err.name, err.message));
                })
        })
        .catch(err => {
            rs.status(500).json(rs.app.locals.respuesta('E', err.name, err.message));
        })
});

router.post('/grupoSkills', (rq, rs) => {
    model.insertGrupoSkills(rq.body)
        .then((data) => {
            rs.status(200).json(rs.app.locals.respuesta('S', 'Grupo Skill guardado con Exito.', data));
        })
        .catch(err => {
            rs.status(500).json(rs.app.locals.respuesta('E', err.name, err.message));
        })
});

router.post('/Skills', (rq, rs) => {
    model.insertSkill(rq.body)
        .then(() => {
            rs.json(rs.app.locals.respuesta('S', 'Skills guardados con exito.', ''));
        })
        .catch(err => {
            rs.status(500).json(rs.app.locals.respuesta('E', err.name, err));
        })
});

router.put('/grupoSkills', (rq, rs) => {
    model.updateGrupoSkills(rq.body)
        .then(() => {
            rs.json(rs.app.locals.respuesta('S', 'Se actualizo Grupo skills.', ''));
        })
        .catch(err => {
            rs.status(500).json(rs.app.locals.respuesta('E', err.name, err));
        })
});

router.put('/Skills', (rq, rs) => {
    model.updateSkill(rq.body)
        .then(() => {
            rs.json(rs.app.locals.respuesta('S', 'Se actualizaron los Skills.', ''));
        })
        .catch(err => {
            rs.status(500).json(rs.app.locals.respuesta('E', err.name, err));
        })
});

module.exports = router;