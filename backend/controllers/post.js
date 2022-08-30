//Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//Setup
const User = require('../models/user');
const Post = require('../models/post');
const check = require('../utils/checks/common');
const checkUser = require('../utils/checks/user');
const errorFunctions = require('../utils/responses/errors');
const successFunctions = require('../utils/responses/successes');

//Exports
exports.getAllPosts = (request, response, next) => {
    const askingUserId = request.auth.userId;
    //Getting the requester account
    check.ifDocumentExists(request, response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 2)) {
            Post.find()
                .then((postList) => {
                    let finalPostList = [];
                    let finalIndex = postList.length - 1;
                    //creating a list that only contain the data we want to send and in an antichronological order
                    for (const post of postList) {
                        finalPostList[finalIndex] = {
                            postUploadedBefore: post.postUploadedBefore, //TEMPORARY
                            _id: post._id,
                            uploaderId: post.uploaderId,
                            contentText: post.contentText,
                            contentImg: post.contentImg,
                            commentCounter: post.parentPost.length,
                            likeCounter: post.userLikeList.length,
                            uploadDate: post.uploadDate,
                            editCounter: post.editCounter,
                        };
                        finalIndex--;
                    }

                    response.status(200).json(finalPostList);
                })
                .catch((error) => errorFunctions.sendServerError(response));
        }
    });
};

exports.getOnePost = (request, response, next) => {
    const targetPostId = request.params.id;
};
exports.getNewPosts = (request, response, next) => {};
exports.uploadPost = (request, response, next) => {
    const askingUserId = request.auth.userId;
    Post.count({}, function (err, count) {
        const post = new Post({
            postUploadedBefore: count,
            uploaderId: askingUserId,
            parentPost: 's',
            childPosts: [],
            userLikeList: [],
            contentText: Date.now(),
            contentImg: 's',
            uploadDate: Date.now(),
            editCounter: 0,
        });
        post.save()
            //Post created
            .then(() => {
                successFunctions.sendAccountCreationSuccess(response);
            })
            //Creation failed
            .catch((error) => errorFunctions.sendServerError(response, error));
    });
};
exports.commentPost = (request, response, next) => {};
exports.likePost = (request, response, next) => {};
exports.modifyPost = (request, response, next) => {};
exports.deletePost = (request, response, next) => {};
