var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var cookieSession = require('cookie-session');

var vacantesRouter = require("./routes/vacantes");
var skillsRouter = require("./routes/skills");
var candidatosRouter = require("./routes/candidatos");
var evaluacionesRouter = require("./routes/evaluaciones");
var utilidadesRouter = require("./routes/utilidades");
var notasRouter = require('./routes/notas');

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/login", require('./login'));

app.use("/vacantes", vacantesRouter);
app.use("/skills", skillsRouter);
app.use("/candidatos", candidatosRouter);
app.use("/evaluaciones", evaluacionesRouter);
app.use("/utilidades", utilidadesRouter);
app.use('/notas', notasRouter);

app.locals.respuesta = function (st, msj, dt) {
    let estatus;
    switch (st.toUpperCase()) {
        case 'S':
        case 'SUCCESS':
            estatus = 'SUCCESS';
            break;
        case 'E':
        case 'ERROR':
            estatus = 'ERROR';
            break;
        case 'W':
        case 'WARNING':
            estatus = 'WARNING';
            break;
        default:
            estatus = '';
    }

    return {
        STATUS: estatus,
        MESSAGE: msj,
        DATA: dt
    }
}
module.exports = app;