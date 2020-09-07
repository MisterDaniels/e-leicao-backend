require('dotenv').config();
var session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const app = require('./app');

const mongoose = require('./database');

app.use(session({
    secret: '',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log('Server online');
});