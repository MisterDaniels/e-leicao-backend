const mongoose = require('mongoose');

const url = process.env.DB_ATLAS ?
    `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@${ process.env.DB_HOST }/${ process.env.DB_NAME }?retryWrites=true&w=majority` :
    `mongodb://${ process.env.DB_HOST }:${ process.env.DB_POST }`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database online');
}).catch((err) => {
    console.log(`Database error: ${ err }`);
});

module.exports = mongoose;