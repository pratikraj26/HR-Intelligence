'use strict';

var _ = require('lodash');
var Employee = require('./employee.model');
var auth = require('../../auth/auth.service');

// Get list of Employees
exports.index = function(req, res) {
  Employee
  .find()
  .limit(10)
  .exec(function (err, Employees) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(Employees);
  });
};

// Get a single Employee
exports.show = function(req, res) {
  Employee.findById(req.params.id, function (err, Employee) {
    if(err) { return handleError(res, err); }
    if(!Employee) { return res.status(404).send('Not Found'); }
    return res.json(Employee);
  });
};

// Creates a new Employee in the DB.
exports.create = function(req, res) {
  Employee.create(req.body, function(err, Employee) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(Employee);
  });
};

// Updates an existing Employee in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Employee.findById(req.params.id, function (err, Employee) {
    if (err) { return handleError(res, err); }
    if(!Employee) { return res.status(404).send('Not Found'); }
    var updated = _.merge(Employee, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(Employee);
    });
  });
};

// Deletes a Employee from the DB.
exports.destroy = function(req, res) {
  Employee.findById(req.params.id, function (err, Employee) {
    if(err) { return handleError(res, err); }
    if(!Employee) { return res.status(404).send('Not Found'); }
    Employee.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
