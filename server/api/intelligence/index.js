'use strict';

var express = require('express');
var controller = require('./intelligence.controller');

var router = express.Router();

router.get('/train', controller.tarinNetwork);
router.get('/generate/:id', controller.generateResult);

// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;