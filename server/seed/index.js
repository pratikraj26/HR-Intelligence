'use strict';

var Employee = require('../api/employee/employee.model');
var Intelligence = require('../api/intelligence/intelligence.model');
var jsonList = require('./employees.json');

var maxAvg = 0;
var maxProjectNo = 0;
var initialSapID = 100000;

// for(var i = 0; i < jsonList.length; i++){
// 	if(jsonList[i].average_montly_hours > maxAvg){
// 		maxAvg = jsonList[i].average_montly_hours;
// 	}
// 	if(jsonList[i].number_project > maxProjectNo){
// 		maxProjectNo = jsonList[i].number_project;
// 	}
// }

// for(var i = 0; i < jsonList.length; i++){
// 	jsonList[i].average_montly_hours = parseFloat(jsonList[i].average_montly_hours / maxAvg).toFixed(2);
// 	jsonList[i].number_project = parseFloat(jsonList[i].number_project / maxProjectNo).toFixed(2);
// }

// for(var i = 0; i < jsonList.length; i++){
// 	var salary = 300000;
// 	if(jsonList[i].salary == "low"){
// 		salary = 300000;
// 	}else if(jsonList[i].salary == "medium"){
// 		salary = 800000;
// 	}else if(jsonList[i].salary == "high"){
// 		salary = 1500000;
// 	}
// 	var employeeData = {
// 	  name: {
// 	  	firstName: "Test" + i,
// 	  	lastName: "Test" + i
// 	  },
// 	  email: "testuser" + i + "@yahoo.com",
// 	  sapID: initialSapID + i,
// 	  currentProject: 'Snagfilms',
// 	  salary: salary,
// 	  active: (jsonList[i].left == 0 ? true : false)
// 	}
// 	addEmployee(employeeData, jsonList[i]);
// }

// function addEmployee(employeeData, intelligenceData){
// 	Employee.create(employeeData, function(err, Employee) {
// 		if(err) { return false; }
// 		intelligenceData.employeeID = Employee._id;
// 		Intelligence.create(intelligenceData, function(err, Intelligence) {
// 			if(err) { return false; }
// 			return true;
// 		});
// 	});
// }