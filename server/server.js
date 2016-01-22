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

app.get("/getBranchGoods/:key/:currentPage",function(req,res){
    var key = req.params.key;
    console.log(key);
    res.json({code:"0",data:""});
});

app.get("/getBranchDetail/:objectId",function(req,res){
    var objectId = req.params.objectId;
    res.json({code:"0",data:""});
});


app.listen(3010);