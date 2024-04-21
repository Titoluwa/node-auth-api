// controllers/registerController.js
const User = require('../models/user');
const { validateRegistrationBody } = require('../schemas/userSchema');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    try {
        // Validate input data
        const salt = await bcrypt.genSalt(10);
        const { error, value } = validateRegistrationBody(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
    
        let user = await User.findOne({where: {email: value.email}});
        if (user) return res.status(400).send('Email already in use');

        user = new User(_.pick(req.body, ['name', 'username', 'email', 'password']));

        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        let data = {
            'message' : "New User Registered",
            'status': '201 created',
            'newUser' : user
        };
        res.status(201).json(data);
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Error registering user' });
    }
};