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
    //Delete User
    // Order
    .when('/deleteAccount', {
        templateUrl: 'angular/home.html',
        controller: 'deleteAccount'
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
App.controller('logInForm', ['$scope', '$rootScope','$http', '$location', 'localStorageService', function($scope,$rootScope,$http, $location, localStorageService) {
    $scope.email = '';
    $scope.password = '';

    $scope.logIn = function () {
        if($scope.logInForm.$valid){
        if($scope.email!=null && $scope.password!=null){
            var postData = {
            email: $scope.email,
            password: $scope.password
            };
         
            $http.post('/logInForm', postData).then(function(response) {
                var token = response.data.token;
                console.log(response.data.user);
                $rootScope.user=response.data.user;
    
                $location.path('/userLogged');
                var user = JSON.parse(window.atob(token.split(".")[1])).username;
                localStorage.setItem('user', user);
                });
             }
        }
    };
}]);

// Registration Controller
App.controller('registerForm', ['$scope', '$http', '$location', function($scope, $http, $location) {
    var model = this;
    $scope.email = '';
    $scope.password = '';
    $scope.repassword='';
    $scope.showError=false;
    $scope.register = function () {
        console.log($scope.registerForm.$valid);
        if($scope.registerForm.$valid){
        
            if ($scope.password== $scope.repassword){
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
            else{
                $scope.showError=true;
            }
        
        }
        else{
            $scope.showError=true;
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
            if(response.status==201)alert(response.statusText);
        });
    };
}]);

// Update Profile Controller
App.controller('updateProfile', ['$scope','$rootScope', '$http', function($scope,$rootScope, $http) {
    
    $scope.showSuccess=false;

    var user = localStorage.getItem('user');
    if (user) {
        $scope.update = function () {
            
            $http.put('/updateProfile', $rootScope.user).then(function(response) {
                console.log(response);
                if(response.status==201)$scope.showSuccess=true;
            });
              
        };
    }
}]);

// Sign Out Controller
App.controller('signOut', ['$scope', '$http','$location', function($scope,$http, $location) {
    
    var user = localStorage.getItem('user');

    localStorage.clear();
    $location.path('/');
    
}]);

App.controller('deleteAccount', ['$scope', '$http','$location', function($scope,$http, $location) {
    
    var user = localStorage.getItem('user');
   
        $http.delete('/getUser/' + user)
        .then(function(response) {
            console.log(response);
            if(response.status==200){
                localStorage.clear();
                $location.path('/');
                alert("Successfully deleted");
            }
            else{
                console.log(response.data)
            }
        });
}]);
