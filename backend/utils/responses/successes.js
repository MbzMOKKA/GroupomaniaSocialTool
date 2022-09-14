//Response that is sent if an generic action is successfully done
exports.sendGenericSuccess = (response, message = 'Requête réussit') => {
    response.status(200).json({ message });
};
//Response that is sent if a deletion is successfully done
exports.sendDeleteSuccess = (response, message = 'Supression effectué') => {
    response.status(200).json({ message });
};
//Response that is sent if a modification is successfully done
exports.sendModifySuccess = (response, message = 'Modification effectué') => {
    response.status(200).json({ message });
};
//Response that is sent if an account is successfully created
exports.sendAccountCreationSuccess = (response, message = 'Compte créé') => {
    response.status(201).json({ message });
};
//Response that is sent if an upload is successfully done
exports.sendUploadSuccess = (response, message = 'Publication effectué') => {
    response.status(201).json({ message });
};
