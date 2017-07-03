hri
.controller('listController', ['$scope', '$location', '$http', '$timeout',
  function listController($scope, $location, $http, $timeout) {

  $scope.options = {
    rowHeight: 50,
    footerHeight: 50,
    headerHeight: 50,
    scrollbarV: false,
    emptyMessage: 'Nothing to show...',
    columns: [{
      name: "SAP Id",
      prop: "sapID"
    }, {
      name: "First Name",
      prop: "name.firstName"
    },{
      name: "Last Name",
      prop: "name.lastName"
    },{
      name: "Email Id",
      prop: "email"
    }, {
      name: "Current Project",
      prop: "currentProject"
    },{
      name: "Salary",
      prop: "salary"
    },{
      name: "Action",
      prop: "_id",
      cellRenderer: function($scope){
        return '<div><button ng-click="evaluateEmployee($cell)">Predict</button></div>';
      }
    }],
    columnMode: 'force',
    paging: {
      externalPaging: true,
      size: 10
    }
   };

   $scope.evaluateEmployee = function(id) {
     $http.get('/intelligence/generate/'+id).then(function(data) {
       console.log(parseFloat(data.data.output.left) * 100);
     })
   }

   $scope.data = [];

   $scope.paging = function(offset, size){
     setTimeout(function(){
     $http.get('/employee').then(function(d) {

       $scope.options.paging.count = d.data.length;

       var set = d.data.splice(offset, size);
       // only insert items i don't already have
       set.forEach(function(r, i){
         var idx = i + (offset * size);
         $scope.data[idx] = r;
       });
     });
   }, 200)
   };

}]);
