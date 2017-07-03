'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
  name: {
  	firstName: {type: String, required: true, lowercase: true, trim: true},
  	lastName: {type: String, required: true, lowercase: true, trim: true}
  },
  email: {type: String, required: true, lowercase: true, trim: true},
  sapID: {type: Number, required: true},
  currentProject: {type: String, default: 'Snagfilms'},
  salary: {type: Number, required: true},
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Employee', EmployeeSchema);