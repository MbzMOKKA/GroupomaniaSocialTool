//Response that is sent if the request is invalid
exports.sendBadRequestError = (response, message = 'An error occured') => {
    response.status(400).json({ message });
};
//Response that is sent if credentials are missing or incorrect
exports.sendLogInError = (response, message = 'An error occured') => {
    response.status(401).json({ message });
};
//Response that is sent if trying to do an action without permissions
exports.sendUnauthorizeError = (response, message = 'An error occured') => {
    response.status(403).json({ message });
};
//Response that is sent if the ressource asked does not exists
exports.sendNotFoundError = (response, message = 'An error occured') => {
    response.status(404).json({ message });
};
//Response that is sent if the server encountered an issue
exports.sendServerError = (response, message = 'An error occured') => {
    response.status(500).json({ message });
};
