const bcrypt = require('bcryptjs');

const Vote = require('../models/Vote');

module.exports = {

    async transact(req, res) {
        const { candidate_id } = req.body;

        const et = req.user.et;

        const newVote = new Vote({
            et, candidate_id
        });

        newVote.save().then(vote => {
            return res.json({
                vote
            });
        }).catch(err => {
            return res.status(500).json({ msg: err });
        });
    }

}