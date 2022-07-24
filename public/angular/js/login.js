var app = angular.module('loginApp',[]);
//--------------------------------------------------------Login Data--------------------------------------------------------
app.controller('loginController', function($scope,$http,$window){
  $scope.Logins = function(login){
    $http({
        method : "POST",
        url : "/signin",
        data : login
    }).then(function success(response){
      var page = response.data;
      console.log(page);
      if(page == 'home'){
        $scope.login = {};
        $window.location.href = '/home';
      }
      else if(page == 'renew'){
        $scope.login = {};
        $window.location.href = '/renew';
      }
    }, function error(response){
        $scope.error = 'Please call ABBI office at (719) 242-2747 for assistance.';
    })
  }
  $scope.UpdateSessionId = function(login){
    $http({
        method : "POST",
        url : "/updatesessionid",
        data : login
    }).then(function success(response){
    }, function error(response){
    })
  }
});