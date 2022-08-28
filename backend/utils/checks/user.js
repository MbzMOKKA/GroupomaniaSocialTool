const errorFunctions = require('../responses/errors');

//Check if the request contains a valid email and password
exports.ifAuthRequestIsValid = (request, response) => {
    //checking that the password and the email exists
    if (!request.body.email || !request.body.password) {
        errorFunctions.sendBadRequestError(response, `Request doesn't contain email and/or password`);
        return false;
    }
    //checking that the password and the email contains at least 3 caracter
    const minInputLength = 3;
    if (request.body.email.length < minInputLength || request.body.password.length < minInputLength) {
        errorFunctions.sendBadRequestError(response, `Email and/or password must contain at least ${minInputLength} caracters`);
        return false;
    }
    //checking that the email contains an @
    let emailRegex = /@/;
    if (request.body.email.match(emailRegex) == null) {
        errorFunctions.sendBadRequestError(response, `Email doesn't contain '@'`);
        return false;
    }
    return true;
};
