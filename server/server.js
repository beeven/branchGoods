"use strict";

var express = require('express'),
    app = express(),
    request = require('request'),
    bodyParser = require('body-parser'),
    Q = require('q');

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
console.log(__dirname + "/../app/");
app.use(express.static(__dirname+"/../app/"));
app.use(bodyParser.json());

var getList = function (key,currentPage,pageCount) {
    var defer = Q.defer();
    request.get("" + key + "/" + pageCount + "/" + currentPage)
        .then(function (response) {
            if(response.body.code === "0"){
                defer.resolve(response.body.data);
            }else{
                defer.reject(response.body.data);
            }
        }, function (response) {
            defer.reject("网络异常");
            console.log("取商品分类列表出错：" + response);
        });
};

var getDetail = function (objectId) {
};

var getGoodImg = function (objectId) {
    var defer = Q.defer();
    request.get("" + objectId)
        .then(function (response) {
            if(response.body.code === "0"){
                defer.resolve(response.body.data);
            }else{
                defer.reject(response.body.data);
            }
        }, function (response) {
            defer.reject("网络异常");
            console.log("取商品图片出错：" + response);
        });
};

app.get("/getBranchGoods/:key/:currentPage/:pageCount",function(req,res){
    var key = req.params.key;
    var currentPage = req.params.currentPage;
    var pageCount = req.params.pageCount;
    getList(key,currentPage,pageCount)
        .then(function (data) {
            res.send({code:"0",data:data});
        })
        .catch(function (err) {
            res.send({code:"1",err:err});
        });
});

app.get("/getBranchDetail/:objectId",function(req,res){
    var objectId = req.params.objectId;
    res.json({code:"0",data:""});
});

app.get("/getGoodPhoto/:objectId", function (req,res) {
    var objectId = req.params.objectId;
    getGoodImg(objectId)
        .then(function (data) {
            res.send({code:"0",data:data});
        })
        .catch(function (err) {
            res.send({code:"1",err:err});
        });
});


app.listen(3010);