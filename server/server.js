"use strict";

var express = require('express'),
    app = express(),
    request = require('request'),
    bodyParser = require('body-parser'),
    Q = require('q');

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
//console.log(__dirname + "/../app/");
app.use(express.static(__dirname+"/../app/"));
app.use(bodyParser.json());

var getList = function (key,currentPage,pageCount) {
    var defer = Q.defer();
    key = encodeURIComponent(key);
    console.log(key);
    request.get("http://172.7.1.243:3003/goods/query/" + key + "?pageSize=" + pageCount + "&pageNumber=" + currentPage, function (err, response) {
        console.log(response.body);
        if(!err && response.body.code === 0){
            defer.resolve(response.body.data);
        }else{
            defer.reject("网络异常");
            console.log("取商品分类列表出错：" + err);
        }
    });
    return defer.promise;
};

var getDetail = function (objectId) {
    var defer = Q.defer();
    request.get("http://172.7.1.243:3003/goods/details/" + objectId, function (err, response) {
        if(!err && response.body.code === 0){
            defer.resolve(response.body.data);
        }else{
            defer.reject("网络异常");
            console.log("取商品详情出错：" + err);
        }
    });
    return defer.promise;
};

var getGoodImg = function (objectId) {
    var defer = Q.defer();
    request.get("http://172.7.1.243:3003/goods/photo/" + objectId, function (err, response) {
        if(!err && response.body.code === 0){
            defer.resolve(response.body.data);
        }else{
            defer.reject("网络异常");
            console.log("取商品图片出错：" + err);
        }
    });
    return defer.promise;
};

app.get("/getBranchGoods/:key/:currentPage/:pageCount",function(req,res){
    var key = req.params.key;
    var currentPage = req.params.currentPage;
    var pageCount = req.params.pageCount;
    getList(key,currentPage,pageCount)
        .then(function (data) {
            res.send({code:0,data:data});
        })
        .catch(function (err) {
            res.send({code:1,err:err});
        });
});

app.get("/getBranchDetail/:objectId",function(req,res){
    var objectId = req.params.objectId;
    getDetail(objectId)
        .then(function (data) {
            res.send({code:0,data:data});
        })
        .catch(function (err) {
            res.send({code:1,err:err});
        });
});

app.get("/getGoodPhoto/:objectId", function (req,res) {
    var objectId = req.params.objectId;
    getGoodImg(objectId)
        .then(function (data) {
            res.send({code:0,data:data});
        })
        .catch(function (err) {
            res.send({code:1,err:err});
        });
});


app.listen(3010);
console.log("Server listening on port 3010");