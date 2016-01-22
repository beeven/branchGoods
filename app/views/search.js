'use strict';

var angular = require("angular");

var m = angular.module('branchApp.goods');

m.controller('search.MainCtrl',function ($scope,$location) {
    //console.log("test");
    /*$scope.search = function(){
        $route..go("^.goodList",{keyword:$scope.keyword});
    };*/
    $scope.search = function(){
        $location.url("/goodList/" + $scope.keyword);
        $scope.url = $location.url();
    };
});