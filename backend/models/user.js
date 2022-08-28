//Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Model
const schematic = mongoose.Schema({
    email: { type: String, required: true, unique: true }, //unique email
    password: { type: String, required: true }, //encrypted password
    role: { type: String, required: true }, //"staff" OR "mod" or "admin"
    state: { type: String, required: true }, //"active" OR "restrained" or "suspended"
    test: { type: Date, required: false },
});

//Unique email validator
schematic.plugin(uniqueValidator);

//Exports
module.exports = mongoose.model('User', schematic);
