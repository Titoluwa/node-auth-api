// routes/webRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('Welcome to the WEBSITE!!');
})
router.get('/users', userController.getAllUsers);

module.exports = router;
