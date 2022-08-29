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
