'use strict';

var angular = require("angular");

var m = angular.module('branchApp.goods');

m.controller('goodList.MainCtrl',function($scope, $http, $uibModal, $routeParams){
    $scope.currentPage = 1;
    $scope.itemsPerPage = 0;
    $scope.hasData = false;
    $scope.item = null;
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    /*$scope.goods = [{code:1,name:"test1",img:"",remark:"testtest"},
        {code:2,name:"test2",img:"",remark:"testtest"},
        {code:3,name:"test3",img:"",remark:"testtest"}];*/
    var keyword = $routeParams.keyword;
    var getGoodList = function (key, page) {
        $http.get("http://localhost:3010/getBranchGoods/" + key+ "/" + page)
            .then(function (response) {
                console.log(response);
                if(response.data.code === "0"){
                    //$scope.goods = response.data.goods;
                    console.log("test1");
                    $scope.goods = [{code:1,name:"test1",img:"",remark:"testtest"},
                                    {code:2,name:"test2",img:"",remark:"testtest"},
                                    {code:3,name:"test3",img:"",remark:"testtest"}];
                    $scope.itemsPerPage = 5;//response.data.itemsPerPage;
                    $scope.hasData = true;
                }else{
                    $scope.hasData = false;
                }
            }, function () {
                $scope.hasData = false;
            });
    };

    /*var getGoodDetail = function (code) {
        $http.get("http://localhost:3010/getBranchDetail/" + code)
            .then(function (response) {
                console.log(response);
                if(response.data.code === "0"){
                    $scope.item = {code:1,name:"test1",img:"",remark:"testtest"};//response.data.data;
                }else{
                    return false;
                }
            }, function () {
                return false;
            });
    };*/

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 1;
        }
        for (var i = start; i <= end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
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
    };

    $scope.open = function (code) {

        $http.get("http://localhost:3010/getBranchGoods/" + keyword + "/" + $scope.currentPage)
            .then(function(response){
                if(response.data.code === "0") {
                    $scope.item = {code: 1, name: "test1", img: "", remark: "testtest"};
                    var modalInstance = $uibModal.open({
                        templateUrl: 'myModalContent.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'lg',
                        resolve: {
                            item: function () {
                                return $scope.item;
                            }
                        }
                    });
                }else{
                    return null;
                }
            },function(){
                return null;
            });
    };

    $scope.search = function(){
        getGoodList($scope.keyword,1);
    };

    $scope.$watch('currentPage', getGoodList(keyword, $scope.currentPage));
});

m.controller('ModalInstanceCtrl',function ($scope, $uibModalInstance, item) {

    $scope.item = item;
    console.log(item);

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});