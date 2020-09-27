const passport = require('passport');
const jwt = require('jsonwebtoken');

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

                return res.status(200).json({ token });
            });
        })(req, res, next);
    }

}