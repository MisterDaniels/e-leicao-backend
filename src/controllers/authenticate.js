const passport = require('passport');
const jwt = require('jsonwebtoken');
const Vote = require('../models/Vote');

module.exports = {

    async login(req, res, next) {
        passport.authenticate('login', (err, user, info) => {
            if (err) { 
                res.status(400).json({
                    msg: err
                });
            }

            if (!user) {
                return res.status(403).json({
                    msg: 'No user found'
                });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return res.status(400).json({ 
                        msg: err 
                    });
                }

                const token = jwt.sign({ user: user }, 'TOP_SECRET');

                Vote.find({ et: user.et }).then((user) => {
                    console.log(user);

                    if (user.length === 0) {
                        return res.status(200).json({ token });
                    }

                    return res.status(200).json({ token, has_voted: true });
                }).catch((err) => {
                    return res.status(200).json({ token });
                });
            });
        })(req, res, next);
    }

}