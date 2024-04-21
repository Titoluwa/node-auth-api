// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const registerController = require('../controllers/registerController');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');
const verify = require('../middlewares/verify');

router.get('/', (req, res) => {
    res.send('Welcome to the API!!');
})

// Route to view all users
router.get('/users', [auth, verify], userController.getAllUsers);

// Route to view specific user
router.get('/user/:userId', auth, userController.getOneUser);

// Route to create a new user
router.post('/users', userController.createUser);

// for registration
router.post('/register', registerController.registerUser);

// for login
router.post('/login', authController.loginUser);

module.exports = router;
