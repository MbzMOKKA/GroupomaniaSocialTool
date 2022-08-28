//Imports
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

//Routes
router.get('', userController.getAllUser);

//Exports
module.exports = router;
