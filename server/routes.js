'use strict';

var path = require('path');

module.exports = function(app) {
  app.use('/user', require('./api/user'));
};
