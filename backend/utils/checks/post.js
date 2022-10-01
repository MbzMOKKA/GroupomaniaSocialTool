//Imports
const errorFunctions = require('../responses/errors');
const User = require('../../models/user');
const Post = require('../../models/post');
const check = require('./common');

//Exports

//Check if the text of a post contain [1;500] caracters
exports.ifContentTxtIsValid = (response, contentText) => {
    const lengthMax = 500;
    const lengthMin = 1;
    if (contentText.length > lengthMax) {
        errorFunctions.sendBadRequestError(response, `Une publication ne peut pas contenir plus de ${lengthMax} caractères`);
    } else {
        if (contentText.length < lengthMin) {
            errorFunctions.sendBadRequestError(response, `Le contenu texte ne peut pas être vide`);
        } else {
            return true;
        }
    }
    return false;
};
