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

    if (persona != undefined && candidato != undefined && candidato.skills != undefined) {
        if (persona.email == null || persona.email == '')
            rs.status(500).json(rs.app.locals.respuesta('E', 'No se proporciono email', ''))
        /*
                require('../models/personas').validarPersona(persona.email).then(d => {
                    console.log(d)
                })*/

        model.insertCandidato(candidato, persona)
            .then(d => {
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
            .json(rs.app.locals.respuesta('E', 'Persona,  Candidato, o Skills falante', ''));
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
            .json(rs.app.locals.respuesta('S', 'Vacantes asignadas', ''))
        )
        .catch(err => rs.status(500)
            .json(rs.app.locals.respuesta('E'.err.name, err))
        )
})

router.post('/linkedin/new', (rq, rs) => {
    var linkedin_candidato = rq.body;

    var candidato = {
        foto: null,
        pais: null,
        ciudad: null,
        codigo_postal: null,
        fecha_graduacion: null,
        universidad: null,
        cv_digital: null,
        grado_estudios: null,
        grado_ingles: null,
        skills: [],
        sueldo_actual: null,
        prestaciones_actual: null,
        expectativa_actual: null,
        fecha_actualizacion: null,
        id_reclutador_alta: null,
        id_fuente: null,
        oferta: null,
        fecha_oferta: null,
        id_reclutador_oferta: null,
        R2R: null,
        tipo_casa: null,
        trabajo_actual: null,
        razon_cambio_trabajo: null,
        reubicacion: null,
        estado_civil: null,
        dependientes_economicos: null,
        ingresos_extras: null,
        ingreso_extra_fam: null,
        proceso_reclutamiento: null
    };
    var persona = {};
    var nombre = linkedin_candidato.name.split(' ');

    persona.nombre = nombre[0];
    persona.apellido_paterno = nombre[1];
    persona.apellido_materno = '';
    persona.tel_celular = linkedin_candidato.contactInfo.phone[0].trim().substr(0, 13);
    persona.email = linkedin_candidato.contactInfo.email[0];

    //candidato.foto = linkedin_candidato.image;
    candidato.curriculum_vitae = crearCV(linkedin_candidato.jobs);
    candidato.skype = linkedin_candidato.contactInfo.ims[0]

    model.insertCandidato(candidato, persona)
        .then(d => {
            rs.status(200)
                .json(rs.app.locals.respuesta('S', 'Candidato Guardado', ''));
        })
        .catch(err => {
            console.log(err);
            rs.status(500)
                .json(rs.app.locals.respuesta('E', err.name, err));
        })
})

function crearCV(jobs) {
    let cv = 'Experiencia laboral: ';

    jobs.forEach((job, index) => {
        cv += 'Empresa: ' + job.company + ' ';
        cv += 'Posicion: ' + job.position + ' ';
        cv += 'Tiempo Laborado: ' + job.timeWorking + ' ';
        cv += 'Descripcion del Puesto: ' + job.descripcion + ' ';
    })
    return cv;
}

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

module.exports = router;