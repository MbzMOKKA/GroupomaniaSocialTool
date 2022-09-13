//Imports
const errorFunctions = require('../responses/errors');
const User = require('../../models/user');
const check = require('./common');

//Exports

//Check if the request contains a valid email and password
exports.ifAuthRequestIsValid = (request, response) => {
    //checking that the password and the email exists
    if (!request.body.email || !request.body.password) {
        errorFunctions.sendBadRequestError(response, `Veuillez saisir un E-mail et un mot de passe`);
        return false;
    }
    //checking that the password and the email contains at least 3 caracter
    const minInputLength = 3;
    if (request.body.email.length < minInputLength || request.body.password.length < minInputLength) {
        errorFunctions.sendBadRequestError(response, `L'E-mail et le mot de passe doivent inclurent au moins ${minInputLength} caractères`);
        return false;
    }
    //checking that the email contains an @
    let emailRegex = /@/;
    if (request.body.email.match(emailRegex) == null) {
        errorFunctions.sendBadRequestError(response, `L'E-mail doit contenir un @`);
        return false;
    }
    return true;
};

/*
//Check if the user behind the request is allowed do to something
exports.ifMatchesExpectedId = (request, response, expectedId) => {
    if (request.body.auth.userId === expectedId) {
        return true;
    }
    errorFunctions.sendUnauthorizeError(response);
    return false;
};*/

//Check if the user account state is 'active'
exports.ifHasRequiredPrivilege = (response, targetUser, minRoleRequired, minStateDenied) => {
    if (targetUser.role < minRoleRequired) {
        errorFunctions.sendUnauthorizeError(response, `Votre rôle n'est pas assez élevé pour faire ça`);
        return false;
    }
    if (targetUser.state >= minStateDenied) {
        errorFunctions.sendUnauthorizeError(response, `L'état de votre compte ne vous permet pas de faire ça`);
        return false;
    }
    return true;
};

//Check if the user account state is 'active'
exports.ifHasLikedPost = (post, askingUserId) => {
    if (post.userLikeList.includes(askingUserId) === true) {
        return true;
    }
    return false;
};
