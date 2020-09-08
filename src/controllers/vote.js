const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = {

    async transact(req, res) {
        const { candidate_id } = req.body;

        const user = req.user;
    }

}