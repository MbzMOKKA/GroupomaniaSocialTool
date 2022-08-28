//Imports
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

//Routes
router.get('', userController.getAllUser);
router.put('/role/:id', userController.modifyUserRole);
router.put('/state/:id', userController.modifyUserState);

//Exports
module.exports = router;
