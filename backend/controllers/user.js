//Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//Setup
const User = require('../models/user');
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
        .hash(request.body.password, 11)
        .then((hash) => {
            //Hashed password created, creating the user
            const user = new User({
                email: request.body.email,
                password: hash,
                role: 'staff',
                state: 'active',
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
    //Looking if the user exists
    User.findOne({
        email: request.body.email,
    })
        .then((user) => {
            if (user === null) {
                //User does not exists
                errorFunctions.sendLogInError(response, 'Credentials are incorrect');
            } else {
                //Email is okay
                bcrypt
                    .compare(request.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            //Wrong password
                            errorFunctions.sendLogInError(response, 'Credentials are incorrect');
                        } else {
                            //Everything is okay, the user is logged in
                            response.status(200).json({
                                /*userId: user._id,*/
                                token: jwt.sign(
                                    {
                                        userId: user._id,
                                    },
                                    process.env.TOKEN_SECRET_WORD,
                                    {
                                        expiresIn: '48h',
                                    }
                                ),
                            });
                        }
                    })
                    //Server error
                    .catch((error) => errorFunctions.sendServerError(response));
            }
        })
        //Server error
        .catch((error) => errorFunctions.sendServerError(response));
};
