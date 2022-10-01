//Imports
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const middlewareAuth = require('../middlewares/auth');
const middlewareMulter = require('../middlewares/multer-config');

//Routes
router.get('/:loaded', middlewareAuth, postController.getAllPosts);
router.get('/details/:id', middlewareAuth, postController.getOnePost);
router.get('/new/:id', middlewareAuth, postController.getNewPosts);
router.post('', middlewareAuth, middlewareMulter, postController.uploadPost);
router.post('/:id', middlewareAuth, middlewareMulter, postController.commentPost);
router.post('/like/:id', middlewareAuth, postController.likePost);
router.put('/:id', middlewareAuth, middlewareMulter, postController.modifyPost);
router.delete('/:id', middlewareAuth, postController.deletePost);

//Exports
module.exports = router;
