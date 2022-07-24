var app = angular.module('AdminloginApp',[]);
//--------------------------------------------------------Login Data--------------------------------------------------------
app.controller('AdminloginController', function($scope,$http,$window){
  $scope.loginData = function(login){
    $http({
      method : "POST",
      url : "/adminsignin",
      data : login
    }).then(function success(response){
      window.location.href = '/admin/home';
      $scope.login = {};
    }, function error(response){
      alert('Invalid Credentials')
    })
  }
});