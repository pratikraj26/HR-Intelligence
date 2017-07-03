'use strict';

var _ = require('lodash');
var Intelligence = require('./intelligence.model');
var auth = require('../../auth/auth.service');

// Get list of Intelligences
exports.index = function(req, res) {
  Intelligence.find(function (err, Intelligences) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(Intelligences);
  });
};

// Get a single Intelligence
exports.show = function(req, res) {
  Intelligence.findById(req.params.id, function (err, Intelligence) {
    if(err) { return handleError(res, err); }
    if(!Intelligence) { return res.status(404).send('Not Found'); }
    return res.json(Intelligence);
  });
};

// Creates a new Intelligence in the DB.
exports.create = function(req, res) {
  Intelligence.create(req.body, function(err, Intelligence) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(Intelligence);
  });
};

// Creates a new Intelligence in the DB.
exports.authenticateIntelligence = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  Intelligence.find({
    email: email,
    password: password
  }, function(err, Intelligence) {    
    if(err) { return handleError(res, err); }
    if(Intelligence.length > 0){
      var token = auth.signToken(Intelligence._id, Intelligence.role);
      return res.status(200).json({token: token});
    }else{
      return res.status(200).json({'error': 'Authentication failed'});
    }
  });
};

// Updates an existing Intelligence in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Intelligence.findById(req.params.id, function (err, Intelligence) {
    if (err) { return handleError(res, err); }
    if(!Intelligence) { return res.status(404).send('Not Found'); }
    var updated = _.merge(Intelligence, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(Intelligence);
    });
  });
};

// Deletes a Intelligence from the DB.
exports.destroy = function(req, res) {
  Intelligence.findById(req.params.id, function (err, Intelligence) {
    if(err) { return handleError(res, err); }
    if(!Intelligence) { return res.status(404).send('Not Found'); }
    Intelligence.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
