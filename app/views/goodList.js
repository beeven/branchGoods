'use strict';

var angular = require("angular");

var m = angular.module('branchApp.goods');

m.controller('goodList.MainCtrl',function($scope, $http, $uibModal, $routeParams, $q){
    $scope.currentPage = 1;
    $scope.itemsPerPage = 0;
    $scope.hasData = true;
    $scope.item = null;
    $scope.keyword = $routeParams.keyword;

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 10,
        pagesLength: 9,
        perPageOptions: [10, 20, 30]
    };
    /*$scope.goods = [{code:1,name:"test1",img:"",remark:"testtest"},
        {code:2,name:"test2",img:"",remark:"testtest"},
        {code:3,name:"test3",img:"",remark:"testtest"}];*/
    //var keyword = $routeParams.keyword;
    var getGoodList = function (key, page) {
        key = encodeURIComponent(key);
        $http.get("./getBranchGoods/" + key+ "/" + page + "/" + $scope.paginationConf.itemsPerPage)
            .then(function (response) {
                console.log(response);
                if(response.data.code === 0){
                    $scope.goods = response.data.data;
                    $scope.paginationConf.totalItems = response.data.count;
                    //$scope.goods = [{"guid":"1234","GOODS_ORDER_NO":"4200001235","CODE_TS":"2907121100","G_NAME":"间甲酚（m-cresol;m-hydroxytoluene;m-methylphenol）","GOODS_DESC":"无色或淡黄色可燃液体, 有苯酚的气味, 在空气中遇光逐渐变色。密度(20)1.0344, 熔点10.9℃, 沸点202.8℃, 闪点94.44℃, 自燃点558.9℃；溶于约40倍的水，溶于苛性碱液和常用有机溶剂。\r\n用途：用于消毒剂、油漆、农药等, 也是电影胶片的重要原料。并可用以制造树脂、增塑剂和香料等。\r\n"},
                    //                {"guid":"1235","GOODS_ORDER_NO":"4200001236","CODE_TS":"2907121900","G_NAME":"对甲酚（p-cresol;p-hydroxytoluene;p-methylphenol）","GOODS_DESC":"    无色结晶块状物，有苯酚的气味,可燃，CAS 号：106-44-5 ；分子量 108.14 ；密度(20)1.034, 熔点35.5℃, 沸点201.88℃, 闪点94.44℃, 自燃点558.9℃。水中溶解度40℃时达2.3%，100℃时达5%，溶于苛性碱液和常用有机溶剂。\r\n用途：制造防老剂264和橡胶防老剂的原料。在塑料工业中可制造酚醛树脂和增塑剂。在医药上用作消毒剂，还可作染料和农药的原料。"}];
                    $scope.hasData = true;
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
                console.log(response);
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
            $scope.item = data;
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
        });
    };

    $scope.search = function(){
        getGoodList($scope.keyword,1);
    };

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getGoodList($scope.keyword, $scope.paginationConf.currentPage));
});

m.controller('ModalInstanceCtrl',function ($scope, $http, $uibModalInstance, item) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.item = item;
    console.log(item);

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