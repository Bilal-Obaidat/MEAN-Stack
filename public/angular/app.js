// Module
var App = angular.module('App', ['ngRoute', 'ngMessages', 'LocalStorageModule']);

App.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('App')
      .setStorageType('localStorage');
  });

// Routes
App.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    
    // Home Page
    .when('/', {
        templateUrl: 'angular/home.html',
        controller: 'home'
    })
    
    // LogIn
    .when('/logInForm', {
        templateUrl: 'angular/logInForm.html',
        controller: 'logInForm'
    })
    
    // Registration
    .when('/registerForm', {
        templateUrl: 'angular/registerForm.html',
        controller: 'registerForm'
    })

    // User Logged
    .when('/userLogged', {
        templateUrl: 'angular/userLogged.html',
        controller: 'userLogged'
    })

    // Order
    .when('/orderForm', {
        templateUrl: 'angular/orderForm.html',
        controller: 'orderForm'
    })

    // Update Profile
    .when('/updateProfile', {
        templateUrl: 'angular/updateProfile.html',
        controller: 'updateProfile'
    })

    // Sign Out
    .when('/signOut', {
        templateUrl: 'angular/home.html',
        controller: 'signOut'
    })
});

// Controllers

// Home Controller
App.controller('home', ['$scope', function($scope) {
    localStorage.clear();
}]);

// LogIn Controller
App.controller('logInForm', ['$scope', '$http', '$location', 'localStorageService', function($scope, $http, $location, localStorageService) {
    $scope.email = '';
    $scope.password = '';

    $scope.logIn = function () {
        if($scope.logInForm.$valid){
        var postData = {
            email: $scope.email,
            password: $scope.password
          };
         
        $http.post('/logInForm', postData).then(function(response) {
            var token = response.data.token;
            $location.path('/userLogged');
            var user = JSON.parse(window.atob(token.split(".")[1])).username;
            localStorage.setItem('user', user);
            });
        }
    };
}]);

// Registration Controller
App.controller('registerForm', ['$scope', '$http', '$location', function($scope, $http, $location) {
    var model = this;
    $scope.email = '';
    $scope.password = '';

    $scope.register = function () {
        if($scope.registerForm.$valid){
        var postData = {
            email: $scope.email,
            password: $scope.password,
          };

                $http.post('/registerForm', postData).then(function(response) {
                    console.log(response);
                    model.message = 'Successful.';
                    model.error = '';
                    $location.path('/logInForm');
                }).catch(function(error) {
                console.log(error);
              });
          }
        }
}]);

// Order Controller
App.controller('orderForm', ['$scope', '$http', function($scope, $http) {
    $scope.day = '';
    $scope.time = '';

    $scope.order = function () {
        var user = localStorage.getItem('user');
        var postData = {
            day: $scope.day,
            time: $scope.time,
            email: user
          };

        $http.post('/placeOrder', postData).then(function(response) {
            console.log(response);
            });
    };
}]);

// Update Profile Controller
App.controller('updateProfile', ['$scope', '$http', function($scope, $http) {
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.phone = '';
    $scope.number = '';
    $scope.street = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zip = '';

    var user = localStorage.getItem('user');
    if (user) {
    $scope.update = function () {
        var postData = {
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            phone: $scope.phone,
            email: user,
            password: $scope.password,
            number: $scope.number,
            street: $scope.street,
            city: $scope.city,
            state: $scope.state,
            zip: $scope.zip
          };
        
        $http.put('/updateProfile', postData).then(function(response) {
            console.log(response);
            });
            console.log(postData);
    };
    }
}]);

// Sign Out Controller
App.controller('signOut', ['$scope', '$location', function($scope, $location) {
    localStorage.clear();
    $location.path('/');
}]);