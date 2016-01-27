'use strict';
var angular = require('angular');

var app = angular.module('branchApp', [
    //require('angular-animate'),
    require('angular-route'),
    require('angular-ui-bootstrap'),
    require('./views/main').name
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'search.MainCtrl'
        })
        .when('/goodList/:keyword',{
            templateUrl: 'views/goodList.html',
            controller: 'goodList.MainCtrl'
        })
        .otherwise(
            {
                redirectTo: '/search'
            });
}]);