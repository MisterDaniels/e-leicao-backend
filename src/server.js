require('dotenv').config();
var session = require('express-session');
const { errors } = require('celebrate');
const mongoStore = require('connect-mongo')(session);

const app = require('./app');
const passport = require('./passport/setup');
const mongoose = require('./database/setup');
const routes = require('./routes');

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.use(errors());

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log('Server online');
});