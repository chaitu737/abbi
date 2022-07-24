var app = angular.module('ForgotPasswordApp',[]);
app.controller('ForgotController', function($scope,$http){
  // $scope.CheckMail = function(forgot){
  //   $http({
  //     method : 'POST',
  //     url : '/CheckEmailData',
  //     data : forgot
  //   }).then(function success(response){
  //     $scope.emails = response.data[0].MemberCount;
  //     console.log($scope.emails)
  //     if ($scope.emails == 1) {
  //       $scope.message = "";
  //       $scope.forgot = {};
  //     }
  //     else{
  //       $scope.message = "Email Not Found";
  //       $scope.forgot = {};
  //     }
  //   },function error(response){
  //     // alert('Error occured. Please try again later!');
  //   })
  // }
  $scope.SendMail = function(forgot){
    // alert('Login')
    $http({
      method : 'POST',
      url : '/sendforgotemail',
      data : forgot
    }).then(function success(response){
      $scope.message = response.data;
    },function error(response){
    })
  }
})