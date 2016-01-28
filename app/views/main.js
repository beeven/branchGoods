

var angular = require("angular");

module.exports = angular.module('branchApp.goods',[require('angular-ui-bootstrap'),require('angular-busy').name,require("./../widget/pagination").name]);

require('./search');
require('./goodList');