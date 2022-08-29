//Imports
const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');
const middlewareAuth = require('../middlewares/auth');
const middlewareMulter = require('../middlewares/multer-config');

//Routes
router.get('', postController.getAllPosts);
router.get('/:id', postController.getOnePost);
router.post('', postController.uploadPost);
router.post('/:id', postController.commentPost);
router.post('/like/:id', postController.likePost);
router.put('/:id', postController.modifyPost);
router.delete('/:id', postController.deletePost);

//Exports
module.exports = router;
