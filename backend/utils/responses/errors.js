//Response that is sent if the request is invalid
exports.sendBadRequestError = (response) => {
    response.status(400).json({ message : "Bad request" });
};
//Response that is sent if email or password is not correct
exports.sendLogInError = (response) => {
    response.status(401).json({ message : "Email or password invalid" });
}
//Response that is sent if trying to log into a suspended account
exports.sendAccountSuspendedError = (response) => {
    response.status(403).json({ message : 'Account suspended' });
};
//Response that is sent if trying to do an action without permissions
exports.sendUnauthorizeError = (response) => {
    response.status(403).json({ message : 'Unauthorized' });
};
//Response that is sent if the ressource asked does not exists
exports.sendNotFoundError = (response) => {
    response.status(404).json({ message : "Not found" });
};
//Response that is sent if the server encountered an issue
exports.sendServerError = (response,) => {
    response.status(500).json({ message : "Server error" });
};