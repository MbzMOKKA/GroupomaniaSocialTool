//Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Model
const schematic = mongoose.Schema({
    email: { type: String, required: true, unique: true }, //unique email
    password: { type: String, required: true }, //encrypted password
    role: { type: Number, required: true }, //0 = staff, 1 = moderator, 2 = administrator
    state: { type: Number, required: true }, //0 = active, 1 = restrained, 2 = suspended
});

//Unique email validator
schematic.plugin(uniqueValidator);

//Exports
module.exports = mongoose.model('User', schematic);
