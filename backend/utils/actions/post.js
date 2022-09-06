//Imports
const errorFunctions = require('../responses/errors');
const check = require('../checks/common');
const doPostAction = require('./post');
const doAction = require('./common');

//Exports

//Create an object that represent a post shown in the homepage that will be sent to the user
async function formatSimplifiedPost(response, post) {
    return {
        _id: post._id,
        uploaderId: post.uploaderId,
        uploaderDisplayName: await doAction.getUserDisplayName(response, post.uploaderId),
        contentText: post.contentText,
        contentImg: post.contentImg,
        commentCounter: post.childPosts.length,
        likeCounter: post.userLikeList.length,
        uploadDate: post.uploadDate,
        editCounter: post.editCounter,
    };
}
exports.formatSimplifiedPost = formatSimplifiedPost;

//Create an URL for the image uploaded by the user
exports.buildImageUploadedURL = (request) => {
    return `${request.protocol}://${request.get('host')}/images/${request.file.filename}`;
};

//Find a new post to add without having to refresh the page
async function findNewPost(response, Post, lastIndex, newPostList) {
    let result = false;
    await Post.findOne({ postUploadedBefore: lastIndex })
        .then((nextPost) => {
            if (nextPost === null) {
                //No new post to find remaining : end of recursion
                result = true;
            } else {
                if (nextPost.parentPost == 'null') {
                    //New post found, trying then to find an other one
                    newPostList.unshift(nextPost);
                } else {
                    //New comment found, still trying to find a new post
                }
                result = findNewPost(response, Post, lastIndex + 1, newPostList);
            }
        })
        .catch((error) => {
            errorFunctions.sendServerError(response);
            console.log('>false');
            result = false;
        });
    //Every new posts were collected, now proceeding to send them
    if (result === true) {
        let finalPostList = [];
        let finalIndex = 0;
        //creating a list that only contain the data we want to send and in an antichronological order
        for (const post of newPostList) {
            finalPostList[finalIndex] = await doPostAction.formatSimplifiedPost(response, post);
            finalIndex++;
        }
        response.status(200).json(finalPostList);
    }
}
exports.findNewPost = findNewPost;

//Return an array of every comments on a post
async function findChildPostsContent(response, Post, childPosts) {
    let comments = [];
    for (let i = 0; i < childPosts.length; i++) {
        const childPostId = childPosts[i];
        const comment = await Post.findOne({ _id: childPostId });
        if (comment !== null) {
            const commentFormatted = await doPostAction.formatSimplifiedPost(response, comment);
            comments.push(commentFormatted);
        }
    }
    return comments;
}
exports.findChildPostsContent = findChildPostsContent;

//Return an array of X posts
async function findHomepagePosts(response, Post, scanIndex, postLoadedByClient) {
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
    let scanRemaining = 3; //Maximum amount of posts returned at once : it doesn't return every existing posts
    let posts = [];
    //Finding the next few posts that the user is requesting while ignoring comments
    while (scanRemaining > 0) {
        const post = await Post.findOne({ postUploadedBefore: scanIndex });
        if (post !== null) {
            if (post.parentPost === 'null') {
                const postFormatted = await doPostAction.formatSimplifiedPost(response, post);
                posts.push(postFormatted);
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

//
async function getPostUploadedBefore(response, Post) {
    try {
        const newestPost = await Post.find().sort({ _id: -1 }).limit(1);
        if (newestPost[0] === null) {
            //No existing post yet
            return 0;
        } else {
            //At least one post exists, we return its index+1
            return newestPost[0].postUploadedBefore + 1;
        }
    } catch (error) {
        errorFunctions.sendServerError(response, error);
    }
}
exports.getPostUploadedBefore = getPostUploadedBefore;
