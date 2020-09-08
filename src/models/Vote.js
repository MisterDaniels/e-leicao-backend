const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteModel = new Schema({
    et: {
        type: String,
        required: true,
        unique: true
    },
    candidate_id: {
        type: String,
        required: true
    }
}, { 
    strict: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    } 
});

module.exports = Vote = mongoose.model('votes', VoteModel);