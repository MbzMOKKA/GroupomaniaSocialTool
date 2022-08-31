//Imports
const errorFunctions = require('../responses/errors');

//Exports

//Check if a document exists on the database
exports.updateDocumentOnDB = (response, collection, documentId, newDocumentContent, callback) => {
    collection
        .updateOne({ _id: documentId }, newDocumentContent)
        .then(() => {
            callback();
        })
        .catch((error) => errorFunctions.sendServerError(response));
};

//Create an object that represent a post shown in the homepage that will be sent to the user
exports.formatHomepagePost = (post) => {
    return {
        postUploadedBefore: post.postUploadedBefore, //TEMPORARY
        _id: post._id,
        uploaderId: post.uploaderId,
        contentText: post.contentText,
        contentImg: post.contentImg,
        commentCounter: post.childPosts.length,
        likeCounter: post.userLikeList.length,
        uploadDate: post.uploadDate,
        editCounter: post.editCounter,
    };
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
