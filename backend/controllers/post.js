//Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//Setup
const Post = require('../models/post');
const errorFunctions = require('../utils/responses/errors');
const successFunctions = require('../utils/responses/successes');

//Exports
exports.getAllPosts = (request, response, next) => {};
exports.getOnePost = (request, response, next) => {
    const targetPost = request.params.id;
};
exports.uploadPost = (request, response, next) => {};
exports.commentPost = (request, response, next) => {};
exports.likePost = (request, response, next) => {};
exports.modifyPost = (request, response, next) => {};
exports.deletePost = (request, response, next) => {};
