'use strict';

var angular = require("angular");

var m = angular.module('branchApp.goods');

m.controller('goodList.MainCtrl',function($scope, $http, $uibModal, $routeParams, $q, $window, $location){
    $scope.hasData = true;
    $scope.showDetail = false;
    $scope.item = null;
    $scope.keyword = $routeParams.keyword;
    var lastKey = $routeParams.keyword;
    $scope.myPromise = null;

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 10,
        pagesLength: 9,
        perPageOptions: [10, 20, 30]
    };
    //var keyword = $routeParams.keyword;
    var getGoodList = function () {
        var key = encodeURIComponent($scope.keyword);
        if($scope.keyword !== lastKey){
            $location.url("/goodList/" + $scope.keyword);
            $scope.url = $location.url();
        }
        $scope.myPromise = $http.get("./getBranchGoods/" + key+ "/" + $scope.paginationConf.currentPage + "/" + $scope.paginationConf.itemsPerPage)
            .then(function (response) {
                //console.log(response);
                if(response.data.code === 0){
                    //console.log(response.data.data[0].TOTAL_ROWS);
                    $scope.goods = response.data.data;
                    $scope.paginationConf.totalItems = response.data.data[0].TOTAL_ROWS;
                    $scope.hasData = true;
                    $window.scrollTo(0,0);
                }else{
                    $scope.hasData = false;
                }
            }, function () {
                $scope.hasData = false;
            });
    };

    var getGoodDetail = function (code) {
        var defer = $q.defer();
        $http.get("./getBranchDetail/" + code)
            .then(function (response) {
                //console.log(response);
                if(response.data.code === 0){
                    defer.resolve(response.data.data);
                }else{
                    defer.reject();
                }
            }, function () {
                defer.reject();
            });
        return defer.promise;
    };

    /*var getBigImg = function (code) {
        var defer = $q.defer();
        $http.get("./getGoodPhoto/" + code)
            .then(function (response) {
                console.log(response);
                /!*if(response.data.code === 0){
                    defer.resolve(response.data.data);
                }else{
                    defer.reject();
                }*!/
                defer.resolve(response.data);
            }, function () {
                defer.reject();
            });
        return defer.promise;
    };*/

    /*$scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 1;
        }
        for (var i = start; i <= end; i++) {
            ret.push(i);
        }
        return ret;
    };*/

    /*$scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            console.log($scope.currentPage);
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.itemsPerPage) {
            $scope.currentPage++;
            console.log($scope.currentPage);
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
        console.log($scope.currentPage);
    };*/

    $scope.open = function (code) {
        getGoodDetail(code).then(function (data) {
            $scope.showDetail = true;
            $scope.item = data;
            /*var modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.item;
                    }
                }
            });*/
        });
    };

    $scope.openImg = function (code) {
        //getBigImg(code).then(function (data) {
            //console.log(data);
            $scope.img = "./getGoodPhoto/" + code;
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.img;
                    }
                }
            });
        //});
    };

    $scope.search = function(){
        getGoodList();
    };

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getGoodList);
});

m.controller('ModalInstanceCtrl',function ($scope, $http, $uibModalInstance, item) {
    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.img = item;
    //console.log(item);

    /*var getGoodPhoto = function () {
        $http.get("./getGoodPhoto/" + item.guid)
            .then(function (response) {
                if(response.data.code === "0"){
                    $scope.slides = response.data.photos;
                }else{
                    console.log(response);
                }
            }, function (response) {
                console.log(response);
            });
    };*/

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    //$scope.$watch('item', getGoodPhoto);
});

m.filter('Percent',function(){
    return function (input){
        if(!isNaN(input) && input !== 0) {
            return (Math.round(input * 10000) / 100).toFixed(2) + '%';
        }else{
            return 0;
        }
    };
});