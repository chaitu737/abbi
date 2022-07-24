var app = angular.module('printwoapp',['ui.directives', 'ui.filters','datatables', 'datatables.buttons','AngularPrint','ngRoute'])
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/printworkorder', { templateUrl: 'printworkorder', controller: 'PrintWorkOrderController'})
    .otherwise({ redirectTo: '/' });
  }]);
app.controller('PrintWorkOrderController',  function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce,$rootScope,$filter,$window){
  $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
    .withButtons([
    {
      extend:    'print',
      text:      '<i class="fa fa-print" aria-hidden="true"></i> Print',
      titleAttr: 'Print'
    }
    ]
    )
  
    //  $scope.WorkOrderNumber = $window.location.search.substr(1).split('=')[1]
     $scope.queryDict = {}
     $scope.tableArray = [];
     $scope.printBtn = true;
     $window.location.search.substr(1).split("&").forEach(function(item) {$scope.queryDict[item.split("=")[0]] = item.split("=")[1]})
      $scope.wocat = $scope.queryDict.cat;
     $scope.printWorder = function(){
     }
     $scope.getWorkOrderNo = function(){
       $http({
         method : 'POST',
         url : '/getPrintWoscreendetails',
         data : {wono : $scope.queryDict.number},
       }).then(function success(response){
         $scope.printdata = response.data.one[0]
         $scope.headingData = response.data.two;
         $scope.columnData = response.data.three;
       },function error(response){
         alert('Error occured. Please try again later!');
       })
     }
     $scope.hideBtn = function(){
       $scope.printBtn = false;
     }
     });