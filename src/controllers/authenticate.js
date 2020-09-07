module.exports = {

    async login(req, res) {
        passport.authenticate('local', (err, user, info) => {
            if (err) { 
                res.json({
                    msg: err
                });
            }

            if (!user) {
                return res.json(403, {
                    msg: 'Not authenticated'
                });
            }

            req.logIn(user, (err) => {
                return res.json(200, {
                    msg: 'Authenticated'
                });
            })(req, res, next)
        });
        return res.json({
            msg: 'Hello World'
        });
    }

}