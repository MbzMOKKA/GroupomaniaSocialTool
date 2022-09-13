//Response that is sent if the request is invalid
exports.sendBadRequestError = (response, message = `Une erreur 400 s'est produite`) => {
    response.status(400).json({ message });
};
//Response that is sent if trying to do an action without permissions
exports.sendUnauthorizeError = (response, message = `Une erreur 401 s'est produite`) => {
    response.status(401).json({ message });
};
//Response that is sent if the ressource asked does not exists
exports.sendNotFoundError = (response, message = `Une erreur 404 s'est produite`) => {
    response.status(404).json({ message });
};
//Response that is sent if the server encountered an issue
exports.sendServerError = (response, message = `Une erreur 500 s'est produite`) => {
    response.status(500).json({ message });
};
