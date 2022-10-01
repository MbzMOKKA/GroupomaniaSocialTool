//Imports
const errorFunctions = require('../responses/errors');
const User = require('../../models/user');

//Exports

//Update a document on the database
exports.updateDocumentOnDB = (response, collection, documentId, newDocumentContent, callback) => {
    collection
        .updateOne({ _id: documentId }, newDocumentContent)
        .then(() => {
            callback();
        })
        .catch((error) => errorFunctions.sendServerError(response));
};

//Return the role of a user from his account ID
async function getUser(userId) {
    const user = await User.findById(userId);
    if (user === null) {
        throw 'getUser : user not found';
    }
    return user;
}
exports.getUser = getUser;
