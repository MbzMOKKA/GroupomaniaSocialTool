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
const doPostAction = require('../utils/actions/post');
const check = require('../utils/checks/common');
const checkUser = require('../utils/checks/user');
const checkPost = require('../utils/checks/post');
const errorFunctions = require('../utils/responses/errors');
const successFunctions = require('../utils/responses/successes');

//Exports
exports.getAllPosts = (request, response, next) => {
    const askingUserId = request.auth.userId;
    const postLoadedByClient = request.params.loaded;
    //Getting the requester account
    check.ifDocumentExists(response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 2)) {
            //Finding the newest post uploaded
            doPostAction.getLastPostUploadedIndex(response).then((lastPostIndex) => {
                //Getting the last few post uploaded from there
                doPostAction.findHomepagePosts(lastPostIndex, postLoadedByClient, askingUserId).then((postList) => {
                    response.status(200).json(postList);
                });
            });
        }
    });
};

exports.getOnePost = (request, response, next) => {
    const askingUserId = request.auth.userId;
    const targetPostId = request.params.id;
    //Getting the requester account
    check.ifDocumentExists(response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't restrained or suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 1)) {
            //Checking if the post exists
            check.ifDocumentExists(response, Post, { _id: targetPostId }, "This post doesn't exists", (targetPost) => {
                //Getting the content of the comments
                doPostAction.findChildPostsContent(targetPost.childPosts, askingUserId).then((comments) => {
                    doAction.getUserDisplayName(targetPost.uploaderId).then((uploaderDisplayName) => {
                        //Sending the result
                        const detailledPost = {
                            _id: targetPost._id,
                            uploaderId: targetPost.uploaderId,
                            uploaderDisplayName: uploaderDisplayName,
                            comments: comments,
                            youHaveLiked: checkUser.ifHasLikedPost(targetPost, askingUserId),
                            likeCounter: targetPost.userLikeList.length,
                            contentText: targetPost.contentText,
                            contentImg: targetPost.contentImg,
                            uploadDate: targetPost.uploadDate,
                            editCounter: targetPost.editCounter,
                        };
                        response.status(200).json(detailledPost);
                    });
                });
            });
        }
    });
};

exports.getNewPosts = (request, response, next) => {
    const askingUserId = request.auth.userId;
    const lastPostSeenId = request.params.id;
    //Getting the requester account
    check.ifDocumentExists(response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 2)) {
            //Finding the newest post uploaded
            doPostAction.getLastPostUploadedIndex(response).then((lastPostIndex) => {
                //Getting the last few post uploaded from there that the user doesn't have
                doPostAction.findNewPosts(response, lastPostIndex, lastPostSeenId, askingUserId).then((newPostList) => {
                    if (newPostList !== null) {
                        response.status(200).json(newPostList);
                    }
                });
            });
        }
    });
};

