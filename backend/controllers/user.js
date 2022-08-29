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
    const modUserId = request.auth.userId;
    console.log(modUserId);
    const targetUserId = request.params.id;
    //Checking if the target exists
    check.ifDocumentExists(request, response, User, { _id: targetUserId }, "This user doesn't exists", (targetUser) => {
        //Getting the mod account
        check.ifDocumentExists(request, response, User, { _id: modUserId }, "This user doesn't exists", (modUser) => {
            if (checkUser.ifHasRequiredPrivilege(response, modUser, 2, 1)) {
            }
        });
    });
};
exports.modifyUserState = (request, response, next) => {
    const targetUserId = request.params.id;
    console.log('MODIFY USER STATE');
};
