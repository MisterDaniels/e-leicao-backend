const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = {

    async create(req, res) {
        const { name, et, password, cep } = req.body;

        const newUser = new User({
            name, et, password, cep
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        return res.json({
                            user
                        });
                   }).catch(err => {
                        return res.status(500).json({ msg: err });
                   });
            });
        });
    }

}