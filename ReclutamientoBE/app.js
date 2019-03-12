var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var vacantesRouter = require('./routes/vacantes');
var skillsRouter = require('./routes/skills');
var candidatosRouter = require('./routes/candidatos');
var evaluacionesRouter = require('./routes/evaluaciones');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/vacantes', vacantesRouter);
app.use('/skills', skillsRouter);
app.use('/candidatos', candidatosRouter);
app.use('/evaluaciones', evaluacionesRouter);
module.exports = app;