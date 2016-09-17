var mongoose = require('mongoose');
var config = require('../config');
// mongoose.Promise = global.Promise;

var connections = {};

module.exports = function() {

  var data = {};

  data.createDatabaseConnections = function() {
    connections['node_testapp_conn'] = mongoose.connect(config.databases.testapp);
  }

  return data;
};