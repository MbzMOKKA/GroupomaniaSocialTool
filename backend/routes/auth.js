//Imports
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

//Routes
router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);

//Exports
module.exports = router;
