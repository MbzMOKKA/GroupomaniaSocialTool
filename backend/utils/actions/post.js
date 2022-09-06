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
async function findNewPosts(response, Post, indexMax, lastPostSeenId) {
    //Finalizing the range of exploration
    const lastPostSeen = await Post.findById(lastPostSeenId);
    if (lastPostSeen === null) {
        errorFunctions.sendBadRequestError(response, "Last post seen doesn't exists");
        return null;
    }
    try {
        const indexMin = lastPostSeen.postUploadedBefore;
        //Scanning new posts (must exists and not be a comment) in this range
        let newPostList = [];
        let scanIndex = indexMax;
        while (scanIndex > indexMin) {
            const newPost = await Post.findOne({ postUploadedBefore: scanIndex });
            if (newPost !== null) {
                //Checking if the post isn't a comment
                if (newPost.parentPost === 'null') {
                    const newPostFormatted = await doPostAction.formatSimplifiedPost(response, newPost);
                    newPostList.push(newPostFormatted);
                }
            }
            scanIndex--;
        }
        return newPostList;
    } catch (error) {
        errorFunctions.sendServerError(response);
        return null;
    }
}
exports.findNewPosts = findNewPosts;

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

//getting the post index of the newly uploaded post
async function getLastPostUploadedIndex(response, Post) {
    try {
        const newestPost = await Post.find().sort({ _id: -1 }).limit(1);
        if (newestPost[0] === undefined) {
            //No existing post yet
            return -1;
        } else {
            //At least one post exists, we return its index+1
            return newestPost[0].postUploadedBefore;
        }
    } catch (error) {
        errorFunctions.sendServerError(response, error);
    }
}
exports.getLastPostUploadedIndex = getLastPostUploadedIndex;