exports.uploadPost = (request, response, next) => {
    const askingUserId = request.auth.userId;
    //Getting the requester account
    check.ifDocumentExists(response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't restrained or suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 1)) {
            const contentImg = request.file ? doPostAction.buildImageUploadedURL(request) : 'no_img';
            const contentTxt = request.body.uploadFormTxt;
            if (checkPost.ifContentTxtIsValid(contentTxt)) {
                //Couting how much posts existed on the database before
                doPostAction.getLastPostUploadedIndex(response).then((lastPostIndex) => {
                    const upload = new Post({
                        postUploadedBefore: lastPostIndex + 1,
                        uploaderId: askingUserId,
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
    });
};

exports.commentPost = (request, response, next) => {
    const askingUserId = request.auth.userId;
    const targetPostId = request.params.id;
    //Getting the requester account
    check.ifDocumentExists(response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't restrained or suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 1)) {
            //Checking if the post exists
            check.ifDocumentExists(response, Post, { _id: targetPostId }, "This post doesn't exists", (targetPost) => {
                const contentImg = request.file ? doPostAction.buildImageUploadedURL(request) : 'no_img';
                const contentTxt = request.body.uploadFormTxt;
                if (checkPost.ifContentTxtIsValid(contentTxt)) {
                    //Couting how much posts existed on the database before
                    Post.count({}, function (err, count) {
                        const upload = new Post({
                            postUploadedBefore: count,
                            uploaderId: askingUserId,
                            parentPost: targetPost._id,
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
                            .then((targetComment) => {
                                targetPost.childPosts.push(targetComment._id);
                                //updating the parent post on the database to include the comment as a child
                                doAction.updateDocumentOnDB(response, Post, targetPostId, targetPost, () => {
                                    doPostAction.formatSimplifiedPost(targetComment, askingUserId).then((returnedUploadedComment) => {
                                        response.status(201).json({ returnedUploadedComment });
                                    });
                                });
                            })
                            //Creation failed
                            .catch((error) => errorFunctions.sendServerError(response, error));
                    });
                }
            });
        }
    });
};

exports.likePost = (request, response, next) => {
    const askingUserId = request.auth.userId;
    const targetPostId = request.params.id;
    //Getting the requester account
    check.ifDocumentExists(response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't restrained or suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 1)) {
            //Checking if the post exists
            check.ifDocumentExists(response, Post, { _id: targetPostId }, "This post doesn't exists", (targetPost) => {
                let actionName = 'Like';
                let actionDone = false;
                const userHasLiked = targetPost.userLikeList.includes(askingUserId);
                switch (request.body.action) {
                    case true: //Trying to like
                        if (userHasLiked === false) {
                            //User hasn't liked yet: we like
                            targetPost.userLikeList.push(askingUserId);
                            actionDone = true;
                        }
                        break;
                    case false: //Trying to unlike
                        actionName = 'Unlike';
                        if (userHasLiked === true) {
                            //User hasn't liked yet: we like
                            const userIdIndexLike = targetPost.userLikeList.indexOf(askingUserId);
                            targetPost.userLikeList.splice(userIdIndexLike, 1);
                            actionDone = true;
                        }
                        break;
                    default: //Unknown action
                        actionName = 'Unknown action';
                        break;
                }
                if (actionDone === true) {
                    //Updating the likes on the data base if something has been done
                    doAction.updateDocumentOnDB(response, Post, targetPostId, targetPost, () => {
                        response.status(200).json({ message: actionName + ` successful` });
                    });
                } else {
                    errorFunctions.sendBadRequestError(response, actionName + ` failed : bad request`);
                }
            });
        }
    });
};

exports.modifyPost = (request, response, next) => {
    const askingUserId = request.auth.userId;
    const targetPostId = request.params.id;
    //Getting the requester account
    check.ifDocumentExists(response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't restrained or suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 1)) {
            //Checking if the post exists
            check.ifDocumentExists(response, Post, { _id: targetPostId }, "This post doesn't exists", (targetPost) => {
                //Checking if the requester can do this action (deleting your own post or being admin)
                if (askingUserId === targetPost.uploaderId || checkUser.ifHasRequiredPrivilege(response, askingUser, 2, 1) === true) {
                    const contentTxt = request.body.uploadFormTxt;
                    if (checkPost.ifContentTxtIsValid(contentTxt)) {
                        const oldContentImg = targetPost.contentImg;
                        let contentImg = oldContentImg;
                        let imageIsChanged = false;
                        if (request.file) {
                            //Image is changed
                            contentImg = doPostAction.buildImageUploadedURL(request);
                            imageIsChanged = true;
                        } else {
                            if (request.body.uploadFormImg === 'no_img') {
                                //Image is changed to be removed
                                contentImg = request.body.uploadFormImg;
                                imageIsChanged = true;
                            }
                        }
                        //updating the img and text of the post
                        targetPost.contentImg = contentImg;
                        targetPost.contentText = contentTxt;
                        targetPost.editCounter++;
                        const newPostContent = {
                            _id: targetPost._id,
                            contentText: targetPost.contentText,
                            contentImg: targetPost.contentImg,
                        };
                        //deleting the old image
                        if (imageIsChanged) {
                            const filename = oldContentImg.split('/images/')[1];
                            fileSystem.unlink(`images/${filename}`, () => {
                                //updating the post on the database
                                doAction.updateDocumentOnDB(response, Post, targetPostId, targetPost, () => {
                                    response.status(200).json(newPostContent);
                                });
                            });
                        } else {
                            //updating the post on the database
                            doAction.updateDocumentOnDB(response, Post, targetPostId, targetPost, () => {
                                response.status(200).json(newPostContent);
                            });
                        }
                    }
                }
            });
        }
    });
};

exports.deletePost = (request, response, next) => {
    const askingUserId = request.auth.userId;
    const targetPostId = request.params.id;
    //Getting the requester account
    check.ifDocumentExists(response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't restrained or suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 1)) {
            //Checking if the post exists
            check.ifDocumentExists(response, Post, { _id: targetPostId }, "This post doesn't exists", (targetPost) => {
                //Getting the post uploader
                check.ifDocumentExists(response, User, { _id: targetPost.uploaderId }, 'Uploader account no longer exists: you must delete this post directly from the database', (uploaderUser) => {
                    //Checking if the requester can do this action (deleting your own post or being moderator/admin)
                    if (askingUserId === targetPost.uploaderId || checkUser.ifHasRequiredPrivilege(response, askingUser, uploaderUser.role + 1, 1) === true) {
                        //Deleting the image of the sauce on the server
                        const filename = targetPost.contentImg.split('/images/')[1];
                        fileSystem.unlink(`images/${filename}`, () => {
                            //Deleting the sauce from the data base
                            Post.deleteOne({ _id: targetPostId })
                                .then(() => successFunctions.sendDeleteSuccess(response))
                                .catch((error) => errorFunctions.sendServerError(response));
                        });
                    }
                });
            });
        }
    });
};
