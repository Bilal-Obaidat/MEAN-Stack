// User Model
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var clientSchema = new mongoose.Schema({
	firstname: String,
    lastname: String,
    phone: Number,
    email: { type: String, unique: true },
    password: String,
	address: {
        number: Number,
        street: String,
        city: String,
        state: String,
        zip: Number
    }
});

clientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Client', clientSchema);