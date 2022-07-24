var app = angular.module('signupApp',[]);
//--------------------------------------------------------Signup Data--------------------------------------------------------
app.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;
      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);
app.service('fileUpload', ['$http', function ($http) {
  this.uploadFileToUrl = function(details, uploadUrl){
      // console.log(details)
      // console.log(uploadUrl)  
      var fd = new FormData();
      for(var key in details){
        // console.log(details[key])
        fd.append(key, details[key])
      }
      // console.log(fd)
      data=$http.post(uploadUrl, fd, {
       transformRequest: angular.identity,
       headers: {'Content-Type': undefined}
     })
      .then(function(success){
        console.log(success.data)
        if(success.data){
          alert(success.data.msg)
          if(success.data.msg == 'Transaction was successful.'){
            window.location.href = '/login'
          }
        }
        else{
          alert("Enter Valid Card Details");
        }
        return success.data
      })
      return data
    }
  }]);
app.controller('signupController', function($scope,$http,$filter,fileUpload){
  $scope.CardDetails = function(pay) {
    $scope.PaymentType.cvv = "";
    $scope.PaymentType.cc = "";
    $scope.PaymentType.expire = "";
    $http({
      method : 'POST',
      url : '/carddetails',
      data : pay
    }).then(function success(response){
      $scope.PaymentType.cc = parseInt(response.data[0].cc)
      $scope.PaymentType.expire = response.data[0].expire;
      $scope.PaymentType.cvv = response.data[0].cvv;

    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteCard = function(){
    $scope.PaymentType.cvv = "";
    $scope.PaymentType.cc = "";
    $scope.PaymentType.expire = "";
  }
  $scope.UploadImage = function(signup,pay){
    var signupObj = $scope.signup
    var details = {...signupObj , ...pay}
    // var details = $scope.signup  { pay:pay,signup : $scope.signup }
    // console.log(details)
    var uploadUrl = "/saveprofiledata";
    fileUpload.uploadFileToUrl(details, uploadUrl)
  };
  $scope.JuniorValidation = function(signup){
    if(signup.type == 89){
      $scope.jun = 'showdate';
      var date = new Date();
      var year = date.getFullYear();
      var memberyear = $filter('date')($scope.signup.dob,'yyyy')
      // console.log(memberyear)
      // console.log(year)
      var diff = year - memberyear
      // console.log(diff)
      if(diff>18){
        $scope.signup.dob = '';
        alert('You must be at least 18 or younger to select a Junior Membership')
      }
    }
    else{
      $scope.jun = {};
    }
  }
  $scope.checkPassword = function(signup){
    if(signup.passwd == signup.passwd1){
      $scope.changemessage = "";
    }
    else{
      $scope.changemessage = "Password and Confirm Password didn't match";
    }
  }
  $scope.Amount = function(signup){
    $http({
      method : "POST",
      url : "/amountforregister",
      data : signup
    }).then(function success(response){
      var amt = response.data[0].Price;
      // $scope.signup.amount = (amt * 0.02) + amt;
      $scope.amount1 = amt;
      $scope.handling = amt * 0.02;
        $scope.signup.amount = $scope.handling + amt;
      $scope.signup.amount = $scope.handling + amt;
      if($scope.PaymentType.Payment == 'eCheck') {
        $scope.signup.amount =  amt;
      }
      // $scope.amt = response.data[0].Price;
      // console.log($scope.amt)
    }, function error(response){
      // alert('Error Occured, Please Try Again !')
    })
  }
  $scope.memberType = function(){
    $http({
      method : "GET",
      url : "/membertypedata",
    }).then(function success(response){
      $scope.membertypes = response.data;
      // console.log($scope.membertypes)
    }, function error(response){
      alert('Error Occured, Please Try Again !')
    })
  }
  $scope.Checkusername = function(signup){
    $http({
      method : "POST",
      url : "/checkusername",
      data : signup
    }).then(function success(response){
      $scope.usernames = response.data[0].MemberCount;
      // console.log($scope.usernames)
      if ($scope.usernames == 1) {
        $scope.message = "Username Already Exists";
      }
      else{
        $scope.message = "Username Available";
      }
    }, function error(response){
      alert('Error Occured, Please Try Again !')
    })
  }
  $scope.partnerClicked = function(){
    alert('Please enter the managing partner information on the registration form.  Once registration is complete, you may add partners under the "Change Your Profile" link');
  }
  $scope.SameAddress = function() {
    if($scope.sameasabove){
      $scope.signup.txtaddress1 = angular.copy($scope.signup.txtaddress);
      $scope.signup.txtcity1 = angular.copy($scope.signup.txtcity);
      $scope.signup.txtstate1 = angular.copy($scope.signup.txtstate);
      $scope.signup.ccode1 = angular.copy($scope.signup.ccode);
      $scope.signup.zip1 = angular.copy($scope.signup.zip);
    } else {
      $scope.signup.txtaddress1 = "";
      $scope.signup.txtcity1 = "";
      $scope.signup.txtstate1 = "";
      $scope.signup.ccode1 = "";
      $scope.signup.zip1 = "";
    }
  };
  $scope.RegisterPayment = function(pay,amount){
    $http({
      method : 'POST',
      url : '/registerpayment',
      data : {pay : pay, amount : amount}
    }).then(function success(response){ 
      $scope.msg = response.data;
      $scope.pay = {};
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
});