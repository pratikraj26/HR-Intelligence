'use strict';

var Employee = require('../api/employee/employee.model');
var Intelligence = require('../api/intelligence/intelligence.model');
var jsonList = require('./employees.json');

var maxAvg = 0;
var maxProjectNo = 0;
var maxTimePeriod = 0;
var initialSapID = 100000;

Employee
.find()
.limit(10)
.exec(function (err, employeesList) {
	if(employeesList.length === 0){
		for(var i = 0; i < jsonList.length; i++){
			if(jsonList[i].average_montly_hours > maxAvg){
				maxAvg = jsonList[i].average_montly_hours;
			}
			if(jsonList[i].number_project > maxProjectNo){
				maxProjectNo = jsonList[i].number_project;
			}
			if(jsonList[i].time_spend_company > maxTimePeriod){
				maxTimePeriod = jsonList[i].time_spend_company;
			}
		}

		for(var i = 0; i < jsonList.length; i++){
			jsonList[i].average_montly_hours = parseFloat(jsonList[i].average_montly_hours / maxAvg).toFixed(2);
			jsonList[i].number_project = parseFloat(jsonList[i].number_project / maxProjectNo).toFixed(2);
			jsonList[i].time_spend_company = parseFloat(jsonList[i].time_spend_company / maxTimePeriod).toFixed(2);
		}

		// for(var i = 0; i < jsonList.length; i++){
		for(var i = 0; i < 5000; i++){
			var salary = 300000;
			if(jsonList[i].salary == "low"){
				salary = 300000;
			}else if(jsonList[i].salary == "medium"){
				salary = 800000;
			}else if(jsonList[i].salary == "high"){
				salary = 1500000;
			}
			var employeeData = {
			  name: {
			  	firstName: "Test" + i,
			  	lastName: "Test" + i
			  },
			  email: "testuser" + i + "@yahoo.com",
			  sapID: initialSapID + i,
			  currentProject: 'Snagfilms',
			  salary: salary,
			  active: (jsonList[i].left == 0 ? true : false)
			}
			addEmployee(employeeData, jsonList[i]);
		}
	}
});


function addEmployee(employeeData, intelligenceData){
	Employee.create(employeeData, function(err, Employee) {
		if(err) { return false; }
		var salary = 0.2;
		if(intelligenceData.salary == "low"){
			salary = 0.2;
		}else if(intelligenceData.salary == "medium"){
			salary = 0.6;
		}else if(intelligenceData.salary == "high"){
			salary = 1;
		}
		var intelligenceDetail = {
			employeeID: Employee._id,
			timeSpent: intelligenceData.time_spend_company,
			avgMonthlyHour: intelligenceData.average_montly_hours,
			promotionInFiveYears: intelligenceData.promotion_last_5years,
			WorkAccident: intelligenceData.Work_accident,
			lastEvaluation: intelligenceData.last_evaluation,
			satisfactionLevel: intelligenceData.satisfaction_level,
			salary: salary,
			left: intelligenceData.left
		}
		Intelligence.create(intelligenceDetail, function(err, Intelligence) {
			if(err) { console.log(err); return false; }
			return true;
		});
	});
}