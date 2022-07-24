var app = angular.module('renewApp',[]);
//--------------------------------------------------------Login Data--------------------------------------------------------
app.controller('RenewController', function($scope,$http,$window){
  $scope.RenewDate = function(){
    $http({
        method : "GET",
        url : "/getrenewdate",
    }).then(function success(response){
      $scope.duedate = response.data;
      // console.log($scope.duedate)
    }, function error(response){
      alert('Error Occured, Please try again later')
    })
  }
  $scope.Details = function(){
    $http({
        method : "GET",
        url : "/renewdetails",
    }).then(function success(response){
      $scope.renew = response.data[0];
      // console.log($scope.renew)
    }, function error(response){
      alert('Error Occured, Please try again later')
    })
  }
  $scope.memberType1 = function(){
    $http({
        method : "GET",
        url : "/membertypedata1",
    }).then(function success(response){
      $scope.membertypes = response.data;
      // console.log($scope.membertypes)
    }, function error(response){
      alert('Error Occured, Please Try Again !')
    })
  }
  $scope.MembershipRenewal = function(renew,pay,amount){
    $http({
        method : "POST",
        url : "/membershiprenewal",
        data : {renew:renew,pay:pay,amount:amount}
    }).then(function success(response){
      $scope.msg = response.data;
    }, function error(response){
      alert('Error Occured, Please Try Again !')
    })
  }
  $scope.AmountRenew = function(renew){
    $http({
      method : "POST",
      url : "/amountforregister",
      data : renew
    }).then(function success(response){
      var amt = response.data[0].Price;
      $scope.amount = (amt * 0.02) + amt;
      console.log($scope.amount)
    }, function error(response){
      // alert('Error Occured, Please Try Again !')
    })
  }
});