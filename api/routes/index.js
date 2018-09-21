var express = require('express');
var path = require('path');
var router = express.Router();
var controller = require('../controllers/ctrlPages.js');

// Home Route
  router.route('/')
  .get(controller.home);

// LogIn Route
  router.route('/logInForm')
  .get(controller.authenticate, controller.userLogged)
  .post(controller.postLogInForm);

// Registration Route
  router.route('/registerForm')
  .post(controller.postRegisterForm);

// Order Route  
  router.route('/placeOrder')
  .post(controller.postPlaceOrder);

// Update Profile Route
  router.route('/updateProfile')
  .put(controller.putUpdateProfile);

  router.route('/getUser')
  .get(controller.getUserProfile);

// Sign Out Route  
  router.route('/signOut')
  .get(controller.signOut);

module.exports = router;