//Imports
const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

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
