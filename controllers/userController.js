// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getOneUser = async (req, res) => {
  const id = req.params.userId;
  try {
    // const user = await User.findOne({where: {id : id}});
    const user = await User.findByPk(id);
    res.json(user);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const { firstname, lastname, username, email, password} = req.body;

    // Check if username and email are provided
    if (!username || !email || !password || !firstname || !lastname) {
      return res.status(400).json({ error: 'Username, firstname, lastname, email and password are required' });
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.error('Error generating salt:', err);
        return;
      }

      // Hash the password with the generated salt
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          return;
        }
        
        // Store the hashed password in the database
        console.log('Hashed password:', hash);
      });
    });
    // Create the user record in the database
    const newUser = await User.create({
      firstname, lastname, username, email, password
      // You can add more fields here if needed
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
