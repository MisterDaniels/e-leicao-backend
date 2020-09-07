var express = require('express');
var router = express.Router();
const { celebrate, Joi, errors, Segments } = require('celebrate');

const IndexController = require('./controllers/index');
const AuthenticateController = require('./controllers/authenticate');

router.get('/', IndexController.get);

router.get('/login', AuthenticateController.login);

module.exports = router;