//Imports
const errorFunctions = require('../responses/errors');
const User = require('../../models/user');
const Post = require('../../models/post');
const check = require('./common');

//Exports

//Check if the text of a post contain [1;1000] caracters
exports.ifContentTxtIsValid = (contentText) => {
    const lengthMax = 1000;
    const lengthMin = 1;
    if (contentText.length > lengthMax) {
        errorFunctions.sendBadRequestError(response, `Post text content cannot be longer than ${lengthMax} caracters`);
    } else {
        if (contentText.length < lengthMin) {
            errorFunctions.sendBadRequestError(response, `Post text content cannot be empty`);
        } else {
            return true;
        }
    }
    return false;
};
