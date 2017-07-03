'use strict';

var path = require('path');

module.exports = function(app) {
  app.use('/user', require('./api/user'));
  app.use('/employee', require('./api/employee'));
  app.use('/intelligence', require('./api/intelligence'));
};
