//Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//Setup
const User = require('../models/user');
const check = require('../utils/checks/common');
const checkUser = require('../utils/checks/user');
const errorFunctions = require('../utils/responses/errors');
const successFunctions = require('../utils/responses/successes');

//Exports
exports.signUp = (request, response, next) => {
    //Check if the request contains a valid email and password
    if (checkUser.ifAuthRequestIsValid(request, response) === false) {
        return null;
    }
    //Hashing the password of the new user
    bcrypt
        .hash(request.body.password, 8)
        .then((hash) => {
            //Hashed password created, creating the user
            const user = new User({
                email: request.body.email,
                password: hash,
                role: 0,
                state: 0,
            });
            //Saving the new user to the database
            user.save()
                //User created
                .then(() => {
                    successFunctions.sendAccountCreationSuccess(response);
                })
                //Creation failed
                .catch((error) => errorFunctions.sendServerError(response));
        })
        //Hashing failed
        .catch((error) => errorFunctions.sendServerError(response));
};

exports.logIn = (request, response, next) => {
    //Check if the request contains a valid email and password
    if (checkUser.ifAuthRequestIsValid(request, response) === false) {
        return null;
    }
    //Looking if the account exists
    check.ifDocumentExists(response, User, { email: request.body.email }, 'Credentials are incorrect', (targetUser) => {
        //Check if the password is valid
        bcrypt
            .compare(request.body.password, targetUser.password)
            .then((valid) => {
                if (!valid) {
                    //Wrong password
                    errorFunctions.sendLogInError(response, 'Credentials are incorrect');
                } else {
                    //Checking if the account isn't suspended
                    if (checkUser.ifHasRequiredPrivilege(response, targetUser, 0, 2)) {
                        //Everything is okay, the user is logged in
                        response.status(200).json({
                            test: targetUser.test,
                            token: jwt.sign(
                                {
                                    userId: targetUser._id,
                                },
                                process.env.TOKEN_SECRET_WORD,
                                {
                                    expiresIn: '24h',
                                }
                            ),
                        });
                    }
                }
            })
            //Server error
            .catch((error) => errorFunctions.sendServerError(response));
    });
};
