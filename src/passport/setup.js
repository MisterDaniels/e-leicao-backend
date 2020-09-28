const bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('login',
    new LocalStrategy({ usernameField: 'et' }, (et, password, done) => {
        User.findOne({ et: et })
            .then(user => {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { msg: 'Wrong password' });
                    }
                });
            }).catch(err => {
                return done(null, false, { msg: err });
            });
    })
);

passport.use('jwt', new JWTStrategy({
    secretOrKey: 'TOP_SECRET',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch(err) {
        done(err);
    }
}))

module.exports = passport;