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
    let returned = '?';
    await Post.findOne({ postUploadedBefore: lastIndex })
        .then((nextPost) => {
            if (nextPost === null) {
                //No new post to find remaining : end of recursion
                returned = true;
            } else {
                if (nextPost.parentPost == 'null') {
                    //New post found, trying then to find an other one
                    newPostList.unshift(nextPost);
                } else {
                    //New comment found, still trying to find a new post
                }
                returned = findNewPost(response, Post, lastIndex + 1, newPostList);
            }
        })
        .catch((error) => {
            errorFunctions.sendServerError(response);
            console.log('>false');
            returned = false;
        });

    return returned;
}
exports.findNewPost = findNewPost;

//Return an array of every comments on a post
async function findChildPostsContent(response, Post, childPosts) {
    let comments = [];
    for (let i = 0; i < childPosts.length; i++) {
        const childPostId = childPosts[i];
        const comment = await Post.findOne({ _id: childPostId });
        if (comment !== null) {
            comments.push(doPostAction.formatSimplifiedPost(comment));
        }
    }
    return comments;
}
exports.findChildPostsContent = findChildPostsContent;

//Return an array of X posts
async function findHomepagePosts(response, Post, scanIndex, postLoadedByClient) {
    //console.log('Scan index : ' + scanIndex);
    //console.log('Loaded by client : ' + postLoadedByClient);
    //Ignoring the posts and comments that the user has already loaded
    while (postLoadedByClient > 0) {
        const post = await Post.findOne({ postUploadedBefore: scanIndex });
        if (post !== null) {
            if (post.parentPost === 'null') {
                postLoadedByClient--;
            }
        }
        if (scanIndex < 0) {
            postLoadedByClient = 0;
        }
        scanIndex--;
    }
    //Finding the next few posts that the user is requesting while ignoring comments
    let scanRemaining = 3; //Maximum amount of posts returned at once : it doesn't return every existing posts
    let posts = [];
    while (scanRemaining > 0) {
        const post = await Post.findOne({ postUploadedBefore: scanIndex });
        if (post !== null) {
            if (post.parentPost === 'null') {
                posts.push(doPostAction.formatSimplifiedPost(post));
                scanRemaining--;
            }
        }
        scanIndex--;
        if (scanIndex < 0) {
            scanRemaining = 0;
        }
    }
    return posts;
}
exports.findHomepagePosts = findHomepagePosts;
