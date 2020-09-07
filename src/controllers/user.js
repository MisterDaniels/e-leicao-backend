const User = require('../models/User');

module.exports = {

    async create(req, res) {
        const { name, et, password } = req.body;

        const newUser = new User({
            name, et, password
        });

        newUser.save();

        return res.json(newUser);
    }

}