var app = angular.module('pedigreeapp',['ui.directives', 'ui.filters','datatables', 'datatables.buttons','AngularPrint','ngRoute'])
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/pedigree', { templateUrl: 'pedigree', controller: 'PedigreeController'})
    .otherwise({ redirectTo: '/' });
  }]);
  app.controller('PedigreeController',  function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce,$rootScope,$filter,$window){
    $scope.queryDict = {}
    
    $window.location.search.substr(1).split("&").forEach(function(item) {$scope.queryDict[item.split("=")[0]] = item.split("=")[1]})
    $scope.RegNo=$scope.queryDict.id;
    $scope.hidePrint = true;
    $scope.SearchPedigree = function(){
        console.log($scope.hidePrint,'ppppppppppppppp')
        $http({
          method : 'POST',
          url : '/searchpedigree',
          data : {RegNo : $scope.RegNo}
        }).then(function success(response){
          // alert('Email Sent')
          $scope.pedigree10=response.data[0];
          console.log($scope.pedigree10,'pedigree')
        },function error(response){
          // alert('Email Not Sent')
        })
      }
  });