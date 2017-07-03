'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
  	firstName: {type: String, required: true, lowercase: true, trim: true},
  	lastName: {type: String, required: true, lowercase: true, trim: true}
  },
  dial_code: {type: Number},
  code: {type: String},
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('User', UserSchema);