var app = angular.module('CpayApp',[]);
//----------------------------------------------------------------------------------------------------------------
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
      console.log(details)
      console.log(uploadUrl)  
      var fd = new FormData();
      for(var key in details){
        // console.log(details[key])
        fd.append(key, details[key])
      }
      console.log(fd)
      data=$http.post(uploadUrl, fd, {
       transformRequest: angular.identity,
       headers: {'Content-Type': undefined}
     })
      .then(function(success){
        console.log(success.data)
        if(success.data){
          alert(success.data.msg)
          if(success.data.msg == 'Transaction was successful.'){
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
app.controller('CpayController', function($scope,$http,$filter,fileUpload){
  $scope.CustomPay = function(pay){
    var details = $scope.pay
    console.log(details)
    var uploadUrl = "/custompay";
    fileUpload.uploadFileToUrl(details, uploadUrl)
  };
});