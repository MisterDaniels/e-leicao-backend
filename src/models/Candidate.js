const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidateModel = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
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

module.exports = Candidate = mongoose.model('candidates', CandidateModel);