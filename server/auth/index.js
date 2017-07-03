'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config');
var User = require('../api/user/user.model');

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;