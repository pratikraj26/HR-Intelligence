'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IntelligenceSchema = new Schema({
  employeeID: {type: String, ref: 'Employee', required: true},
  timeSpent: {type: Number, required: true},
  avgMonthlyHour: {type: Number, required: true},
  promotionInFiveYears: {type: Number, required: true},
  lastEvaluation: {type: Number, required: true},
  satisfactionLevel: {type: Number, required: true},
  salary: {type: Number, required: true},
  left: {type: Boolean, required: true, default: false}
});

module.exports = mongoose.model('Intelligence', IntelligenceSchema);