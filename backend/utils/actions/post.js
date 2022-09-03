//Imports
const errorFunctions = require('../responses/errors');
const check = require('../checks/common');
const doPostAction = require('./post');

//Exports

//Create an object that represent a post shown in the homepage that will be sent to the user
exports.formatSimplifiedPost = (post) => {
    return {
        _id: post._id,
        uploaderId: post.uploaderId,
        uploaderDisplayName: post.uploaderDisplayName,
        contentText: post.contentText,
        contentImg: post.contentImg,
        commentCounter: post.childPosts.length,
        likeCounter: post.userLikeList.length,
        uploadDate: post.uploadDate,
        editCounter: post.editCounter,
    };
};
//Create an URL for the image uploaded by the user
exports.buildImageUploadedURL = (request) => {
    return `${request.protocol}://${request.get('host')}/images/${request.file.filename}`;
};

//Find a new post to add without having to refresh the page
async function findNewPost(response, Post, lastIndex, newPostList) {
    let test = '?';
    await Post.findOne({ postUploadedBefore: lastIndex })
        .then((nextPost) => {
            if (nextPost === null) {
                //No new post to find remaining : end of recursion
                //console.log('>true');
                test = true;
                //return true;
            } else {
                if (nextPost.parentPost == 'null') {
                    //New post found, trying then to find an other one
                    newPostList.unshift(nextPost);
                } else {
                    //New comment found, still trying to find a new post
                }
                test = findNewPost(response, Post, lastIndex + 1, newPostList);
            }
        })
        .catch((error) => {
            errorFunctions.sendServerError(response);
            console.log('>false');
            test = false;
        });

    return test;
}
exports.findNewPost = findNewPost;

//Return an array of every comments on a post
async function getChildPostsContent(response, Post, childPosts) {
    let comments = [];
    for (let i = 0; i < childPosts.length; i++) {
        const childPostId = childPosts[i];
        const comment = await Post.findOne({ _id: childPostId });
        comments.push(doPostAction.formatSimplifiedPost(comment));
    }
    return comments;
}
exports.getChildPostsContent = getChildPostsContent;
