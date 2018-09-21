var path = require('path');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Client = require('../data/userModel');
var Order = require('../data/orderModel');

// GET
// Home Controller
module.exports.home = function(req, res) {

};

// User Logged Controller
module.exports.userLogged = function(req, res) {
  res.json('user Logged');
};

// Sign Out Controller
module.exports.signOut = function(req, res) {
    
};
   
 // POST
 // LogIn Controller
  module.exports.postLogInForm = function(req, res) {
    var username = req.body.email;
    var password = req.body.password;

    Client
  .findOne({ email: username }, function(err, client) {
    if (err) {
      console.log("Error authenticating client");
      res
        .status(400)
        .json(err);
    } 
    else {
      if (bcrypt.compareSync(password, client.password)) {
        console.log('User found', client);
        client.password=password;
        var token = jwt.sign({ username: client.email }, 'hsks744', { expiresIn: 3600 });
        res.status(200).json({success: true, token: token,user:client});
        console.log(token);
      } 
      else {
        res.status(401).json('Unauthorized');
        console.log("Unauthorized");
      }
    }
  });
  };

// Registration Controller
module.exports.postRegisterForm = function(req, res) {
  Client
  .create({
    firstname: null,
    lastname: null,
    phone: null,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    address: {
          number: null,
          street: null,
          city: null,
          state: null,
          zip: null
      }
  }, function(err, client) {
    if (err) {
      console.log("Error creating client");
      res
        .status(400)
        .json(err);
    } else {
      console.log("Client created!");
      console.log(req.body);
      res
        .status(201)
        .json(client);
    }
  });
};

// Order Controller
module.exports.postPlaceOrder = function(req, res) {
  Order
  .create({
    day: req.body.day,
    time: req.body.time,
    email: req.body.email,
  }, function(err, order) {
    if (err) {
      console.log("Error placing order");
      res
        .status(400)
        .json(err);
    } else {
      console.log("Order created!");
      res
        .status(201)
        .json(order);
    }
  });
};

//Get User Profile
module.exports.getUserProfile = function(req, res) {
    console.log(req.user);
    console.log(req.email);
    Client
      .findOne({ email: req.email})
      .exec(function(err, profile) {
        if(profile){
          console.log('Profile retrieved');
          console.log(profile);
          res.status(201).json(profile);
        }
        else{
          console.log(err);
          res.status(400).json('User not found');
        }
      });
}
// Update Profile Controller
module.exports.putUpdateProfile = function(req, res) {
    console.log(req.body);
    console.log(req.email);
    Client
      .findOne({ email: req.body.email })
      .exec(function(err, profile) {

        if(profile){
          console.log('Profile retrieved');
          console.log("AV",profile);
          profile.firstname = req.body.firstname;
          profile.lastname = req.body.lastname;
          profile.phone = req.body.phone;
          profile.email = req.body.email;
          profile.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
          profile.address = req.body.address;
         console.log("After",profile);
          profile
          .save(function(err) {
            console.log('Profile updated');
            console.log(profile);
             res.status(201).json(profile);
          });
      }
      else{
        res.status(401).json('User not found');
      }
      });

};

// Authenticate Controller
module.exports.authenticate = function(req, res, next) {
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'hsks744', function(error, decoded) {
      if (error) {
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
};