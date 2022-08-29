//Imports
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const middlewareAuth = require('../middlewares/auth');
const middlewareMulter = require('../middlewares/multer-config');

//Routes
router.get('', userController.getAllUser);
router.put('/role/:id', middlewareAuth, userController.modifyUserRole);
router.put('/state/:id', middlewareAuth, userController.modifyUserState);

//Exports
module.exports = router;
