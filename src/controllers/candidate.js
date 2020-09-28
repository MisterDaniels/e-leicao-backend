const Candidate = require('../models/Candidate');

module.exports = {

    async create(req, res) {
        const { name, number, acronym, avatar } = req.body;

        const newCandidate = new Candidate({
            name, number, acronym, avatar
        });

        newCandidate.save().then(candidate => {
            return res.json({
                candidate
            });
        }).catch(err => {
            return res.status(500).json({ msg: err });
        });
    },

    async get(req, res) {
        Candidate.find({}).then(candidates => {
            res.header('X-Total-Count', candidates.length);
            res.json(candidates);
        }).catch(err => {
            return res.status(500).json({ msg: err });
        });
    }

}