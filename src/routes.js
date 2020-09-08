var express = require('express');
var router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');

const IndexController = require('./controllers/index');
const AuthenticateController = require('./controllers/authenticate');
const UserController = require('./controllers/user');
const VoteController = require('./controllers/vote');
const CandidateController = require('./controllers/candidate');

router.get('/', IndexController.get);

router.post('/api/user/create', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        et: Joi.string().length(12).required(),
        password: Joi.string().required(),
        cep: Joi.string().length(8).required()
    })
}), UserController.create);

router.post('/api/auth', celebrate({
    [Segments.BODY]: Joi.object().keys({
        et: Joi.string().length(12).required(),
        password: Joi.string().required()
    })
}), AuthenticateController.login);

router.post('/api/vote', loggedIn, celebrate({
    [Segments.BODY]: Joi.object().keys({
        candidate_id: Joi.string().required()
    })
}), VoteController.transact);

router.post('/api/candidate/create', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        role: Joi.string().required(),
        cep: Joi.string().length(8).required()
    })
}), CandidateController.create);

router.get('/api/candidate', loggedIn, CandidateController.get);

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(403).json({
            msg: 'Not logged in'
        });
    }
}

module.exports = router;