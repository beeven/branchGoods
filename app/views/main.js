

var angular = require("angular");

module.exports = angular.module('branchApp.goods',[require('angular-ui-bootstrap'),require('./../../node_modules/angular-busy/dist/angular-busy.min').name,require("./../widget/pagination").name]);

require('./search');
require('./goodList');