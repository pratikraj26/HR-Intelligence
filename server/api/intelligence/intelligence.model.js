'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IntelligenceSchema = new Schema({
  employeeID: {type: String, ref: 'Employee', required: true},
  timeSpent: {type: Number, required: true},
  avgMonthlyHour: {type: Number, required: true},
  promotionInFiveYears: {type: Number, required: true},
  WorkAccident: {type: Number, required: true, default: 0},
  lastEvaluation: {type: Number, required: true},
  satisfactionLevel: {type: Number, required: true},
  salary: {type: Number, required: true},
  left: {type: Number, required: true, default: 0},
  addedOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Intelligence', IntelligenceSchema);