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
exports.getAllUser = (request, response, next) => {
    User.find()
        .then((userList) => {
            let safeUserList = [];
            userList.forEach((user, index) => {
                //creating a list that only contain the data we want to send
                safeUserList[index] = {
                    _id: user._id,
                    email: user.email,
                    role: user.role,
                    state: user.state,
                };
            });
            response.status(200).json(safeUserList);
        })
        .catch((error) => errorFunctions.sendServerError(response));
};

exports.modifyUserRole = (request, response, next) => {
    const targetUser = request.params.id;
};
exports.modifyUserState = (request, response, next) => {
    const targetUser = request.params.id;
};
