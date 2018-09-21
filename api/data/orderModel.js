// Order Model
var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    email: String,
    day: String,
    time: String
});

module.exports = mongoose.model('Order', orderSchema);