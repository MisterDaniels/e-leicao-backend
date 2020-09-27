const Candidate = require('../models/Candidate');

module.exports = {

    async create(req, res) {
        
    },

    async get(req, res) {
        const user = req;
        console.log(req.user);
    }

}