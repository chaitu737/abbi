var app = angular.module('RegloginApp',[]);
//--------------------------------------------------------Login Data--------------------------------------------------------
app.controller('RegloginController', function($scope,$http,$window){
  $scope.loginregData = function(login){
    $http({
      method : "POST",
      url : "/regsignin",
      data : login
    }).then(function success(response){
      window.location.href = '/reghome';
      $scope.login = {};
    }, function error(response){
      alert('Invalid Credentials')
    })
  }
});