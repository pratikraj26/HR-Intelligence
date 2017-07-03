'use strict';

var _ = require('lodash');
var Intelligence = require('./intelligence.model');
var Employee = require('../employee/employee.model');
var auth = require('../../auth/auth.service');

// Get list of Intelligences
exports.tarinNetwork = function(req, res) {
  var n = 0;
  var trainDataArray = [];
  Intelligence
  .find()
  .sort('-addedOn')
  .populate('employeeID')
  .exec(function (err, Intelligences) {
    if(err) { return handleError(res, err); }
    // var promiseList = Intelligences.map(function(intelligence, index){
    //   return new Promise(function(resolve, reject){
    //     if( n < 10){
    //       console.log(intelligence.employeeID.sapID);
    //       trainDataArray.push({
    //         input: {
    //           timeSpent: intelligence.timeSpent,
    //           avgMonthlyHour: intelligence.avgMonthlyHour,
    //           promotionInFiveYears: intelligence.promotionInFiveYears,
    //           WorkAccident: intelligence.WorkAccident,
    //           lastEvaluation: intelligence.lastEvaluation,
    //           satisfactionLevel: intelligence.satisfactionLevel,
    //           salary: intelligence.salary,
    //         },
    //         output: {
    //           left: intelligence.left
    //         }
    //       });
    //       n++;
    //       resolve();
    //     }
    //   })
    // });

    for(var i = 0; i < Intelligences.length; i++){
      var intelligence = Intelligences[i];
      trainDataArray.push({
        input: {
          timeSpent: intelligence.timeSpent,
          avgMonthlyHour: intelligence.avgMonthlyHour,
          promotionInFiveYears: intelligence.promotionInFiveYears,
          WorkAccident: intelligence.WorkAccident,
          lastEvaluation: intelligence.lastEvaluation,
          satisfactionLevel: intelligence.satisfactionLevel,
          salary: intelligence.salary,
        },
        output: {
          left: intelligence.left
        }
      });
    }

    var promise = new Promise(function(resolve, reject){
      var train = net.train(trainDataArray);
      resolve({"trained": true});
    })

    promise
    .then(function(data){
      return res.status(200).json({"response": "System has been trained successfully"});
    })
    .catch(function(err){
      return handleError(res, err);
    })
    // return res.status(200).json(Intelligences);
  });
};

// Get a single Intelligence
exports.generateResult = function(req, res) {
  Employee.findById(req.params.id, function (err, Employee) {
    if(err) { return handleError(res, err); }
    if(!Employee) { return res.status(404).send('Not Found'); }
    var employeeID = Employee._id;
    Intelligence
    .find({
      employeeID: employeeID
    })
    .exec(function (err, intelligenceData) {
      if(err) { return handleError(res, err); }
      if(!intelligenceData) { return res.status(404).send('Not Found'); }
      var intelligenceInputData = {
        timeSpent: intelligenceData.timeSpent,
        avgMonthlyHour: intelligenceData.avgMonthlyHour,
        promotionInFiveYears: intelligenceData.promotionInFiveYears,
        WorkAccident: intelligenceData.WorkAccident,
        lastEvaluation: intelligenceData.lastEvaluation,
        satisfactionLevel: intelligenceData.satisfactionLevel,
        salary: intelligenceData.salary,
      }
      var output = net.run(intelligenceInputData);
      return res.status(200).json({"output": output});
    });
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
