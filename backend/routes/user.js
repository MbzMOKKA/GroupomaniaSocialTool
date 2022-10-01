//Imports
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const middlewareAuth = require('../middlewares/auth');

//Routes
router.get('', middlewareAuth, userController.getAllUser);
router.get('/me', middlewareAuth, userController.getMyAccountInfo);
router.put('/role/:id', middlewareAuth, userController.modifyUserRole);
router.put('/state/:id', middlewareAuth, userController.modifyUserState);

//Exports
module.exports = router;
