//Imports
const mongoose = require('mongoose');

//Model
const schematic = mongoose.Schema({
    postUploadedBefore: { type: Number, required: true }, //the amount of posts that were already made when this one is uploaded
    uploaderId: { type: String, required: true }, //id of the user that own this post
    parentPost: { type: String, required: true }, //id of the parent post in the database
    childPosts: { type: Array, required: true }, //array of the id of the comment posts
    userLikeList: { type: Array, required: true }, //array of the id of the user that liked the post
    contentText: { type: String, required: true }, //text content of the post
    contentImg: { type: String, required: true }, //img content src of the post
    uploadDate: { type: Date, required: true }, //date when the post was uploaded
    editCounter: { type: Number, required: true }, //the number of times the post was modified
});

//Exports
module.exports = mongoose.model('Post', schematic);
