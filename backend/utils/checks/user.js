//Imports
const errorFunctions = require('../responses/errors');

//Exports

//Check if the request contains a valid email and password
exports.ifAuthRequestIsValid = (request, response) => {
    //checking that the password and the email exists
    if (!request.body.email || !request.body.password) {
        errorFunctions.sendBadRequestError(response, `Veuillez saisir un E-mail et un mot de passe`);
        return false;
    }
    //checking that the password and the email contains at least 3 caracter
    const minInputLength = 5;
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

//Check if the user account has requiered privilege (role+state)
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

//Check if the user has liked this post
exports.ifHasLikedPost = (post, askingUserId) => {
    if (post.userLikeList.includes(askingUserId) === true) {
        return true;
    }
    return false;
};
