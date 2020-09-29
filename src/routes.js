var express = require('express');
var router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');
const jwt = require('jsonwebtoken');

const IndexController = require('./controllers/index');
const AuthenticateController = require('./controllers/authenticate');
const UserController = require('./controllers/user');
const VoteController = require('./controllers/vote');
const CandidateController = require('./controllers/candidate');
const passport = require('passport');

router.get('/', IndexController.get);

router.post('/api/user/create', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        et: Joi.string().length(12).required(),
        password: Joi.string().required()
    })
}), UserController.create);

router.get('/api/auth', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        et: Joi.string().length(12).required(),
        password: Joi.string().required()
    })
}), AuthenticateController.login);

router.post('/api/vote', passport.authenticate('jwt', { session: false }), celebrate({
    [Segments.QUERY]: Joi.object().keys({
        candidate_id: Joi.string().alphanum().length(24).required(),
        secret_token: Joi.string().optional()
    })
}), VoteController.transact);

router.post('/api/candidate/create', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        number: Joi.number().integer().positive().required(),
        acronym: Joi.string().required(),
        avatar: Joi.string().uri().required()
    })
}), CandidateController.create);

router.get('/api/candidate', passport.authenticate('jwt', { session: false }), CandidateController.get);

module.exports = router;