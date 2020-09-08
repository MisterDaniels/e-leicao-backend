const passport = require('passport');

module.exports = {

    async login(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
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

                return res.status(200).json({
                    msg: `Logged in ${ user.id }`
                });
            });
        })(req, res, next);
    }

}