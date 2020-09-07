const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: {
        type: String,
        required: true
    },
    et: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { strict: false });

module.exports = User = mongoose.model('users', UserModel);