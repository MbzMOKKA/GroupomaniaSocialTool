//Imports
const errorFunctions = require('../responses/errors');

//Exports

//Check if a document exists on the database
exports.ifDocumentExists = (response, collection, testObj, customErrorMsg, callback) => {
    collection
        .findOne(testObj)
        .then((document) => {
            if (document === null) {
                //Document does not exists
                if (customErrorMsg === null) {
                    errorFunctions.sendNotFoundError(response);
                } else {
                    errorFunctions.sendNotFoundError(response, customErrorMsg);
                }
            } else {
                callback(document);
            }
        })
        .catch((error) => errorFunctions.sendServerError(response));
};
