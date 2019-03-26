var express = require('express');
var router = express.Router();
var auth = require('./routes/auth');

router.post('/', (rq, rs) => {
    let db = require('./models/db');

    let credentials = {
        user: rq.body.user,
        pass: rq.body.pass
    };

    if (credentials.user !== undefined && credentials.pass !== undefined) {

        db.task(tx => {
            return tx.oneOrNone('SELECT id_persona, nombre, apellido_paterno, email FROM personas WHERE email = ${user} AND pass = ${pass}', credentials)
                .then(user => {
                    if (user) {
                        let token = auth.crearToken(user.id_persona);
                        rs.status(200).json(rs.app.locals.respuesta('S', 'Login Exitoso', {
                            USER: user,
                            TOKEN: token
                        }));
                    } else
                        rs.status(401).send('No Existe');
                })
        })
    } else {
        rs.json(rs.app.locals.respuesta('E', 'Usuario o Password faltante', ''));
    }
})

module.exports = router;