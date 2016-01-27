'use strict';

var angular = require("angular");

var m = angular.module('branchApp.goods');

m.controller('goodList.MainCtrl',function($scope, $http, $uibModal, $routeParams){
    $scope.currentPage = 1;
    $scope.itemsPerPage = 0;
    $scope.hasData = false;
    $scope.item = null;
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
                    $scope.goods = [{"GOODS_ORDER_NO":"4200001235","CODE_TS":"2907121100","G_NAME":"间甲酚（m-cresol;m-hydroxytoluene;m-methylphenol）","GOODS_DESC":"无色或淡黄色可燃液体, 有苯酚的气味, 在空气中遇光逐渐变色。密度(20)1.0344, 熔点10.9℃, 沸点202.8℃, 闪点94.44℃, 自燃点558.9℃；溶于约40倍的水，溶于苛性碱液和常用有机溶剂。\r\n用途：用于消毒剂、油漆、农药等, 也是电影胶片的重要原料。并可用以制造树脂、增塑剂和香料等。\r\n"},
                                    {"GOODS_ORDER_NO":"4200001236","CODE_TS":"2907121900","G_NAME":"对甲酚（p-cresol;p-hydroxytoluene;p-methylphenol）","GOODS_DESC":"    无色结晶块状物，有苯酚的气味,可燃，CAS 号：106-44-5 ；分子量 108.14 ；密度(20)1.034, 熔点35.5℃, 沸点201.88℃, 闪点94.44℃, 自燃点558.9℃。水中溶解度40℃时达2.3%，100℃时达5%，溶于苛性碱液和常用有机溶剂。\r\n用途：制造防老剂264和橡胶防老剂的原料。在塑料工业中可制造酚醛树脂和增塑剂。在医药上用作消毒剂，还可作染料和农药的原料。"}];
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
                    $scope.item = {"GOODS_ORDER_NO":"4200001235","CODE_TS":"2907121100","G_NAME":"间甲酚（m-cresol;m-hydroxytoluene;m-methylphenol）","GOODS_DESC":"无色或淡黄色可燃液体, 有苯酚的气味, 在空气中遇光逐渐变色。密度(20)1.0344, 熔点10.9℃, 沸点202.8℃, 闪点94.44℃, 自燃点558.9℃；溶于约40倍的水，溶于苛性碱液和常用有机溶剂。\r\n用途：用于消毒剂、油漆、农药等, 也是电影胶片的重要原料。并可用以制造树脂、增塑剂和香料等。\r\n"};
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