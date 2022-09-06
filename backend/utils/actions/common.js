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

//Return the display name (email) of an user from his account ID
async function getUserDisplayName(response, userId) {
    const user = await User.findById(userId);
    if (user === null) {
        //errorFunctions.sendServerError(response);
        throw 'getUserDisplayName : user not found';
    }
    return user.email;
}
exports.getUserDisplayName = getUserDisplayName;
