var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var vacantesRouter = require('./routes/vacantes');
var skillsRouter = require('./routes/skills');
var candidatosRouter = require('./routes/candidatos');

var app = express();

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

module.exports = app;