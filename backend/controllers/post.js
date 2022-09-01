//Imports
const bcrypt = require('bcrypt');
const fileSystem = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//Setup
const User = require('../models/user');
const Post = require('../models/post');
const doAction = require('../utils/actions/common');
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
                        finalPostList[finalIndex] = doAction.formatHomepagePost(post);
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

exports.getNewPosts = (request, response, next) => {
    const askingUserId = request.auth.userId;
    const lastPostSeenId = request.params.id;
    //Getting the requester account
    check.ifDocumentExists(request, response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 2)) {
            Post.findOne({ _id: lastPostSeenId })
                .then((lastPostSeen) => {
                    if (lastPostSeen === null) {
                        errorFunctions.sendBadRequestError(response);
                    } else {
                        const lastIndex = lastPostSeen.postUploadedBefore;
                        //Finding every new post
                        let newPostList = [];
                        doAction
                            .findNewPost(response, Post, lastIndex + 1, newPostList)
                            .then((result) => {
                                if (result === true) {
                                    //Every new posts were collected, now proceeding to send them
                                    let finalPostList = [];
                                    let finalIndex = 0;
                                    //creating a list that only contain the data we want to send and in an antichronological order
                                    for (const post of newPostList) {
                                        finalPostList[finalIndex] = doAction.formatHomepagePost(post);
                                        finalIndex++;
                                    }
                                    response.status(200).json(finalPostList);
                                }
                            })
                            .catch((error) => errorFunctions.sendServerError(response));
                    }
                })
                .catch((error) => errorFunctions.sendServerError(response));
        }
    });
};

exports.uploadPost = (request, response, next) => {
    const askingUserId = request.auth.userId;
    //Getting the requester account
    check.ifDocumentExists(request, response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't restrained or suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 1)) {
            const contentImg = request.file ? `${request.protocol}://${request.get('host')}/images/${request.file.filename}` : 'no_img';
            const contentTxt = request.body.uploadFormTxt;
            const contentTxtLengthLimit = 1000;
            //Posts content text must contain ]0;1000] caracters
            if (contentTxt.length > contentTxtLengthLimit) {
                errorFunctions.sendBadRequestError(response, `Post text content cannot be longer than ${contentTxtLengthLimit} caracters`);
            } else {
                if (contentTxt.length <= 0) {
                    errorFunctions.sendBadRequestError(response, `Post text content cannot be empty`);
                } else {
                    //Couting how much posts existed on the database before
                    Post.count({}, function (err, count) {
                        const upload = new Post({
                            postUploadedBefore: count,
                            uploaderId: askingUserId,
                            uploaderDisplayName: askingUser.email,
                            parentPost: 'null',
                            childPosts: [],
                            userLikeList: [],
                            contentText: contentTxt,
                            contentImg: contentImg,
                            uploadDate: Date.now(),
                            editCounter: 0,
                        });
                        upload
                            .save()
                            //Post created
                            .then(() => {
                                successFunctions.sendUploadSuccess(response);
                            })
                            //Creation failed
                            .catch((error) => errorFunctions.sendServerError(response, error));
                    });
                }
            }
        }
    });
};

exports.commentPost = (request, response, next) => {
    const askingUserId = request.auth.userId;
};

exports.likePost = (request, response, next) => {
    const askingUserId = request.auth.userId;
    const targetPostId = request.params.id;
    //Getting the requester account
    check.ifDocumentExists(request, response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the post exists

        check.ifDocumentExists(request, response, Post, { _id: targetPostId }, "This post doesn't exists", (targetPost) => {
            //Checking if the requester isn't restrained or suspended
            if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 1)) {
                let message = 'Like successful';
                if (targetPost.userLikeList.includes(askingUserId) === false) {
                    //User hasn't liked yet: we like
                    targetPost.userLikeList.push(askingUserId);
                } else {
                    message = 'Unlike successful';
                    //User has already liked: we remove the like
                    const userIdIndexLike = targetPost.userLikeList.indexOf(askingUserId);
                    targetPost.userLikeList.splice(userIdIndexLike);
                }
                const newLikeCounter = targetPost.userLikeList.length;
                //Updating the likes on the data base
                Post.updateOne({ _id: targetPostId }, targetPost)
                    .then(() => response.status(200).json({ message, newLikeCounter }))
                    .catch((error) => errorFunctions.sendServerError(response));
            }
        });
    });
};

exports.modifyPost = (request, response, next) => {
    const askingUserId = request.auth.userId;
};

exports.deletePost = (request, response, next) => {
    const askingUserId = request.auth.userId;
    const targetPostId = request.params.id;
    //Getting the requester account
    check.ifDocumentExists(request, response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the post exists
        check.ifDocumentExists(request, response, Post, { _id: targetPostId }, "This post doesn't exists", (targetPost) => {
            //Checking if the requester isn't restrained or suspended
            if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 1)) {
                //Checking if the requester can do this action (deleting your own post or being moderator/admin)
                if (askingUserId === targetPost.uploaderId || checkUser.ifHasRequiredPrivilege(response, askingUser, 1, 1) === true) {
                    //Deleting the image of the sauce on the server
                    const filename = targetPost.contentImg.split('/images/')[1];
                    fileSystem.unlink(`images/${filename}`, () => {
                        //Deleting the sauce from the data base
                        Post.deleteOne({ _id: targetPostId })
                            .then(() => successFunctions.sendDeleteSuccess(response))
                            .catch((error) => errorFunctions.sendServerError(response));
                    });
                }
            }
        });
    });
};
