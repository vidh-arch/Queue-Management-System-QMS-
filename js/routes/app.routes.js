(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        
        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl: 'templates/landing.html',
                controller: 'AuthController',
                controllerAs: 'auth'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'AuthController',
                controllerAs: 'auth'
            })
            .when('/user', {
                templateUrl: 'templates/user-dashboard.html',
                controller: 'UserController',
                controllerAs: 'user',
                resolve: {
                    authGuard: ['AuthService', '$location', function(AuthService, $location) {
                        if (!AuthService.isAuthenticated()) {
                            $location.path('/login');
                        }
                    }]
                }
            })
            .when('/admin', {
                templateUrl: 'templates/admin-dashboard.html',
                controller: 'AdminController',
                controllerAs: 'admin',
                resolve: {
                    authGuard: ['AuthService', '$location', function(AuthService, $location) {
                        if (!AuthService.isAuthenticated() || !AuthService.isAdmin()) {
                            $location.path('/login');
                        }
                    }]
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();