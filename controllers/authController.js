// controllers/authController.js
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validateLoginBody } = require('../schemas/userSchema');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    try {
        // Validate input data
        const { error, value} = validateLoginBody(req.body);
        if (error) {
            return res.status(400).json({ 
                status: "error", 
                error: error.details[0].message 
            });
        }
    
        // check email validity
        let user = await User.findOne({ where: { email: value.email } })
        console.log(user);
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Email not registered"
            })
        }
        
        // check password validity
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                status: "error",
                message: "Incorrect password"
            })
        }

        //update login time
        const now = Date();
        await User.update({ lastLogin: now }, { where: { id: user.id } },);

        const token = jwt.sign({ id: user.id, isVerified: user.isVerified }, process.env.JWT_TOKEN);

        return res.header('auth-token', token).status(200).json({
            status: 'success',
            message: 'Login Successful',
            token: token,
            user,
        })
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};