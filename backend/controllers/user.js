//Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//Setup
const User = require('../models/user');
const doAction = require('../utils/actions/common');
const check = require('../utils/checks/common');
const checkUser = require('../utils/checks/user');
const errorFunctions = require('../utils/responses/errors');
const successFunctions = require('../utils/responses/successes');

//Exports
exports.getAllUser = (request, response, next) => {
    const askingUserId = request.auth.userId;
    //Getting the requester account
    check.ifDocumentExists(response, User, { _id: askingUserId }, 'Invalid token', (askingUser) => {
        //Checking if the requester isn't suspended
        if (checkUser.ifHasRequiredPrivilege(response, askingUser, 0, 2)) {
            //Getting every user documents from the database
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
        }
    });
};

exports.modifyUserRole = (request, response, next) => {
    const modUserId = request.auth.userId;
    const targetUserId = request.params.id;
    const newRole = request.body.newRole;
    //Checking if the target exists
    check.ifDocumentExists(response, User, { _id: targetUserId }, "This user doesn't exists", (targetUser) => {
        //Getting the mod account
        check.ifDocumentExists(response, User, { _id: modUserId }, "This user doesn't exists", (modUser) => {
            //Checking if the mod have the privilege
            if (checkUser.ifHasRequiredPrivilege(response, modUser, 2, 1)) {
                if (targetUser.role < 2) {
                    //Checking if the targetted user doesn't already have this role as its current
                    if (targetUser.role !== newRole) {
                        targetUser.role = newRole;
                        //Modifying the targetted user on the database
                        const message = `User ${targetUser.email} role has been updated to ${targetUser.role}`;
                        doAction.updateDocumentOnDB(response, User, targetUserId, targetUser, () => {
                            successFunctions.sendModifySuccess(response, message);
                        });
                    } else {
                        errorFunctions.sendUnauthorizeError(response, 'This is already the role of the user');
                    }
                } else {
                    errorFunctions.sendUnauthorizeError(response, 'Cannot change the role of an admin');
                }
            }
        });
    });
};
exports.modifyUserState = (request, response, next) => {
    const modUserId = request.auth.userId;
    const targetUserId = request.params.id;
    const newState = request.body.newState;
    //Checking if the target exists
    check.ifDocumentExists(response, User, { _id: targetUserId }, "This user doesn't exists", (targetUser) => {
        //Getting the mod account
        check.ifDocumentExists(response, User, { _id: modUserId }, "This user doesn't exists", (modUser) => {
            //Checking if the mod have the privilege
            if (checkUser.ifHasRequiredPrivilege(response, modUser, targetUser.role + 1, 1)) {
                if (modUser.role >= 2 || newState < 2) {
                    //Checking if the targetted user doesn't already have this state as its current
                    if (targetUser.state !== newState) {
                        targetUser.state = newState;
                        //Modifying the targetted user on the database
                        const message = `User ${targetUser.email} state has been updated to ${targetUser.state}`;
                        doAction.updateDocumentOnDB(response, User, targetUserId, targetUser, () => {
                            successFunctions.sendModifySuccess(response, message);
                        });
                    } else {
                        errorFunctions.sendUnauthorizeError(response, 'This is already the state of the user');
                    }
                } else {
                    errorFunctions.sendUnauthorizeError(response, 'Moderators cannot suspend users');
                }
            }
        });
    });
};
