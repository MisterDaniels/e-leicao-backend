var express = require('express');
var cors = require('cors');
var { errors } = require('celebrate');

var routes = require('./routes');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(errors())
app.use(routes);

module.exports = app;