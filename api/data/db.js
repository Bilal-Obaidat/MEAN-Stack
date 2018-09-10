var mongoose = require('mongoose');
var dburl = 'mongodb://user:User2018@ds129003.mlab.com:29003/clients';

mongoose.connect(dburl, { useNewUrlParser: true });

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

require('./userModel');