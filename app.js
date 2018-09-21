var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var port = process.env.PORT || 3000;

require('./api/data/db.js');

app.use(express.static(__dirname + '/public'));

app.use(urlencodedParser);

app.use(bodyParser.json());

app.use('/', routes);

app.listen(port);
console.log('MEAN.JS application started on port ' + port);