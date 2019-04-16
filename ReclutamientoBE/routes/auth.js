var jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY || 'R3clut4m13nt0';

exports.crearToken = function (id_persona) {
    return jwt.sign({
        id: id_persona
    }, secret, {
        //expiresIn: "5 min"
        expiresIn: "24 hours"
    });
}

exports.validarUsuario = function (request, response, next) {
    var token = request.headers['x-access-token'];

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError')
                    response.status(403)
                    .json(response.app.locals.respuesta('E', 'Session expirada', ''))
                else {
                    response.status(500)
                        .json(response.app.locals.respuesta('E', err.name, err));
                }
            } else
                next();
        })
    } else {
        response.status(401).json(response.app.locals.respuesta('E', 'No existe token', ''))
    }
}