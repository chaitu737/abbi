var app = angular.module('HomeApp',['ui.directives', 'ui.filters','datatables', 'datatables.buttons','AngularPrint','ngRoute']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/home', { template: 
        `<div>
            <h2 class="text-center" style="background-color:#503219; color:#fff; padding:5px; min-width:100px;">Home</h2>
          </div>
          <div class="container border" style="height:100%;width:90%;padding: 10px;">
            <h3 class="text-danger">Please make sure your mailing address is up to date on your profile!</h3>
            <br>
            <h3>Please allow extra time for mail delivery.</h3>
            <br>
            <a class="text-primary" href="http://members.americanbuckingbull.com/uploads/2021-abbi-rule-book.pdf" target="_blank"><h3>Click to download the 2021 Rule Book!</h3></a>
            <br>
            <h3>When ordering more than one DNA kit, *please* make sure to click on "Update Subtotal" before checking out.</h3>
            <br>
            <h3 class="text-danger"><u>Reminder</u> : All ABBI events - including American Heritage - can be entered online once you have logged in to your account. Online entries are fast, easy, and secure.</h3>
          </div>`
      })
      .when('/inventory', { templateUrl: 'inventory', controller:'HomeController' })
      .when('/transferedanimals', { templateUrl: 'transferedanimals', controller:'TransferController' })
      .when('/profile', { templateUrl: 'profile', controller:'ProfileController' })
      .when('/ChangePassword', { templateUrl: 'changepassword', controller:'ChangePasswordController' })
      .when('/searchanimal', { templateUrl: 'searchanimal', controller:'HomeController' })
      .when('/registeranimal', { templateUrl: 'registeranimal', controller:'registerAnimalController' })
      .when('/holdingpen', { templateUrl: 'holdingpen', controller:'HoldingPenController' })
      .when('/superstakes', { templateUrl: 'superstakes', controller:'SuperStacksController' })
      .when('/workorder', { templateUrl: 'workorder', controller:'WorkOrderController' })
      .when('/sponsoredevents', { templateUrl: 'sponsoredevents', controller:'SponsoredEventsController' })
      .when('/onlinestore', { templateUrl: 'onlinestore', controller:'OnlineStoreController' })
      .when('/news', { templateUrl: 'news', controller:'NewsController' })
      .when('/schedule', { templateUrl: 'schedule', controller:'ScheduleController' })
      .when('/results', { templateUrl: 'results', controller:'ResultController' })
      .when('/standings', { templateUrl: 'standings', controller:'StandingsController' })
      .when('/competition', { templateUrl: 'competition', controller:'CompetitionController' })
      .when('/entries', { templateUrl: 'entries', controller:'EntriesController' })
      .when('/enterevents', { templateUrl: 'enterevents', controller:'EnterEventsController' })
      .when('/payment', { templateUrl: 'payment', controller:'PaymentController' })
      .when('/custom', { templateUrl: 'custom', controller:'CpayController' })
      .when('/gcustom', { templateUrl: 'gcustom', controller:'GCpayController' })
      .when('/contact', { templateUrl: 'contact', controller:'ContactController' })
      .otherwise({ redirectTo: '/' });
}]);
app.directive("datepicker", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };
      var options = {
        dateFormat: "mm/dd/yy",
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      elem.datepicker(options);
    }
  }
});

//--------------------------------------------------------Home Controller------------------------------------------------------
app.controller('HomeController', function($scope,$http,$sce){
  $scope.getEventsData = function(cur){
    // alert('hi')
    $http({
      method : 'POST',
      url : '/geteventdata',
      data : cur
    }).then(function success(response){
      $scope.eventdata = response.data;
    },function error(response){
    })
  }
  $scope.EventDatas = function(event,memberprofile){
    $http({
      method : 'POST',
      url : '/posteventdata',
      data : {event : event,memberprofile : memberprofile}
    }).then(function success(response){
      console.log(response.data)
      if(response.data[0].EarTag == null && response.data[0].Category!='Maturity'){
        alert("Animal missing EID tag. Please contact office")
        $scope.eventadata=response.data[0];
      }
      else if(response.data[0].EarTag == '' && response.data[0].Category!='Maturity'){
        alert("Animal missing EID tag. Please contact office")
        $scope.eventadata=response.data[0];
      }
      else{
        $scope.eventadata = response.data[0];
      }
    },function error(response){
    })
  }
  $scope.DeleteEventData = function(eventa){
    $http({
      method : 'POST',
      url : '/deleteeventdata',
      data : eventa
    }).then(function success(response){
      alert('Removed Successfully');
    },function error(response){
    })
  }
  $scope.SaveEventRegistration = function(eventadata){
    $http({
      method : 'POST',
      url : '/saveeventregistration',
      data : eventadata
    }).then(function success(response){
      $scope.eventbdata = response.data;
    },function error(response){
    })
  }
  $scope.SaveAdditionalEvent = function(eventbdata){
    console.log(eventbdata)
    $http({
      method : 'POST',
      url : '/saveadditionalevent',
      data : {eventbdata : eventbdata}
    }).then(function success(response){
      $scope.eventiddata = response.data;
    },function error(response){
    })
  }
  $scope.EventPayBill = function(PaymentType,bills,handling,eventiddata){
    $http({
      method : 'POST',
      url : '/saveeventpay',
      data : {pay : PaymentType,bills : bills,handling : handling,eventiddata : eventiddata}
    }).then(function success(response){
      // alert(response.data)
      $scope.msg = response.data;
      console.log(response.data)
      $scope.paymentid = response.data.paymentid;
      console.log($scope.paymentid);
      $scope.type = response.data.paymentType;
      console.log($scope.type);
      $scope.date = response.data.date;
      console.log($scope.date);
      $scope.amount = response.data.Amount;
      console.log($scope.amount);
    },function error(response){
    })
  }
  $scope.paymentSuccess = function(msg){
    console.log(msg);
    $scope.msg = {};
  }
  $scope.paymentDanger = function(msg){
    console.log(msg);
    $scope.msg = {};
  }
  $scope.BillDetails = function(){
    $http({
      method : 'GET',
      url : '/getbilldetails'
    }).then(function success(response){
      $scope.bills=response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.saveBillingInfoEvent = function(bills){
    $http({
      method : 'POST',
      url : '/savebillinginfoevent',
      data : bills
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.CpaySearch = function(){
      $http({
        method : 'GET',
        url : '/cpaysearch',
      }).then(function success(response){
        $scope.cps = response.data.count;
        $scope.cps1 = response.data[0];
        // console.log($scope.cps)
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.GCpaySearch = function(){
      $http({
        method : 'GET',
        url : '/gcpaysearch',
      }).then(function success(response){
        $scope.gcps = response.data.count;
        $scope.gcps1 = response.data.data[0];
        $scope.url = $sce.trustAsResourceUrl($scope.gcps1.adobelink);
        $scope.gcps1 = {};
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  $scope.SearchAnimalProfile = function(animal){
    // console.log(animal)
    $http({
      method : 'POST',
      url : '/searchanimalprofile',
      data : animal
    }).then(function success(response){
      // console.log(response.data)
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
      $scope.offspring = response.data.offspring;
      $scope.notes = response.data.notes[0];
    },function error(response){
    })
  }
  $scope.SearchAnimalSireProfile = function(animal){
    // console.log(animal)
    $http({
      method : 'POST',
      url : '/searchanimalsireprofile',
      data : animal
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
      $scope.offspring = response.data.offspring;
    },function error(response){
    })
  }
  $scope.SearchAnimalDamProfile = function(animal){
    $http({
      method : 'POST',
      url : '/searchanimaldamprofile',
      data : animal
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
      $scope.offspring = response.data.offspring;
    },function error(response){
    })
  }
  $scope.pedigreeBTN = function(){
    $scope.pedibtn = true;
  }
  $scope.pedigreeBTNBack = function(){
    $scope.pedibtn = false;
  }
  $scope.SendPedigreePDF = function(pedigree,sendmail){
    $http({
      method : 'POST',
      url : '/sendpedigreepdf',
      data : {pedigree : pedigree,sendmail : sendmail}
    }).then(function success(response){
      alert('Email Sent')
    },function error(response){
      alert('Email Not Sent')
    })
  }
  $scope.AddDNAPay = function(dna,pay,memberprofile){
    $http({
      method : 'POST',
      url : '/adddnapay',
      data : {dna : dna,pay : pay, memberprofile : memberprofile}
    }).then(function success(response){
      // console.log(response.data.msg);
    },function error(response){
      // console.log('error');
    })
  }
  // $scope.AddEIDPay = function(eid,pay,memberprofile){
  //   $http({
  //     method : 'POST',
  //     url : '/addeidpay',
  //     data : {eid : eid,pay : pay, memberprofile : memberprofile}
  //   }).then(function success(response){
  //     // console.log(response.data.msg);
  //   },function error(response){
  //     // console.log('error');
  //   })
  // }
  $scope.EIDReciept = function(memberprofile){
    $http({
      method : 'POST',
      url : '/eidreciept',
      data : memberprofile
    }).then(function success(response){
      console.log(response.data[0])
      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.setFontSize(16);
      doc.text("EID Reciept", 30, 10);
      doc.setFontSize(10);
      doc.text("Member      :", 15, 25);
      doc.text("Address     :", 15, 35);
      doc.text("Animal      :", 15, 45);
      doc.text("RegNo       :", 15, 55);
      doc.text("Animal Id   :", 15, 65);
      doc.text(response.data[0].Membername, 40, 25);
      doc.text(response.data[0].Address, 40, 35);
      doc.text(response.data[0].Animal, 40, 45);
      doc.text(response.data[0].RegNo, 40, 55);
      doc.text(response.data[0].ID, 40, 65);
      doc.save("EID-Reciept.pdf");
    },function error(response){
      // console.log('error');
    })
  }
  $scope.SearchPedigree1 = function(animal){
    $http({
      method : 'POST',
      url : '/searchpedigree1',
      data : animal
    }).then(function success(response){
      // alert('Email Sent')
      $scope.pedigree10=response.data[0];
      $scope.pedreg = $scope.pedigree10.RegNo;
    },function error(response){
      // alert('Email Not Sent')
    })
  }
  $scope.SearchPedigree = function(animal){
    $http({
      method : 'POST',
      url : '/searchpedigree',
      data : animal
    }).then(function success(response){
      // alert('Email Sent')
      $scope.pedigree10=response.data[0];
      $scope.pedreg = $scope.pedigree10.RegNo;
    },function error(response){
      // alert('Email Not Sent')
    })
  }
  $scope.PrintPedigree = function(pedreg){
    // console.log(pedreg)
    $http({
      method : 'POST',
      url : '/printpedigree',
      data : pedreg
    }).then(function success(response){
      // alert('Email Sent')
      // console.log(response.data.pedigree[0])
      $scope.pedigree11=response.data.pedigree[0];
      $scope.preown=response.data.pre[0];
      var data = $scope.pedigree11;
      var data1 = $scope.preown;
      var doc = new jsPDF('l', 'mm', [900, 600]);
      var imgData = 'data:image/jpeg;base64,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Nd/bk0HwJrGpRrcXXh/Rfgzo+p2OkOw3G3iubiQSyqhO0M4ydvU9a0P+Doz/AJQU/HT66B/6kGmV+gFAHwB/w7w/br/6SKf+YE8P/wDx6j/h3h+3X/0kU/8AMCeH/wD49X3/AEZoA+AP+HeH7df/AEkU/wDMCeH/AP49R/w7w/br/wCkin/mBPD/AP8AHq+/6M0AfAH/AA7w/br/AOkin/mBPD//AMeo/wCHeH7df/SRT/zAnh//AOPV9/0ZoA+AP+HeH7df/SRT/wAwJ4f/APj1H/DvD9uv/pIp/wCYE8P/APx6vv8AzRnFAHwB/wAO8P26/wDpIp/5gTw//wDHqP8Ah3h+3X/0kU/8wJ4f/wDj1ff+aM0AfAH/AA7w/br/AOkin/mBPD//AMeo/wCHeH7df/SRT/zAnh//AOPV9/0ZoA+AP+HeH7df/SRT/wAwJ4f/APj1H/DvD9uv/pIp/wCYE8P/APx6vv8AzRmgD4A/4d4ft1/9JFP/ADAnh/8A+PUf8O8P26/+kin/AJgTw/8A/Hq+/wDNGc0AfAH/AA7w/br/AOkin/mBPD//AMeo/wCHeH7df/SRT/zAnh//AOPV9/5ozQB8Af8ADvD9uv8A6SKf+YE8P/8Ax6mN/wAE9f27IzuX/gogsjDkK3wG0AKx9CRNkCv0CzRQB8cf8Euf2u/iR8UvHvxo+CPxnm0PWPix+z7qunWOqa/ott9lsvEljqNobuwvPI6QzNGriRF+QEDb1wPsevgD/gnh/wAp1v8Agop/3TX/ANR+4r7/AKACiiigApB940tIPvGgBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDjfgL/wAkn0v/ALbf+jnrrm6flXI/AX/kk+l/9tv/AEc9dc3T8qxw/wDDj6Iqe7JKKKK2JCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAo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AFH7iv0Ar4A/4J3nP/BdX/gop/3TX/1H7ivv+uw8MKKKKACkH3jS0g+8aAFooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAON+Av8AySfS/wDtt/6Oeuubp+Vcj8Bf+ST6X/22/wDRz11zdPyrHD/w4+iKnuySiiitiQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPz//AODoz/lBT8dProH/AKkGmV+gFfn/AP8AB0Z/ygp+On10D/1INMr9AKACiiigAooooA/P/wD4OjP+UFPx0+ugf+pBplfoBX5//wDB0Z/ygp+On10D/wBSDTK/QCgBrrvX1qodDtfM3/Zbfd6+WM1n/wDCwtD/AOE5/wCEX/tzR/8AhJfsv2/+yftsf277Pu2+d5Od/l7uN2MZ4zT/AAz430Xxv9u/sXWNN1b+y7t7C9+xXcdx9juUxvhk2E7JFyMo2CMjIoKjUlH4WaRs43dW8tdy9DjpTbnTYbwfvIYpP95A1WVXbS0ApyWqZVk0y3eLa0MJj/ulRiki0q3t/uwwru64UDNZ+l+M9F17xJqmj2OsaXeavohj/tGxgu45Liw8xd0fnRglo9yjK7gMjkVtmgftJ2tcr21hFaj93HHHnrsUDNF1p8N4P3sUcg/21BxUwXHegrnvQLnlfmvqQQaXBbptjhijX0VAKellFFFsWNFX0C8VMabsoB1JPdlSPRbWI5W2hU+oQCpUso0ztijXd14HNWKTB9aBupN7srSaXbyxbWhhZP7pQYog0y3tP9XDFH/uqBVoj3oA96A9pO1rle6sIbtNskaSL6MuabbaTb2n+rghj9diAVYGTQcigXtJWtfQhGmwD/ljH/3wKJ7GK5TbJHHIvoy5qZgaFBFAc8r3uRwWkdqu2ONUX0VcVNnAopGXdQJt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fmnFOUYTBTpSwTfLOLdpNNpqTT1SSs7XStpfdnwR/wAE8P8AlOt/wUU/7pr/AOo/cV9/18Af8E8P+U63/BRT/umv/qP3Fff9egfKhRRRQAUg+8aWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAON+Av8AySfS/wDtt/6Oeuubp+Vcj8Bf+ST6X/22/wDRz11zdPyrHD/w4+iKnuySiiitiQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPz//AODoz/lBT8dProH/AKkGmV+gFfn/AP8AB0Z/ygp+On10D/1INMr9AKACiiigAooooA4L9pH9nzwn+1l8CvFHw38caf8A2t4V8YWD6dqNsHKOUbBDow5WRGCurDlWVT2r400//gmD+138ONMt9C8B/wDBQDxJpPhHS4ltdLs9f+E2h+INRtoEG1ElvpHR52CgDcygnFfoRRQB8Af8O8P26/8ApIp/5gTw/wD/AB6j/h3h+3X/ANJFP/MCeH//AI9X3/RQB8Af8O8P26/+kin/AJgTw/8A/HqP+HeH7df/AEkU/wDMCeH/AP49X3/RQB8Af8O8P26/+kin/mBPD/8A8eo/4d4ft1/9JFP/ADAnh/8A+PV9/wBFAHwB/wAO8P26/wDpIp/5gTw//wDHqP8Ah3h+3X/0kU/8wJ4f/wDj1ff9FAHwB/w7w/br/wCkin/mBPD/AP8AHqP+HeH7df8A0kU/8wJ4f/8Aj1ff9FAHwB/w7w/br/6SKf8AmBPD/wD8eo/4d4ft1/8ASRT/AMwJ4f8A/j1ff9FAHwB/w7w/br/6SKf+YE8P/wDx6j/h3h+3X/0kU/8AMCeH/wD49X3/AEUAfAH/AA7w/br/AOkin/mBPD//AMeo/wCHeH7df/SRT/zAnh//AOPV9/0UAfAH/DvD9uv/AKSKf+YE8P8A/wAeo/4d4ft1/wDSRT/zAnh//wCPV9/0UAfAH/DvD9uv/pIp/wCYE8P/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1b3xgj0a2WM3FuqpbzbQmPMiVVVG6oFAUgCrWqfBXwXrkOuQ33hHwzeR+JporjWEn0qCRdWkix5b3AKnzWTau0vkjaMdKPaJdAdFvqfmt+1P4i0vRP2q/wBprWLj43eIvhT4k0PSNI1fQ9O0rV4tN/4SK7j04lI5AR5l0obC+QhH+syc8Y5f9qT9rz41eJfjTa/8VFrHhPVNH8L6HqWl2yfEjSfB+m/a7i0SeaW6tL0L/aKGbcpjV1ChCpIDV+ofif8AZr+HPjjXpNU1rwD4J1bVJporh7u90O1uJ2liXZFIXdCxZF+VTnKjgYq547+Bngn4pa7puqeJvB3hXxBqWjnNhd6ppMF5PZHcGzE8iFk+YA/KRyAaPaLsHs5dGfKHwp0vxd8fv+CjfiIa9488e+HdN8G+HPDWuv4Z0XXjHpdzezQuZY5VRnR4NwbcsZAkypLEKK+nfGekaLdfHXwZd3fjnVNG1i3gvRYeG4dajt7XxCrIvmPLaEbrgwjDKV+5uJPWuo07wNoumeLb7XrXR9Lt9c1SKOC91GO0jS7vI48+WkkoG91TJ2hiQMnFJqHgfR9Z8UadrV1o+m3WtaOkiWF/NaRvdWSyACQRSEbkDgAMFIzgZrPmuzaMbI3KKz47SSPWprnznaGWGONYT92NlaQlhz1beoPH8A69tCpKCiiigAooooAKKKKACiiigAooooA+AP8Agnh/ynW/4KKf901/9R+4r7/r4A/4J4f8p1v+Cin/AHTX/wBR+4r7/oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD4//wCC8v7PevftUf8ABIz43eC/C9hcatr11pNvqVpZW6l5rtrG9tr8xRqOWdltiFUcsSAOTXuH7In7Tfhf9sH9nXwl8RPCOtaXrml+JNMt7t5LC4WVbWd4kaW3kAJMcsbMVeNs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eM07wz420XxuL7+xdY03Vv7Lu3sL37Fdx3H2O5TG+GTYTskXIyjYIyMigpVJJcqZqx2UUbsyooZupA61H/ZFqZfM8iDzPXYM1ZwfWk/4FQHtJLZlaXSbed9z28Ln1KA0v9l2/lbfIh8v02jFZ2l+M9F17xJqmj2OsaXeavohj/tGxgu45Liw8xd0fnRglo9yjK7gMjkVtYPrQV7SfcYlusKbVUKvoBVa50S1un3SW8MjerRgmre0r0oG6gmNSSd0yH+z4jHs8uPb6beKJ9OhuV2yRxyL6MuanwfWjB9aA55dyrHpFvEG228K7uuEHNO+wQlAPLj2r0G3pVjB9aMH1oD2k+5Vm0i1uH3Nbwu3qyA1JbWcdtHtjjWNfRRip+opuGHNAe0k1ZsqTaFazy73tbd2/vNGCaemmwxx+WsMYj/uhRirQoNBXtZ2tcppotrE2VtoF9wgFO/s+HZs8iPb6bRirVN+bNAnUm92RmxjLq3lpuXocdKmAxRSFsUEuTe58A/8E8P+U63/AAUU/wC6a/8AqP3Fff8AXwB/wTw/5Trf8FFP+6a/+o/cV9/0CCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/P8A/wCDoz/lBT8dProH/qQaZX6AV+f/APwdGf8AKCn46fXQP/Ug0yv0AoA/OP8AbY+G3jDxB/wU5uvF3w9mnbxt8M/h9aeIdN05X2xa4iX0qXFk+Bk+bC0iqAR8238PO/g9+040fwLj+IWma5qng7w/4i/aNW61SZr17JY7CaNXkiumVgPKxjeH+X5ea/Q2f4rfDHSv2qY/Cck2i2/xa1LQxcRhtOK311pyyMdguvLwyh1ZvK8wkYLbcAmqfw38P/Bv40eEfGHh/wAO+GfB+qaBZ+ILix8RaYfD0cVnLqkTI0plikiVJpA2w+ZhgSAQxxW3tNLNHPKnd3TPiL4u/tM+IPizpPxUu/BPxO8RRaXc/Gbw7oOj6tpGsPJFaWssEUcq2xDGMwtJuYoP3bnkg5rn/icfiV8JPCfxwksfjl8WryH4D+LNJGgpfaus0mpC8+zNKl/LsD3MYD4WIkRr83yndiv0jsv2efAFjp32OHwL4PhtTdW98YI9GtljNxbqqW820JjzIlVVRuqBQFIAq1qnwV8F65DrkN94R8M3kfiaaK41hJ9KgkXVpIseW9wCp81k2rtL5I2jHSj2iXQHRb6n5rftT+ItL0T9qv8Aaa1i4+N3iL4U+JND0jSNX0PTtK1eLTf+Eiu49OJSOQEeZdKGwvkIR/rMnPGOX/ak/a8+NXiX402v/FRax4T1TR/C+h6lpdsnxI0nwfpv2u4tEnmlurS9C/2ihm3KY1dQoQqSA1fqH4n/AGa/hz4416TVNa8A+CdW1SaaK4e7vdDtbidpYl2RSF3QsWRflU5yo4GKueO/gZ4J+KWu6bqnibwd4V8Qalo5zYXeqaTBeT2R3BsxPIhZPmAPykcgGj2i7B7OXRnyh8KdL8XfH7/go14iXXvHnj3w7pvg3w54a11/DOi68Y9Lub2aFzLHKqM6PBuDbljIEmVJYhRX074z0jRbr46+DLu78c6po2sW8F6LDw3DrUdva+IVZF8x5bQjdcGEYZSv3NxJ610tj4K0PSfGV5rVtpOl2+vavAkV5qEVoiXd5FFwiySgbnVN3yhicbjinah4H0fWfFGna1daPpt1rWjpIlhfzWkb3VksgAkEUhG5A4ADBSM4Gaz5rs2jGyNBJw900eJN0ahiSh24OQMNjBPByAcjjPUZuUUVJQUUUUAFFFFABRRRQAUUUUAFFFFAHwB/wTw/5Trf8FFP+6a/+o/cV9/18Af8E8P+U63/AAUU/wC6a/8AqP3Fff8AQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH5//APB0Z/ygp+On10D/ANSDTK/QCvz/AP8Ag6M/5QU/HT66B/6kGmV+gFAH53/tlfs+6x8dP+ClOrXnhG6/s74heB/h3ZeIfCtyzkRm9h1CT9zIMgMkqF4ju4G/PavE/CHx38H+Kf2O/FV98WPB91H4d8f/ABi1H+1DcXepRWPhedrZJRLdRWLLNdBJBhYNybmGd6FQw/Xyqlo8zxN5kccbb3ACtuG3J2nOByRgkdiSMnGToqulrGLo3d7n5EfDDwDp/wAQvgf8I/h/qsmpf8I/bfHe90dLJPtmmTW9g9rI6wrHLI11bI6OSEeQyASHLEkmrGlfAjRfhr4Wj8RaRca9DqXw0/aAi8I+Fy+s3UkWiaVJdx+baxRs5QK+47mILN3bFfrzuFG4Ue0YexR+N2v2/jC4/wCCoOpfata8H6D8Ul8el9Il1KPxQ+vXOlCUGO3gFvDNp/2KS23Llk4QuWZQM1+n37Uf/Ctf7H8J/wDCzM/Y/wDhKbD+w/8Aj6/5C+8/Zf8Aj35+9n7/AO7/AL1epHCmnbqmVS9ioU+W/mVZv+Qxb/8AXGT/ANCjq1WfpsuoPbsby3tbebdgLDO0yleOclE568Y/GtCpNAooooAKKKKACiiigAooooAKKKKACiiigD4A/wCCeH/Kdb/gop/3TX/1H7ivv+vgD/gnh/ynW/4KKf8AdNf/AFH7ivv+gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPz//AODoz/lBT8dProH/AKkGmV+gFfn/AP8AB0Z/ygp+On10D/1INMr9AKACivhv48f8FKLf9lb/AIKSXnhf4heNP7C+GP8AwjUF1Da/2Qbr/TH3fNvggefnHQnbXmfwi/4LN6p4W+EHirxRrzf8LCl1bxtNo3hKCa4tPD1slmsfmgy3DxoI1CEfNKpYkgEjNLXsTzI/TCivg6b/AILYWt/8FvDPiDQ/hzNrviXWPEj+F77QbbxFCyWV0E3xtFeJE0NxG4K4YbAPmzwMnM/aK/4Kx/EDSfD/AIu8O+G/hTqWl+K/Cehm48TalDrlneR+EL5kd0iRJItl9tVVLFcY3NhWCgsw5kfoJSM22vkz4oftK+NvDv8AwSTuvidZ615PjiPwxDqK6l9jgbE7SIpfyihi6E8bMe1eF/Cf/gp94++J1v8AAfQbzVBovjibx1D4b8e2P2O2Y6hbSxCWGUAxlY0lQkgwkHKNzjFKLurg5JOx+lFFfDF5/wAFmWt/Fd1qMfwm1q4+E9nrX9iTeMU1mDzFcSiEyrY7N7RiQgbhJjrznivt20uo9RtY5oZFmhkUOjowZXU8ggjggii6exRaorivhp4z8WeJPEPiq38ReC/+EX0/SdSNtot5/a8N9/b9rji68uMA2+T/AMs3y1drTAKKKKACiiigAooooAKKKKACiiigD4A/4J4f8p1v+Cin/dNf/UfuK+/6+AP+CeH/ACnW/wCCin/dNf8A1H7ivv8AoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD8//APg6M/5QU/HT66B/6kGmV+gFePft1/sgaD+3x+yT44+EPie6vLDRvG1gLV7u2AaazlSRJoJlB4YxzRRvtPDbcZGc18leDfhf/wAFN/gz4YsfDGj+Lv2MfHWk6JBHZ2mteKLLxFZareRRqqK08dp+5D4UE7SeSeTSvrYD6mtf2P8A7L+3LefGj/hIt32rQo9E/sb7B93bn975/mc5z93y/wAa8D8af8EVbHxb4H1yxk8eKusX3i6fxXp17L4Zgu7axaZdjwS2s0rpcLt7kryAdvFZn/G07/qwD/y7qCf+Cpo/6MA/8u6ly63B6qx0vh3/AII9Q6F4K8F2DeOtP/tTwv4mXxHeXll4Os9Mg1PYhRIRb2zxrGQDzIxkJ9McVc/aa/4JQXXxu+LPi7xJ4T+KWqfD+x+IVmtv4m0uPR49RTUJVRkEqSPIjQ5BAYKMnDAMAQBx3/G07/qwD/y7qP8Ajad/1YB/5d1Cik7h0sfQ3jr9i3/hMf2DZvgj/wAJL9n87RY9H/tr+zt+Njq3meR5o67cbfM79a8/8cf8EqdF8T/tE/CX4jWfiT+ytY+G8OnQ6iiaYZF8R/YkVImY+cPJbau0HD4BxzivOf8Ajad/1YB/5d1Js/4Kmf8AVgP/AJd1UtNhcqe5uah/wRse88W3Vivxa1uH4U32tnXLjweujweY8hl85oxfb96xmQZKiPHXjPNfVXwp8AeKPBOs+JpNd8YL4k0vUdQ87QdPTRoNPXw7ZgYW0DxnM4HHzuAeOlfHX/G07/qwD/y7qP8Ajad/1YB/5d1K1thn2V8NPBnizw34i8VXHiLxp/wlGn6tqRudFs/7Ihsf7AtccWvmRkm4wf8Alo+Grta+AP8Ajad/1YB/5d1H/G07/qwD/wAu6mB9/wBFfAH/ABtO/wCrAP8Ay7qP+Np3/VgH/l3UAff9FfAH/G07/qwD/wAu6j/jad/1YB/5d1AH3/RXwB/xtO/6sA/8u6j/AI2nf9WAf+XdQB9/0V8Af8bTv+rAP/Luo/42nf8AVgH/AJd1AH3/AEV8Af8AG07/AKsA/wDLuqKe3/4KlXUDQ+d+wXa+YpTzoV8VtJDnjcoYFSR1AIxxzQBL/wAE8P8AlOt/wUU/7pr/AOo/cV9/18n/APBMf/gn34g/Y8uPib42+I3jS18ffGT42avBrPi7VrCy+xabH9njaK1tbWL7wiiR3AZsFt3QYr6wpboAooopgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/Z'
      doc.addImage(imgData, 'JPEG', 0, 0, 320, 220);
      doc.setFontSize(8);
      doc.text(35, 90, data.RegNo.toString());
      doc.text(35, 93, data.Animal.toString());
      doc.text(35, 96, data.Herd.toString());
      doc.text(92, 49, data.Sire.toString());
      doc.text(92, 52, data.Sirename.toString());
      doc.text(92, 55, data.SireHerd.toString());
      doc.text(92, 138, data.GrandSire.toString());
      doc.text(92, 141, data.GrandSirename.toString());
      doc.text(92, 144, data.GrandSireHerd.toString());
      doc.text(148, 28, data.GreatGrandSires.toString());
      doc.text(148, 31, data.GreatGrandSirenames.toString());
      doc.text(148, 34, data.GreatGrandSireHerds.toString());
      doc.text(148, 72.5, data.GreatGrandDams.toString());
      doc.text(148, 75.5, data.GreatGrandDamnames.toString());
      doc.text(148, 78.5, data.GreatGrandDamHerds.toString());
      doc.text(148, 117, data.GrandDam.toString());
      doc.text(148, 120, data.GrandDamname.toString());
      doc.text(148, 123, data.GrandDamHerd.toString());
      doc.text(148, 161.5, data.GreatGrandSired.toString());
      doc.text(148, 164.5, data.GreatGrandSirenamed.toString());
      doc.text(148, 167.5, data.GreatGrandSireHerdd.toString());
      doc.text(205, 18, data.GreatGrandDamd.toString());
      doc.text(205, 21, data.GreatGrandDamnamed.toString());
      doc.text(205, 24, data.GreatGrandDamHerdd.toString());
      doc.text(205, 40, data.Dam.toString());
      doc.text(205, 43, data.Damname.toString());
      doc.text(205, 46, data.DamHerd.toString());
      doc.text(205, 62.5, data.GrandSire2.toString());
      doc.text(205, 65.5, data.GrandSirename2.toString());
      doc.text(205, 68.5, data.GrandSireHerd2.toString());
      doc.text(205, 84.5, data.GreatGrandSires2.toString());
      doc.text(205, 87.5, data.GreatGrandSirenames2.toString());
      doc.text(205, 90.5, data.GreatGrandSireHerds2.toString());
      doc.text(205, 107, data.GreatGrandDams2.toString());
      doc.text(205, 110, data.GreatGrandDamnames2.toString());
      doc.text(205, 113, data.GreatGrandDamHerds2.toString());
      doc.text(205, 129, data.GrandDam2.toString());
      doc.text(205, 132, data.GrandDamname2.toString());
      doc.text(205, 138, data.GrandDamHerd2.toString());
      doc.text(205, 151, data.GreatGrandSired2.toString());
      doc.text(205, 154, data.GreatGrandSirenamed2.toString());
      doc.text(205, 160, data.GreatGrandSireHerdd2.toString());
      doc.text(205, 173, data.GreatGrandDamd2.toString());
      doc.text(205, 176, data.GreatGrandDamnamed2.toString());
      doc.text(205, 182, data.GreatGrandDamHerdd2.toString());
      doc.text(7, 175, data1.PreviousOwner.toString());
      doc.text(67, 175, data1.Solddate.toString());
      doc.save('pedigree.pdf')
    },function error(response){
      // alert('Email Not Sent')
    })
  }
  $scope.SirePedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/sirepedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.GrandSire1Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/grandsire1pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.GreateGrandSire1Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/greatgrandsire1pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
    $scope.GreatGrandDam1Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/greatgranddam1pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.GrandDam1Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/granddam1pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.GreateGrandSire2Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/greatgrandsire2pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.GreatGrandDam2Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/greatgranddam2pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.DamPedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/dampedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.GrandSire2Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/grandsire2pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.GreateGrandSire3Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/greatgrandsire3pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.GreatGrandDam3Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/greatgranddam3pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
    $scope.GrandDam2Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/granddam2pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.GreateGrandSire4Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/greatgrandsire4pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.GreatGrandDam4Pedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/greatgranddam4pedigree',
      data : pedigree
    }).then(function success(response){
      $scope.memberprofile = {};
      $scope.lifetime = {};
      $scope.memberdata = {};
      $scope.pedigree = {};
      $scope.previousowner = {};
      $scope.offspring = {};
      $scope.memberprofile = response.data.member[0];
      $scope.lifetime = response.data.lifetime[0];
      $scope.memberdata = response.data.memberdata[0];
      $scope.pedigree10 = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
    },function error(response){
    })
  }
  $scope.UserData = function(){
    $http({
      method : 'GET',
      url : '/userdata'
    }).then(function success(response){
      $scope.memtype = response.data.memtype
      $scope.memname = response.data.memname;
      $scope.memnumber = response.data.memnumber;
      $scope.memcoun = response.data.memcoun;
      $scope.image = response.data.image;
      $scope.picstatus = response.data.picstatus[0];
    },function error(response){
    })
  }
  $scope.SoldAnimal = function(memberprofile){
    $http({
      method : 'POST',
      url : '/soldanimal',
      data : memberprofile
    }).then(function success(response){
      alert('Animal Sold');
    },function error(response){
        // alert('Error occured. Please try again later!');
      })
  } 
  $scope.showtext = false;
  $scope.ShowText = function(){
    $scope.showtext = false;
  }
  $scope.EditText = function(){
    $scope.showtext = true;
  }
  $scope.DeceasedAnimal = function(memberprofile){
    $http({
      method : 'POST',
      url : '/deceasedanimals',
      data : memberprofile
    }).then(function success(response){
     alert('Updated Successfully')
   },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.transfer = false;
  $scope.TransferAnimal = function(memberprofile){
    $scope.searchowner = {};
    $scope.transfer = true;
    $scope.showani = false;
    $scope.showani1 = true;
    $scope.tabled = true;
  }
  $scope.TransferOwnerName = function(sto,id){
    $http({
      method : 'POST',
      url : '/transferownernamemember',
      data : {data : sto, id : id}
    }).then(function success(response){
      alert('Transfer request sent successfully');
    },function error(response){
        // alert('Error occured. Please try again later!');
      })
  } 
  $scope.ExitTransferAnimal = function(searchowner){
    $scope.transfer = false;
    $scope.showani = true;
    $scope.showani1 = true;
    $scope.tabled = false;
  }
  $scope.ShowAniCurr = function(){
    $scope.showani1 = true;
    $scope.showani = true;
  }
  $scope.ShowAniPre = function(){
    $scope.showani1 = true;
    $scope.showani = true;
  }
  $scope.ShowAniDec = function(){
    $scope.showani1 = true;
    $scope.showani = true;
  }
  $scope.ShowAniAl = function(){
    $scope.showani1 = true;
    $scope.showani = true;
  }
  $scope.ExittoInv = function(){
    $scope.showani1 = false;
    $scope.showani = false;
  }
  $scope.SearchTransferOwner = function(searchowner,memberprofile){
    $http({
      method : 'post',
      url : '/searchtransferownermember',
      data : {searchowner : searchowner, memberprofile : memberprofile}
    }).then(function success(response){
      $scope.stos = response.data.members;
      $scope.id = response.data.id;
      // console.log($scope.id)
      $scope.searchowner = {};
    },function error(response){
    })
  }
  $scope.SaveNotesInv = function(notes,memberprofile){
    $http({
      method : 'post',
      url : '/savenotesinventory',
      data : {notes : notes, No : memberprofile}
    }).then(function success(response){
      $scope.notes={};
      alert('Updated Successfully')
    },function error(response){
    })
  }
});
//--------------------------------------------------------Inventory Data--------------------------------------------------------
//--------------------------------------------------------Current Data----------------------------------------------------------
app.service('fileUpload5', ['$http', function ($http) {
  this.uploadFileToUrl = function(file, uploadUrl){
      // console.log(file)
      // console.log(uploadUrl)
      var fd = new FormData();
      for(var key in file){
        // console.log(file[key])
        fd.append(key, file[key])
      }
      // console.log(fd)
      data=$http.post(uploadUrl, fd, {
       transformRequest: angular.identity,
       headers: {'Content-Type': undefined}
     })
      .then(function(success){
        // console.log(success.data)
      })
        // console.log('error')
    }
  }]);
//-----------------------------------------------------------------------------Inventory--------------------------------
app.controller('InventoryController', function($scope,$http,fileUpload5){
  $scope.uploadFile = function() {
    var file = $scope.eanimal;
    var uploadUrl = "/fileUpload";
    fileUpload5.uploadFileToUrl(file, uploadUrl);
  }
});
//----------------------------------------------------------------------------------Current--------------------------------
app.controller('currentController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
  $scope.getCurrent = function(){
    $http({
      method : 'GET',
      url : '/currentdata'
    }).then(function success(response){
      $scope.current = response.data
      // console.log($scope.current)
    },function error(response){
    })
  }
});
//-----------------------------------------------------------Previous Controller-------------------------------------------
app.controller('previousController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
  $scope.getPrevious = function(){
    $http({
      method : 'GET',
      url : '/previousdata'
    }).then(function success(response){
      $scope.previous = response.data
      // console.log($scope.previous)
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------------------Deceased Controller-------------------------------------------
app.controller('deceasedController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
  $scope.getDeceased = function(){
    $http({
      method : 'GET',
      url : 'deceaseddata'
    }).then(function success(response){
      $scope.deceased = response.data
      // console.log($scope.deceased)
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------------------All Controller-------------------------------------------
app.controller('allController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
  $scope.getAll = function(){
    $http({
      method : 'GET',
      url : 'alldata'
    }).then(function success(response){
      $scope.all = response.data
      // console.log($scope.all)
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
});
//----------------------------------------------------------------------------------CurrentABHR--------------------------------
app.controller('currentABHRController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
  $scope.getABHRCurrent = function(){
    $http({
      method : 'GET',
      url : '/currentabhrdata'
    }).then(function success(response){
      $scope.currentabhr = response.data
      // console.log($scope.current)
    },function error(response){
    })
  }
});
//-----------------------------------------------------------Previous ABHR Controller-------------------------------------------
app.controller('previousABHRController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
  $scope.getABHRPrevious = function(){
    $http({
      method : 'GET',
      url : '/previousabhrdata'
    }).then(function success(response){
      $scope.previousabhr = response.data
      // console.log($scope.previous)
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------------------Deceased ABHR Controller-------------------------------------------
app.controller('deceasedABHRController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
  $scope.getABHRDeceased = function(){
    $http({
      method : 'GET',
      url : 'deceasedabhrdata'
    }).then(function success(response){
      $scope.deceasedabhr = response.data
      // console.log($scope.deceased)
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------------------All ABHR Controller-------------------------------------------
app.controller('allABHRController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
  $scope.getABHRAll = function(){
    $http({
      method : 'GET',
      url : 'allabhrdata'
    }).then(function success(response){
      $scope.allabhr = response.data
      // console.log($scope.all)
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
});
//-------------------------------------------------------------------Profile Data------------------------------------------
app.controller('ProfileController', function($scope,$http){
  $scope.getprofile = function(){
    $http({
      method : 'GET',
      url : '/ProfileData'
    }).then(function success(response){
      $scope.profile = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-------------------------------------------------------------------Change Password------------------------------------------
app.controller('ChangePasswordController', function($scope,$http){
  $scope.ChangePassword = function(change){
      $http({
        method : 'POST',
        url : '/changeuserpassword',
        data : change
      }).then(function success(response){
        var msg = response.data[0].message;
        alert(msg);
        $scope.change = {};
      },function error(response){
      })
  }
});
//-------------------------------------------------------------------Search Animal------------------------------------------
app.controller('searchAnimalController', function($scope,$http, DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$timeout){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
  $scope.updatemember = function(){
    $http({
      method : 'GET',
      url : '/memberdata'
    }).then(function success(response){
      $scope.members = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.secondTab = function(){
    $("#currentsire").removeClass("active");//removes last manu item class
    $('#previoussire').addClass('active');
  }
  $scope.updateranch = function(){
    $http({
      method : 'GET',
      url : '/ranchdata'
    }).then(function success(response){
      $scope.ranches = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchAnimal = function(searchanimal){
    // console.log(searchanimal)
    $http({
      method : 'POST',
      url : '/searchAnimalDataMember',
      data : searchanimal
    }).then(function success(response){
      $scope.searchanimalmember = response.data
      // console.log($scope.searchanimalmember)
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchBreeder = function(val){
    if(val==''){
      $scope.isSelected = false;
    }
    else{
      $scope.isSelected = true;
    // console.log(val)
    $http({
      method : 'POST',
      url : '/searchbreeder',
      data : {text : val}
    }).then(function success(response){
      // console.log(response.data)
      $scope.items = response.data
      $scope.selectItem = function(selected) {
      // console.log(selected)
      $scope.searchanimal.MemberNumber = selected;
      $timeout(function() {
        $scope.isSelected = false;
      });

    }
    $scope.queryUpdated = function() {
      $scope.isSelected = false;
    }
  },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
}
  $scope.ResetSearchAnimal = function(searchanimal){
    $scope.searchanimal = {};
  }
});
//-------------------------------------------------------------------Update Profile------------------------------------------
app.controller('updateProfileController', function($scope,$http){
  $scope.UpdateProfile = function(profile){
    // console.log($scope.profile)
    $http({
      method : 'POST',
      url : '/updateProfileData',
      data : profile
    }).then(function success(response){
      alert('Updated Successfully');
      $scope.response = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateSendMail = function(profile){
    // console.log($scope.profile)
    $http({
      method : 'POST',
      url : '/updatesendmail',
      data : profile
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.PrintMemberCard = function(){
    $http({
      method : 'GET',
      url : '/printmembercard',
    }).then(function success(response){
      // console.log(response.data[0])
      $scope.membercard = JSON.parse(JSON.stringify(response.data[0]));
      var a = $scope.membercard.Membername;
      var b = $scope.membercard.MemberNumber.toString();
      // console.log(b)
      var c = $scope.membercard.Type;
      var d = $scope.membercard.Ms.toString();
      // console.log(d)
      var e = $scope.membercard.Eo.toString();
      // console.log(e)
      var doc = new jsPDF('l', 'mm', [297, 210]);
      var imgData = 'data:image/jpeg;base64,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bYL6OTmLZSp2vRSkg0PHtSrsCSEi2O8J28hgbFVMTpnKVM2Bc7wJkGTFatl3St9CUIU5CUhKVJcSrOUrUSSkEbhkEjO41v8AS+l02W/W66SdTaRWzEdWtaWb22t0ktLbRsJUyhClZdUBlQ3bQyAo1ADsS/AxxUcNPCxL6+4ttvaRsm3pPbtkui06x2U2mF5GCmabQIdt6MSMczdMnMjGv63IRLEzVJmQ9dYQizhsnIKOyl11jnv2pEhqRbLmpLyg4nYhqyFpBTv2inIxjcD2TnOa9Jyg2mDqiRbZMDUenGHIrTrDzc68x2kKaXslKkhtL5IbVtEYI2c/BJJNTW4guCKg8UOktkcPe5LXqie1ntOCLBWZow2CnHTTQG7tCQjJquS69Zkiw1ihn7ZF3FygMXQtzgqmdusguskfPulxi3OKqO5a76lWQptxMDBQcjIwVqyFYG12cDccbvPaZs9y0xcROi6n0U8haA1JjOXxOxIaBJSlSwxtJKCSUY4E9bArG8NHAzE8K+idc8PtP4gWGyavrOJXhIC0bf2hHz119CDvXDxlCryEXVo1saKhCOTs4hsRAiTNoBWzVBozTbs0LFmuAtcdTDkK9v5WVJItyglKSScAFzIO/fvO+svWVoOqbkzPZvWjIAbjBlxJ1Clxx93aCi6s9D7IAxspAPwcE7817l3mX3si6h89z9T5uOmJruXe/N59bXkukN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75UaN8+p9np3mX3si6h89z9T46Ymu5d783n1tOkN75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2StRPjJrm7ocfN1vdT/xZGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemndDj5ut7qf+LGyntEeQn0U39srylemrDqKKcumc5+Qcg6ZhNyAR5/LEfl/oD1snhnG4HG4EhIx2Eg7KcnedkDKsqO8kl4ST4ST9uasxSmKUxSmKUxSmKUxSmKUxSmKUxSmKUxSmKUxSmKUxSmKUxSmKUxSmKUxSmKUxSmKUxSmKUxSmOuCMAjgQACM7jvAzw3ceG6n+Ph3jxHdTJyc5yc+Ejx9n56buOBu/+I6/zVXn9b2g/wAMg4PEAnskAqHgURtDHWwRg8MVOT3vEPRTmIeIRD7+OsAd+BgbXviB3irJFRx4hJ/RT6Kcx9cfbHGAOsn50g/aKbu1T5KfRVMABOdkAZ443Z8OKnPeHkp9FMjACtoDCjuKhuURkHBIwSMgEg8SATvpnweSPRTJIzx3784O8ZznJB3E565GajdnOBk9gAfZTJ2lHdk47AOB84GAfnpTIpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFKYpTFK//2Q=='
      doc.addImage(imgData, 'JPEG', 0, 0, 105, 75);
      doc.setFontSize(8);
      doc.text(48, 34, a);
      doc.text(48, 39, b);
      doc.text(48, 43, c);
      doc.text(48, 48, '03/23/2021');
      doc.save('Member Card.pdf')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.addPartners = function(addpartner){
    // console.log($scope.addpartner)
    $http({
      method : 'POST',
      url : '/addpartnerdata',
      data : addpartner
    }).then(function success(response){
      alert('Added Successfully');
      $scope.addpartner = {};
      $scope.plength = response.data.length;
      $scope.partners = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.PartnerList = function(){
    $http({
      method : 'GET',
      url : '/partnerslistdata',
    }).then(function success(response){
      $scope.partners = response.data; 
      $scope.plength = response.data.length;
      // console.log($scope.plength) 
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
app.service('fileUpload3', ['$http','$window' , function ($http,$window) {
  var that = this;
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
        // console.log(success.data)
        if(success){
          console.log(success,'success')

          // alert('To Complete full registration, you may add Animal Sire and Dam Details by Editing in Holding Pen ')
          // window.location.href = '/home';
          if(success){
          $window.localStorage.setItem('regNoID', success.data[0].RegNoID );
          }
        }
        else{
          alert("Error");
        }
        return success.data
      })
      return data
    }
  }]);

//-------------------------------------------------------------------register Animal------------------------------------------
app.controller('registerAnimalController', function($scope, $http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,fileUpload3,$window,$timeout) {
  $scope.searchSire1 ='e'
  $scope.activeDam1 = 4;
  $scope.first = true;
  $scope.second = false;
  $scope.third = false;
  $scope.activeTab = 'a';
  $scope.showtable3 = true;
  $scope.disabledBtn = false;
  $scope.alertEnabled = true;
  $scope.addRegNoSire = function(reganimal){
    console.log('second',reganimal)

    $http({
      method : 'POST',
      url : '/addregnosirereg',
      data : reganimal
    }).then(function success(response){
      if(response.data[0].msg){
        alert(response.data[0].msg)
      } else {
        $scope.ssrs = response.data;
        console.log($scope.ssrs,'ssrssss')
        $scope.reganimal.txtreg = "";
      }
     
      // $scope.first = false;
      // $scope.second = false;
      // $scope.third = true;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.regno = true;
  $scope.sire = true;
  $scope.someone = true;
  $scope.showpen = false;
  $scope.stage = "";
  $scope.shipAmount = 0;
  $scope.envelope = 0;
  $scope.activeDam = 1;
  $scope.showpenClick = function(){
    $scope.showcheckout = true;
    $scope.showpen = true;
  }
  $scope.RemoveSSR = function(ssr,reganimal){
    $http({
      method : 'POST',
      url : '/removesirefromlist/'+$scope.reganimal.RegNoID,
      data : ssr
    }).then(function success(response){ 
      alert('Removed Successfully')
      var index = $scope.ssrs.indexOf(ssr);
      $scope.ssrs.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.removeImage = function(){
    $scope.posterTitle = '';
    $scope.reganimal.image = {};
    angular.element("input[type='file']").val(null);
  }
  $scope.enableFirst = function(){
    $scope.second = false;
    $scope.first = true;
    $scope.third = false;
  }
  $scope.enableThird = function(){
    $scope.first = false;
    $scope.second = false;
    $scope.third = true;
  }
  $scope.enableSecond = function(){
    $scope.second = true;
    $scope.third=false;
    $scope.first = false;
  }
  $scope.currentSireClick = function () {
    console.log('sireee')
    $http({
      method : 'POST',
      url : '/currentdatasire',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.css = response.data;
      console.log(response.data,'datata')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.previousSireClick = function () {
    $http({
      method : 'POST',
      url : '/previousdatasire',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.pss = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.deceasedSireClick = function () {
    $http({
      method : 'POST',
      url : '/deceaseddatasire',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.dss = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.currentbreedingSireClick = function () {
    $http({
      method : 'POST',
      url : '/currentbreedingdatasire',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.cbs = response.data;
      
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddCurrentSireToList = function(cs,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/addcurrentsiretolist/'+$scope.reganimal.RegNoID,
      data : cs
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddPreviousSireToList = function(ps,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/addprevioussiretolist/'+$scope.reganimal.RegNoID,
      data : ps
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddDeceasedSireToList = function(ds,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/adddeceasedsiretolist/'+$scope.reganimal.RegNoID,
      data : ds
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddCurrentSireToBreeding = function(cs,reganimal){
    $http({
      method : 'POST',
      url : '/addcurrentsiretobreeding/'+$scope.reganimal.RegNoID,
      data : cs
    }).then(function success(response){ 
      $scope.cb = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.RemoveSireFromBreedingList = function(cb,reganimal){
    $http({
      method : 'POST',
      url : '/removesirefrombreedinglist/'+$scope.reganimal.RegNoID,
      data : cb
    }).then(function success(response){ 
      alert('Removed Successfully');
      var index = $scope.cbs.indexOf(cb);
      $scope.cbs.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.addmemberSiere = function(reganimal){
    $scope.showtable2 = true;
    $http({
      method : 'POST',
      url : '/addmembersiere',
      data : reganimal
    }).then(function success(response){ 
      $scope.someone = {};
      $scope.someonelist = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddSomeoneSiere = function(someone){
    $scope.showtable3 = true;
    $http({
      method : 'POST',
      url : '/addsomeonesiere',
      data : someone
    }).then(function success(response){ 
      $scope.currentsomeone = response.data.current;
      $scope.previoussomeone = response.data.previous;
      $scope.deceasedsomeone = response.data.deceased;
      $scope.breedingsomeone = response.data.breeding;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddCurrentSireToList = function(scurrent,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneaddcurrentsiretolist/'+$scope.reganimal.RegNoID,
      data : scurrent
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddPreviousSireToList = function(sprevious,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneaddprevioussiretolist/'+$scope.reganimal.RegNoID,
      data : sprevious
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddDeceasedSireToList = function(sdeceased,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneadddeceasedsiretolist/'+$scope.reganimal.RegNoID,
      data : sdeceased
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddCurrentSireToBreeding = function(scurrent,reganimal){
    $http({
      method : 'POST',
      url : '/someoneaddcurrentsiretobreeding/'+$scope.reganimal.RegNoID,
      data : scurrent
    }).then(function success(response){ 
      $scope.breedingsomeone = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneRemoveSireFromBreedingList = function(sbreeding,reganimal){
    $http({
      method : 'POST',
      url : '/someoneremovesirefrombreedinglist/'+$scope.reganimal.RegNoID,
      data : sbreeding
    }).then(function success(response){ 
      alert('Removed Successfully');
      var index = $scope.breedingsomeone.indexOf(sbreeding);
      $scope.breedingsomeone.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.currentDamClick = function () {
    $http({
      method : 'POST',
      url : '/currentdatadam',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.cds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.previousDamClick = function () {
    $http({
      method : 'POST',
      url : '/previousdatadam',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.pds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.deceasedDamClick = function () {
    $http({
      method : 'POST',
      url : '/deceaseddatadam',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.dds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.addRegNoDam = function(reganimal){
    $scope.alertEnabled = true;
    $http({
      method : 'POST',
      url : '/addregnodam',
      data : reganimal
    }).then(function success(response){
      if(response.data[0].msg){
        $scope.alertEnabled = false;
        alert(response.data[0].msg)
      } else {
        $scope.ssrs = response.data;
        console.log($scope.ssrs,'ssrssss')
        $scope.reganimal.txtreg = "";
      }
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AlertBox1 = function(){
    $scope.cou = true;
  }
  $scope.AlertBox = function(reganimal){
    $http({
      method : 'POST',
      url : '/alertboxfordam',
      data : reganimal
    }).then(function success(response){
      $scope.counter = response.data.count[0].Cnt;
      // console.log($scope.counter)
      $scope.ranch1 = response.data.ranch[0].RanchName;
      // $window.location.href = '#!holdingpen'
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.redirect = function(){
    $window.location.href = '#!holdingpen'
  } 
  $scope.ShowListInNextPage = function(anidetails){
    $http({
      method : 'POST',
      url : '/showlistinnextpage',
      data : anidetails
    }).then(function success(response){
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddCurrentDamToList = function(cd,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/addcurrentdamtolist/'+$scope.reganimal.RegNoID,
      data : cd
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddPreviousDamToList = function(pd,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/addpreviousdamtolist/'+$scope.reganimal.RegNoID,
      data : pd
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddDeceasedDamToList = function(dd,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/adddeceaseddamtolist/'+$scope.reganimal.RegNoID,
      data : dd
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.addmemberDam = function(reganimal){
    $scope.showtable5 = true;
    $http({
      method : 'POST',
      url : '/addmemberdam',
      data : reganimal
    }).then(function success(response){ 
      $scope.dsomeone = {};
      $scope.dsomeonelist = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddSomeoneDam = function(someone){
    $scope.showtable4 = true;
    $http({
      method : 'POST',
      url : '/addsomeonedam',
      data : someone
    }).then(function success(response){ 
      $scope.dcurrentsomeone = response.data.dcurrent;
      $scope.dprevioussomeone = response.data.dprevious;
      $scope.ddeceasedsomeone = response.data.ddeceased;
      $scope.dbreedingsomeone = response.data.dbreeding;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddCurrentDamToList = function(dcurrent,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneaddcurrentdamtolist/'+$scope.reganimal.RegNoID,
      data : dcurrent
    }).then(function success(response){ 
      //console.log(response.data)
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddPreviousDamToList = function(dprevious,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneaddpreviousdamtolist/'+$scope.reganimal.RegNoID,
      data : dprevious
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddDeceasedSireToList = function(ddeceased,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneadddeceaseddamtolist/'+$scope.reganimal.RegNoID,
      data : ddeceased
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.BillDetails = function(){
    $http({
      method : 'GET',
      url : '/getbilldetails'
    }).then(function success(response){
      $scope.bills=response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowTableDataPen = function(){
    $http({
      method : 'GET',
      url : '/gettabledatainpen'
    }).then(function success(response){
      console.log(response,"responseresponseresponseresponseresponse")
      $scope.bull=response.data.bull;
      $scope.eid=response.data.eid[0];
      $scope.ss=response.data.ss[0];
      var reg = 0;
      // console.log($scope.bull.length)
      for(i=0;i<$scope.bull.length;i++){
        // console.log($scope.bull[i].totalregprice)
        reg += $scope.bull[i].totalregprice;
      }
      // console.log(reg)
      sum =  reg + $scope.eid.TotEidPrice + $scope.ss.TotSSPrice + $scope.eid.DestronPrice;
      $scope.subTotalHp = sum
      $scope.handling = sum * 0.02;
      if($scope.eid.EidCount > 0){
      $scope.amount = sum + $scope.handling + $scope.shipAmount + $scope.envelope;
      } else {
      $scope.amount = sum + $scope.handling;
      }
      if($scope.PaymentType && $scope.PaymentType.Payment == 'eCheck') {
        if($scope.eid.EidCount > 0){
        $scope.amount =  sum + $scope.shipAmount + $scope.envelope;
        } else {
        $scope.amount =  sum;
        }
      }
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SameAddress = function(bills){
    if($scope.sameasabove){
      $scope.bills.FirstName1 = angular.copy($scope.bills.FirstName);
      $scope.bills.LastName1 = angular.copy($scope.bills.LastName);
      $scope.bills.Email1 = angular.copy($scope.bills.Email);
      $scope.bills.Phone1 = angular.copy($scope.bills.Phone);
      $scope.bills.Address1 = angular.copy($scope.bills.Address);
      $scope.bills.City1 = angular.copy($scope.bills.City);
      $scope.bills.State1 = angular.copy($scope.bills.State);
      $scope.bills.Zip1 = angular.copy($scope.bills.Zip);
      $scope.bills.Country1 = angular.copy($scope.bills.Country);
    } else {
      $scope.bills.FirstName1 = "";
      $scope.bills.LastName1 = "";
      $scope.bills.Address1 = "";
      $scope.bills.City1 = "";
      $scope.bills.State1 = "";
      $scope.bills.Zip1 = "";
      $scope.bills.Country1 = "";
    }
  }
  $scope.saveBillingInfo = function(bills){
    $scope.shownext=false;
    $scope.showcheckout=true;
    $scope.showcheckout1=false;
    $scope.showpay=false;
    $scope.showfulldata=true
    $http({
      method : 'POST',
      url : '/savebillinginfo',
      data : bills
    }).then(function success(response){
      $scope.eid.fed = response.data.data[0].Fed;
      $scope.tempid = response.data[0].tempId; 
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AnimalPayment = function(pay,amount,handling,tempid,bull,bills,shipValue){
    let shipObject = {
      shipCost: shipValue,
      shipType :$scope.selectedType
    }
    $http({
      method : 'POST',
      url : '/animalpayment',
      data : {pay : pay, amount:amount, handling : handling,tempid : tempid, bull : bull, bills : bills,shipObject}
    }).then(function success(response){ 
      var msg = response.data.msg;
      alert(msg)
      if($scope.eid.EidCount > 0){
      $scope.shippingSection = true;
      $scope.createSorder(bills);
      }
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.createSorder = function(){
    let tempArray = [];
    tempArray = [{
currency: "USD",
product: "437f40b02951453e98969f2464165c3b",
quantity: $scope.eid.EidCount,
sku: "HM-123",
title: 'EID Tags',
total_amount: 15 * $scope.eid.EidCount,
total_weight: 0.025 * $scope.eid.EidCount,
"weight_unit": "lb"
    }]
   let temp =  $scope.fedexRates.filter(obj=>{ return  obj.amount == $scope.shipAmount })
    let shippingObj = {
      shipping_cost: $scope.shipAmount,
      subtotal_price : $scope.subTotalHp,
      total_price : $scope.amount,
      shipping_method:temp[0].servicelevel.name,
    }
    $http({
      method : 'POST',
      url : '/createShippingOrder',
      data: {bills:$scope.bills,product : tempArray,shippingObj : shippingObj}
    }).then(function success(response){ 
      $scope.generateLabel($scope.bills,$scope.amount);
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.generateLabel = function(bills,amountTotal){
    let tempS =  $scope.fedexRates.filter(obj=>{ return  obj.amount == $scope.shipAmount })
    let shippingDet = {
      carrier_account : tempS[0].carrier_account,
      servicelevel_token : tempS[0].servicelevel.token,
      selectedObjectRateId : $scope.selectedRate,
      totalAmount :amountTotal
    }
    $http({
      method : 'POST',
      url : '/trackingOrder',
      data : {bills : bills,parcels : $scope.parcels,shippingDet : shippingDet}
    }).then(function success(response){ 
      $scope.saveDataIntoDb(response.data);
      $scope.shippingTrack = response.data;
      $scope.shippingSection = true;
      $scope.showfulldata = false;
      $scope.showpay = false;
      $scope.shownext = false;
      $scope.showcheckout1 = false;
      $scope.showpen=false;
      // window.open('wotracking/' + response.data.tracking_number, '_blank');
      // window.location.href = 'wotracking/' + response.data.tracking_number;
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.saveDataIntoDb = function(data){
    $http({
      method : 'POST',
      url : '/saveTrackingData',
      data : {trackingData : data}
    }).then(function success(response){ 
      console.log(response.data,'last')

    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.getCarrierDetails = function(bills){
    $scope.eid.EidCount
    let parcelObj = [{
      weight:0.025 * $scope.eid.EidCount,
      length: 10 ,
      width:1.5 ,
      height:14.5,
      distance_unit: 'in',
      mass_unit: 'lb'
    }]
      console.log('inside tssssssss',{bills : bills,parcels: parcelObj})
      $http({
        method : 'POST',
        url : '/saveShippingData',
        data:{bills : bills,parcels: parcelObj}
      }).then(function success(response){
        let selected = ['Priority Overnight®','Express Saver®','First Overnight®','2Day®']
        let res = response.data.filter(obj=>selected.includes(obj.servicelevel.name))
        $scope.fedexRates = res;
        $scope.saveRates(res);
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
  
    $scope.saveRates = function(data){
      $http({
        method : 'POST',
        url : '/saveRatesIntoDb',
        data:data
      }).then(function success(response){
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
    $scope.getSvalues = function(value,bills){
      $scope.eid.EidCount
      let parcelObj = [{
        weight:0.025 * $scope.eid.EidCount,
        length: 10 ,
        width:1.5 ,
        height:14.5,
        distance_unit: 'in',
        mass_unit: 'lb'
      }]
        $http({
          method : 'POST',
          url : '/saveShippingData',
          data:{bills : bills,parcels: parcelObj}
        }).then(function success(response){
          if(value === 'fedex'){
            $scope.envelope = 0;          
          let selected = ['Priority Overnight®','Express Saver®','First Overnight®','2Day®']
          let res = response.data.filter(obj=>selected.includes(obj.servicelevel.name))
          $scope.fedexRates = res;
          $scope.saveRates(res);
          }
          if(value === 'usps') {
            $scope.envelope = 2;
            var reg = 0;
            for(i=0;i<$scope.bull.length;i++){
              reg += $scope.bull[i].totalregprice;
            }
            sum =  reg + $scope.eid.TotEidPrice + $scope.ss.TotSSPrice + $scope.eid.DestronPrice;
            $scope.subTotalHp = sum
            $scope.handling = sum * 0.02;
            $scope.amount = sum + $scope.handling + $scope.shipping + $scope.envelope;
            let selected = ['First-Class Package/Mail Parcel','Parcel Select','Priority Mail','Priority Mail Express']
            let res = response.data.filter(obj=>selected.includes(obj.servicelevel.name))
            $scope.fedexRates = res;
            $scope.saveRates(res);
          }
        },function error(response){
          alert('Error occured. Please try again later!');
        })
     
    }
    $scope.CalulateWithShipping = function(ship){
      let tempArr = $scope.fedexRates.filter(obj=>obj.amount == ship)
      $scope.selectedRate = tempArr[0].object_id
      $scope.selectedType = tempArr[0].servicelevel.name
      var reg = 0;
      for(i=0;i<$scope.bull.length;i++){
        reg += $scope.bull[i].totalregprice;
      }
      sum =  reg + $scope.eid.TotEidPrice + $scope.ss.TotSSPrice + $scope.eid.DestronPrice;
      $scope.subTotalHp = sum
      $scope.handling = sum * 0.02;
      $scope.amount = sum + $scope.handling + (Number(ship) ? Number(ship) : 0) + $scope.envelope;
      $scope.shippingValue = ship;
      $scope.shipAmount = Number(ship);
    }
    $scope.fileName= function(element) {
      $scope.$apply(function($scope) {
         $scope.posterTitle= element.files[0].name;
      });
   };

  $scope.tempAnimalRegister = function(){
    $scope.disabledBtn = true;
    var details = $scope.reganimal;
    var uploadUrl = "/tempanimaldata";
    fileUpload3.uploadFileToUrl(details, uploadUrl);
    $timeout(function(){
      var id = $window.localStorage.getItem('regNoID');
    $scope.reganimal.RegNoID = id
    console.log(id,'ppp')
      $scope.first = false;
      $scope.second = true;
      $scope.disabledBtn = false;
    },2000)
      $scope.first = false;
      $scope.second = true;
      $scope.disabledBtn = false; 
  }
  $scope.showtable = function(){
    $scope.tablehide = true;
  }
  $scope.ResetAddAnimal = function(reganimal){
    $scope.reganimal = {};
  }
  $scope.CheckAnimal = function(reganimal){
    var breed = reganimal.AnimalName
    // console.log(breed)
    var breed1 = breed.toUpperCase();
    // console.log(breed1)
    var a = breed1.includes('BREEDING');
    // console.log(a)
    if(a == true){
      $scope.message = "";
      alert('Invalid name. Animal name not contain the word "Breeding".')
    }
    else{
      $http({
        method : "POST",
        url : "/checkanimaldata",
        data : reganimal
      }).then(function success(response){
        $scope.animalname = response.data.a[0].CountID;
        $scope.animalname1 = response.data.b[0].CountID;
        // console.log($scope.animalname)
        // console.log($scope.animalname1)
        if ($scope.animalname > 0 || $scope.animalname1 > 0) {
          $scope.message = "Animal Name Already Exists";
        }
        else if($scope.animalname == 0 && $scope.animalname == 0){
          $scope.message = "Animal Name Available";
        }
      }, function error(response){
        alert('Error Occured, Please Try Again !')
      })
    }
  }
  $scope.CheckHerd = function(reganimal){
    $http({
      method : "POST",
      url : "/checkherddata",
      data : reganimal
    }).then(function success(response){
      $scope.herd = response.data.a[0].CountID;
      // console.log($scope.herd)
      $scope.herd1 = response.data.b[0].CountID;
      // console.log($scope.herd1)
      if ($scope.herd > 0 || $scope.herd1 > 0) {
        $scope.hmessage = "Brand No Already Exists";
      }
    }, function error(response){
      alert('Error Occured, Please Try Again !')
    })
  }
});
//-------------------------------------------------------------------Holding Pen------------------------------------------
app.service('fileUpload10', ['$http', function ($http) {
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
        // console.log(success.data)
        if(success){
          this.second();
          // alert('Updated Successfully')
        }
        else{
          alert("Error");
        }
        return success.data
      })
      return data
    }
    this.two = function(){
      return 'two'
    }
  }]);
app.controller('HoldingPenController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,fileUpload10,$filter,$window){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  $scope.regno = true;
  $scope.sire = true;
  $scope.someone = true;
  $scope.showpen = false;
  $scope.stage = "";
  $scope.shipAmount = 0;
  $scope.envelope = 0;
  $scope.fedex = 0;
  $scope.one=true;
  $scope.onee = true;
  $scope.editsire = 'a';
  $scope.editSearchSire = 'e';
  $scope.editDam = 1;
  $scope.editDam2 = 4;
  $scope.alertEnabled = true;
  $scope.showpenClick = function(){
    $scope.showcheckout = true;
    $scope.showpen = true;
    $scope.one = true;
  }
  $scope.redirectTo = function(){
  $window.location.href = '#!registeranimal'

  }
  $scope.checkCondition = function(){
    var temp = $scope.andetails.filter(obj=>obj.eartag == 1)
    if(temp.length > 0){
    $scope.shownext=true;
    $scope.showcheckout=true;
    $scope.showcheckout1=false;
    $scope.showfulldata=false;
    } else {
      $scope.shownext=false;
      $scope.showcheckout=true;
      $scope.showcheckout1=false;
      $scope.showpay=true;
      $scope.showfulldata=false
    }
  }
  $scope.checksecCon = function(){
    var temp = $scope.andetails.filter(obj=>obj.eartag == 1)
    if(temp.length > 0){
      $scope.showpay=false;
      $scope.showcheckout=true;
      $scope.showcheckout1=false;
      $scope.shownext=true;
      $scope.sameasabove=false;
    } else {
      $scope.showpay=false;
      $scope.shownext=false;
      $scope.showcheckout=true;
      $scope.showcheckout1=true
    }
  }
  $scope.CheckAnimal = function(reganimal){
    var a = reganimal.ANIMAL.includes('breeding');
    if(a == true){
      $scope.message = "";
      alert('Invalid name. Animal name not contain the word "Breeding".')
    }
    else{
      $http({
        method : "POST",
        url : "/checkanimaldata",
        data : reganimal
      }).then(function success(response){
        $scope.animalname = response.data.a[0].CountID;
        $scope.animalname1 = response.data.b[0].CountID;
        if ($scope.animalname > 0 || $scope.animalname1 > 0) {
          $scope.message = "Animal Name Already Exists";
        }
        else if($scope.animalname == 0 && $scope.animalname == 0){
          $scope.message = "Animal Name Available";
        }
      }, function error(response){
        alert('Error Occured, Please Try Again !')
      })
    }
  }
  $scope.CheckHerd = function(reganimal){
    $http({
      method : "POST",
      url : "/checkherddata",
      data : reganimal
    }).then(function success(response){
      $scope.herd = response.data.a[0].CountID;
      $scope.herd1 = response.data.b[0].CountID;
      if ($scope.herd > 0 || $scope.herd1 > 0) {
        $scope.hmessage = "Brand No Already Exists";
      }
    }, function error(response){
      alert('Error Occured, Please Try Again !')
    })
  }
  $scope.UpdateAnimalDetails = function(reganimal){
    // $http({
    //   method : 'POST',
    //   url : '/updateanimaldetails',
    //   data : reganimal
    // }).then(function success(response){
    //   alert('Updated Successfully');
    // },function error(response){
    //     // alert('Error occured. Please try again later!');
    //   })
      var details = reganimal
      console.log($scope.reganimal,'pppii')
      var uploadUrl = "/updateanimaldetails";
      fileUpload10.uploadFileToUrl(details, uploadUrl)
      if(fileUpload10.two() == 'two'){
        $scope.onee = false;
        $scope.two = true;
      }
  }
  $scope.enableThree = function(){
    $scope.onee = false;
    $scope.two = false;
    $scope.three = true;
  }
  $scope.lastsec = function(){
    $scope.three = false;
    $scope.showpen = false;
    $scope.showcheckout = false;
    $scope.onee = true;
  }
  $scope.currentSireClick = function () {
    console.log('opopop',$scope.reganimal)
    $http({
      method : 'POST',
      url : '/currentdatasire',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.css = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.CardDetails = function(pay) {
    $http({
      method : 'POST',
      url : '/carddetails',
      data : pay
    }).then(function success(response){
      console.log(pay.Payment,"yyyy")
      pay.Payment.cc = parseInt(response.data[0]?.cc)
      pay.Payment.expire = response.data[0]?.expire;
      pay.Payment.cvv = response.data[0]?.cvv;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteCard = function(){
    pay.Payment.cvv = "";
    pay.Payment.cc = "";
    pay.Payment.expire = "";
  }
  $scope.ShowNextPanel = function () {
    $http({
      method : 'GET',
      url : '/shownextpanel',
    }).then(function success(response){
      // console.log(response.data.hold_check[0])
      $scope.andetails = response.data.anidetails;
      $scope.hold_check = response.data.hold_check[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.previousSireClick = function () {
    $http({
      method : 'POST',
      url : '/previousdatasire',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.pss = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.deceasedSireClick = function () {
    $http({
      method : 'POST',
      url : '/deceaseddatasire',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.dss = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.currentbreedingSireClick = function () {
    $http({
      method : 'POST',
      url : '/currentbreedingdatasire',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.cbs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowRegAnimalData = function(){
    $http({
      method : 'GET',
      url : '/getreganimaldata',
    }).then(function success(response){
      $scope.animdetails = response.data;
      console.log($scope.animdetails,'ppppppppppppppppppp')
      // console.log($scope.animdetails)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowCheckOut = function(){
    $scope.showcheckout = true;
    $scope.showcheckout1 = true;
  }
  $scope.HoldCheck = function(hold){
    // console.log(hold)
    $http({
      method : 'POST',
      url : '/holdcheck',
      data : hold
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.CheckHoldingPen = function(anidetails){
    // console.log(anidetails)
    $http({
      method : 'POST',
      url : '/checkholdingpen',
      data : anidetails
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.CheckHoldingPen1 = function(andetail){
    // console.log(andetail)
    if(andetail.eartag == 1){
      $scope.fedex = 1;
    }
    else{
      $scope.fedex = 0;
    }
    $http({
      method : 'POST',
      url : '/checkholdingpen1',
      data : andetail
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SuperStackData = function(){
    $http({
      method : 'GET',
      url : '/superstackdata'
    }).then(function success(response){
      $scope.ssds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SSAmount = function(){
    $http({
      method : 'GET',
      url : '/superstackamount'
    }).then(function success(response){
      $scope.ssas = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.CheckHoldingStacksPen = function(ssd){
    $http({
      method : 'POST',
      url : '/checkholdingss',
      data : ssd
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EidInfo = function(){
    $http({
      method : 'GET',
      url : '/eidinformation',
    }).then(function success(response){
      $scope.cost = response.data[0];
      $scope.cost1 = response.data[1];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.editHoldingPen = function(anidetails){
    $http({
      method : 'POST',
      url : '/editholdingpendata',
      data : anidetails
    }).then(function success(response){
      $scope.reganimal = response.data[0];
      $scope.reganimal['unBd'] =  $scope.reganimal.Birthdate
      var date = new Date($scope.reganimal['unBd']);
      $scope.reganimal['unBd'] = $filter('date')(date, 'MM/dd/yyyy');
      $scope.posterTitle = $scope.reganimal.picture;
      console.log($scope.reganimal,'ooooooooooooooooooooooooo');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.removeImage1 = function(){
    $scope.posterTitle = '';
    $scope.reganimal.picture = '';
  }
  $scope.addRegNoSire = function(reganimal){
    console.log('second',$scope.reganimal)
    $http({
      method : 'POST',
      url : '/addregnosire',
      data : reganimal
    }).then(function success(response){
      if(response.data[0].msg){
        alert(response.data[0].msg)
      } else {
        $scope.ssrs = response.data;
        $scope.reganimal.txtreg = "";
      }
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.RemoveSSR = function(ssr,reganimal){
    $http({
      method : 'POST',
      url : '/removesirefromlist/'+reganimal.RegNoID,
      data : ssr
    }).then(function success(response){ 
      alert('Removed Successfully')
      var index = $scope.ssrs.indexOf(ssr);
      $scope.ssrs.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.RemoveHoldingPen = function(anidetails){
    $http({
      method : 'POST',
      url : '/removeholdingpen',
      data : anidetails
    }).then(function success(response){ 
      alert('Removed Successfully');
      var index = $scope.animdetails.indexOf(anidetails);
      $scope.animdetails.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddCurrentSireToList = function(cs,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/addcurrentsiretolist/'+reganimal.RegNoID,
      data : cs
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddPreviousSireToList = function(ps,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/addprevioussiretolist/'+reganimal.RegNoID,
      data : ps
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddDeceasedSireToList = function(ds,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/adddeceasedsiretolist/'+reganimal.RegNoID,
      data : ds
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddCurrentSireToBreeding = function(cs,reganimal){
    $http({
      method : 'POST',
      url : '/addcurrentsiretobreeding/'+reganimal.RegNoID,
      data : cs
    }).then(function success(response){ 
      $scope.cb = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.RemoveSireFromBreedingList = function(cb,reganimal){
    $http({
      method : 'POST',
      url : '/removesirefrombreedinglist/'+reganimal.RegNoID,
      data : cb
    }).then(function success(response){ 
      alert('Removed Successfully');
      var index = $scope.cbs.indexOf(cb);
      $scope.cbs.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.addmemberSiere = function(reganimal){
    $scope.showtable2 = true;
    $http({
      method : 'POST',
      url : '/addmembersiere',
      data : reganimal
    }).then(function success(response){ 
      $scope.someone = {};
      $scope.someonelist = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddSomeoneSiere = function(someone){
    $scope.showtable3 = true;
    $http({
      method : 'POST',
      url : '/addsomeonesiere',
      data : someone
    }).then(function success(response){ 
      $scope.currentsomeone = response.data.current;
      $scope.previoussomeone = response.data.previous;
      $scope.deceasedsomeone = response.data.deceased;
      $scope.breedingsomeone = response.data.breeding;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddCurrentSireToList = function(scurrent,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneaddcurrentsiretolist/'+reganimal.RegNoID,
      data : scurrent
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddPreviousSireToList = function(sprevious,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneaddprevioussiretolist/'+reganimal.RegNoID,
      data : sprevious
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddDeceasedSireToList = function(sdeceased,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneadddeceasedsiretolist/'+reganimal.RegNoID,
      data : sdeceased
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddCurrentSireToBreeding = function(scurrent,reganimal){
    $http({
      method : 'POST',
      url : '/someoneaddcurrentsiretobreeding/'+reganimal.RegNoID,
      data : scurrent
    }).then(function success(response){ 
      $scope.breedingsomeone = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneRemoveSireFromBreedingList = function(sbreeding,reganimal){
    $http({
      method : 'POST',
      url : '/someoneremovesirefrombreedinglist/'+reganimal.RegNoID,
      data : sbreeding
    }).then(function success(response){ 
      alert('Removed Successfully');
      var index = $scope.breedingsomeone.indexOf(sbreeding);
      $scope.breedingsomeone.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.currentDamClick = function () {
    $http({
      method : 'POST',
      url : '/currentdatadam',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.cds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.previousDamClick = function () {
    $http({
      method : 'POST',
      url : '/previousdatadam',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.pds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.deceasedDamClick = function () {
    $http({
      method : 'POST',
      url : '/deceaseddatadam',
      data: $scope.reganimal
    }).then(function success(response){
      $scope.dds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.addRegNoDam = function(reganimal){
    $scope.alertEnabled = true
    $http({
      method : 'POST',
      url : '/addregnodam',
      data : reganimal
    }).then(function success(response){
      if(response.data[0] && response.data[0].msg){
        $scope.alertEnabled = false;
        alert(response.data[0].msg)
      } else {
        $scope.ssrs = response.data;
        console.log($scope.ssrs,'ssrssss')
        $scope.reganimal.txtreg = "";
      }
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AlertBox1 = function(){
    $scope.cou = true;
  }
  $scope.AlertBox = function(reganimal){
    $http({
      method : 'POST',
      url : '/alertboxfordam',
      data : reganimal
    }).then(function success(response){
      $scope.counter = response.data.count[0].Cnt;
      // console.log($scope.counter)
      $scope.ranch1 = response.data.ranch[0].RanchName;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowListInNextPage = function(anidetails){
    $http({
      method : 'POST',
      url : '/showlistinnextpage',
      data : anidetails
    }).then(function success(response){
      console.log(response.data,'datataaaaaaaaaaaaaa')
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddCurrentDamToList = function(cd,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/addcurrentdamtolist/'+reganimal.RegNoID,
      data : cd
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddPreviousDamToList = function(pd,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/addpreviousdamtolist/'+reganimal.RegNoID,
      data : pd
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddDeceasedDamToList = function(dd,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/adddeceaseddamtolist/'+reganimal.RegNoID,
      data : dd
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.addmemberDam = function(reganimal){
    $scope.showtable5 = true;
    $http({
      method : 'POST',
      url : '/addmemberdam',
      data : reganimal
    }).then(function success(response){ 
      $scope.dsomeone = {};
      $scope.dsomeonelist = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddSomeoneDam = function(someone){
    $scope.showtable4 = true;
    $http({
      method : 'POST',
      url : '/addsomeonedam',
      data : someone
    }).then(function success(response){ 
      $scope.dcurrentsomeone = response.data.dcurrent;
      $scope.dprevioussomeone = response.data.dprevious;
      $scope.ddeceasedsomeone = response.data.ddeceased;
      $scope.dbreedingsomeone = response.data.dbreeding;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddCurrentDamToList = function(dcurrent,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneaddcurrentdamtolist/'+reganimal.RegNoID,
      data : dcurrent
    }).then(function success(response){ 
      //console.log(response.data)
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddPreviousDamToList = function(dprevious,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneaddpreviousdamtolist/'+reganimal.RegNoID,
      data : dprevious
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddDeceasedSireToList = function(ddeceased,reganimal){
    // console.log(reganimal.RegNoID)
    $http({
      method : 'POST',
      url : '/someoneadddeceaseddamtolist/'+reganimal.RegNoID,
      data : ddeceased
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.BillDetails = function(){
    $http({
      method : 'GET',
      url : '/getbilldetails'
    }).then(function success(response){
      $scope.bills=response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowTableDataPen = function(){
    $http({
      method : 'GET',
      url : '/gettabledatainpen'
    }).then(function success(response){
      console.log(response,"responseresponseresponseresponseresponse")
      $scope.bull=response.data.bull;
      $scope.eid=response.data.eid[0];
      $scope.ss=response.data.ss[0];
      var reg = 0;
      // console.log($scope.bull.length)
      for(i=0;i<$scope.bull.length;i++){
        // console.log($scope.bull[i].totalregprice)
        reg += $scope.bull[i].totalregprice;
      }
      // console.log(reg)
      sum =  reg + $scope.eid.TotEidPrice + $scope.ss.TotSSPrice + $scope.eid.DestronPrice;
      $scope.subTotalHp = sum
      $scope.handling = sum * 0.02;
      if($scope.eid.EidCount > 0){
      $scope.amount = sum + $scope.handling + $scope.shipAmount + $scope.envelope;
      } else {
      $scope.amount = sum + $scope.handling;
      }
      if($scope.PaymentType && $scope.PaymentType.Payment == 'eCheck') {
        if($scope.eid.EidCount > 0){
        $scope.amount =  sum + $scope.shipAmount + $scope.envelope;
        } else {
        $scope.amount =  sum;
        }
      }
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SameAddress = function(bills){
    if($scope.sameasabove){
      $scope.bills.FirstName1 = angular.copy($scope.bills.FirstName);
      $scope.bills.LastName1 = angular.copy($scope.bills.LastName);
      $scope.bills.Email1 = angular.copy($scope.bills.Email);
      $scope.bills.Phone1 = angular.copy($scope.bills.Phone);
      $scope.bills.Address1 = angular.copy($scope.bills.Address);
      $scope.bills.City1 = angular.copy($scope.bills.City);
      $scope.bills.State1 = angular.copy($scope.bills.State);
      $scope.bills.Zip1 = angular.copy($scope.bills.Zip);
      $scope.bills.Country1 = angular.copy($scope.bills.Country);
    } else {
      $scope.bills.FirstName1 = "";
      $scope.bills.LastName1 = "";
      $scope.bills.Address1 = "";
      $scope.bills.City1 = "";
      $scope.bills.State1 = "";
      $scope.bills.Zip1 = "";
      $scope.bills.Country1 = "";
    }
  }
  $scope.saveBillingInfo = function(bills){
    $scope.shownext=false;
    $scope.showcheckout=true;
    $scope.showcheckout1=false;
    $scope.showpay=false;
    $scope.showfulldata=true
    $http({
      method : 'POST',
      url : '/savebillinginfo',
      data : bills
    }).then(function success(response){
      console.log(response.data,"tempidddddddddddddddddddddddddddd")
      $scope.eid.fed = response.data.data[0].Fed;
      $scope.tempid = response.data[0].tempId; 
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AnimalPayment = function(pay,amount,handling,tempid,bull,bills,shipValue){
    let shipObject = {
      shipCost: shipValue,
      shipType :$scope.selectedType
    }
    $http({
      method : 'POST',
      url : '/animalpayment',
      data : {pay : pay, amount:amount, handling : handling,tempid : tempid, bull : bull, bills : bills,shipObject}
    }).then(function success(response){ 
      var msg = response.data.msg;
      alert(msg)
      if($scope.eid.EidCount > 0){
      $scope.shippingSection = true;
      $scope.createSorder(bills);
      }
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.createSorder = function(){
    let tempArray = [];
    console.log('insideeeee',$scope.bills)
    tempArray = [{
currency: "USD",
product: "437f40b02951453e98969f2464165c3b",
quantity: $scope.eid.EidCount,
sku: "HM-123",
title: 'EID Tags',
total_amount: 15 * $scope.eid.EidCount,
total_weight: 0.025 * $scope.eid.EidCount,
"weight_unit": "lb"
    }]
   let temp =  $scope.fedexRates.filter(obj=>{ return  obj.amount == $scope.shipAmount })
    let shippingObj = {
      shipping_cost: $scope.shipAmount,
      subtotal_price : $scope.subTotalHp,
      total_price : $scope.amount,
      shipping_method:temp[0].servicelevel.name,
    }
    $http({
      method : 'POST',
      url : '/createShippingOrder',
      data: {bills:$scope.bills,product : tempArray,shippingObj : shippingObj}
    }).then(function success(response){ 
      console.log(response.data,'responseee')
      $scope.generateLabel($scope.bills,$scope.amount);
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.generateLabel = function(bills,amountTotal){
    let tempS =  $scope.fedexRates.filter(obj=>{ return  obj.amount == $scope.shipAmount })
    let shippingDet = {
      carrier_account : tempS[0].carrier_account,
      servicelevel_token : tempS[0].servicelevel.token,
      selectedObjectRateId : $scope.selectedRate,
      totalAmount :amountTotal
    }
    $http({
      method : 'POST',
      url : '/trackingOrder',
      data : {bills : bills,parcels : $scope.parcels,shippingDet : shippingDet}
    }).then(function success(response){ 
      console.log(response.data,'yyyyy')
      $scope.saveDataIntoDb(response.data);
      $scope.shippingTrack = response.data;
      $scope.shippingSection = true;
      $scope.showfulldata = false;
      $scope.showpay = false;
      $scope.shownext = false;
      $scope.showcheckout1 = false;
      $scope.showpen=false;
      // window.open('wotracking/' + response.data.tracking_number, '_blank');
      // window.location.href = 'wotracking/' + response.data.tracking_number;
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.saveDataIntoDb = function(data){
    $http({
      method : 'POST',
      url : '/saveTrackingData',
      data : {trackingData : data}
    }).then(function success(response){ 
      console.log(response.data,'last')

    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.getCarrierDetails = function(bills){
    $scope.eid.EidCount
    let parcelObj = [{
      weight:0.025 * $scope.eid.EidCount,
      length: 10 ,
      width:1.5 ,
      height:14.5,
      distance_unit: 'in',
      mass_unit: 'lb'
    }]
      console.log('inside tssssssss',{bills : bills,parcels: parcelObj})
      $http({
        method : 'POST',
        url : '/saveShippingData',
        data:{bills : bills,parcels: parcelObj}
      }).then(function success(response){
        console.log(response.data,"ressssssssssssssssssss")
        let selected = ['Priority Overnight®','Express Saver®','First Overnight®','2Day®']
        let res = response.data.filter(obj=>selected.includes(obj.servicelevel.name))
        $scope.fedexRates = res;
        $scope.saveRates(res);
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
  
    $scope.saveRates = function(data){
      $http({
        method : 'POST',
        url : '/saveRatesIntoDb',
        data:data
      }).then(function success(response){
        console.log(response.data,"ttt")
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
    $scope.getSvalues = function(value,bills){
      $scope.eid.EidCount
      let parcelObj = [{
        weight:0.025 * $scope.eid.EidCount,
        length: 10 ,
        width:1.5 ,
        height:14.5,
        distance_unit: 'in',
        mass_unit: 'lb'
      }]
        console.log('inside tssssssss',{bills : bills,parcels: parcelObj})
        $http({
          method : 'POST',
          url : '/saveShippingData',
          data:{bills : bills,parcels: parcelObj}
        }).then(function success(response){
          if(value === 'fedex'){
            $scope.envelope = 0;          
          let selected = ['Priority Overnight®','Express Saver®','First Overnight®','2Day®']
          let res = response.data.filter(obj=>selected.includes(obj.servicelevel.name))
          $scope.fedexRates = res;
          $scope.saveRates(res);
          }
          if(value === 'usps') {
            $scope.envelope = 2;
            var reg = 0;
            for(i=0;i<$scope.bull.length;i++){
              reg += $scope.bull[i].totalregprice;
            }
            sum =  reg + $scope.eid.TotEidPrice + $scope.ss.TotSSPrice + $scope.eid.DestronPrice;
            $scope.subTotalHp = sum
            $scope.handling = sum * 0.02;
            $scope.amount = sum + $scope.handling + $scope.shipping + $scope.envelope;
            let selected = ['First-Class Package/Mail Parcel','Parcel Select','Priority Mail','Priority Mail Express']
            let res = response.data.filter(obj=>selected.includes(obj.servicelevel.name))
            $scope.fedexRates = res;
            $scope.saveRates(res);
          }
        },function error(response){
          alert('Error occured. Please try again later!');
        })
     
    }
    $scope.CalulateWithShipping = function(ship){
      let tempArr = $scope.fedexRates.filter(obj=>obj.amount == ship)
      $scope.selectedRate = tempArr[0].object_id
      $scope.selectedType = tempArr[0].servicelevel.name
      var reg = 0;
      for(i=0;i<$scope.bull.length;i++){
        reg += $scope.bull[i].totalregprice;
      }
      sum =  reg + $scope.eid.TotEidPrice + $scope.ss.TotSSPrice + $scope.eid.DestronPrice;
      $scope.subTotalHp = sum
      $scope.handling = sum * 0.02;
      $scope.amount = sum + $scope.handling + (Number(ship) ? Number(ship) : 0) + $scope.envelope;
      $scope.shippingValue = ship;
      $scope.shipAmount = Number(ship);
    }
});


//-------------------------------------------------------------------Sponsored Events------------------------------------------
app.controller('SponsoredEventsController', function($scope,$http,$sce){
  $scope.SEventsData = function(){
    $http({
      method : 'GET',
      url : '/SponsoredEventsData',
    }).then(function success(response){
      $scope.sevents = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.showpayevent = false;
  $scope.showpayevent1 = false;
  $scope.showpayevents = function(events){
    $scope.showpayevent = true;
    $scope.showpayevent1 = true;
    $scope.events = events;
  }
  $scope.InfoData = function(events){
    $http({
      method : 'POST',
      url : '/eventinformation',
      data : events
    }).then(function success(response){
      $scope.html = $sce.trustAsHtml(response.data.data[0].Description);
      $scope.eventinfo = response.data.data[0];
        // console.log($scope.eventinfo);
        $scope.eventtable = response.data.table;
        // console.log($scope.eventtable);
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.PayScreen = function(){
  $scope.showpayevent = true;
  $scope.showpayevent1 = false;
  $scope.paymentscreen = true;

}
});
  //-------------------------------------------------------------------Super Stacks------------------------------------------
  app.controller('SuperStacksController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('paging', true)
    .withOption('searching', true)
    .withOption('info', true)
    .withOption('order', [0])
    $scope.SuperStacksTable = function(){
      $http({
        method : 'GET',
        url : '/superstackstable',
      }).then(function success(response){
        $scope.ssts = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  });
  //-------------------------------------------------------------------Transfer Animal------------------------------------------
  app.controller('TransferController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('paging', true)
    .withOption('searching', true)
    .withOption('info', true)
    .withOption('order', [0])
    $scope.TransferdAnimalData = function(){
      $http({
        method : 'GET',
        url : '/transferedanimaldata',
      }).then(function success(response){
        $scope.transfered = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.TransferData = function(transfer){
      console.log(transfer,'transfer')
      $scope.animaldata = transfer;
    }
    $scope.calculateTa = function(){
      $scope.amount1 = 30;
        $scope.handling = 30 * 0.02;
          $scope.amount = $scope.handling + 30;
        $scope.amount = $scope.handling + 30;
        if($scope.PaymentType?.Payment == 'eCheck') {
          $scope.amount =  30;
        }
    }
    $scope.TransferAnimalPay = function(pay,bills,animaldata,amount){
      $http({
        method : 'POST',
        url : '/transferedanimalPay',
        data : {pay:pay,bills:bills,animaldata:$scope.animaldata,amount:amount}
      }).then(function success(response){
        $scope.msg = response.data;
      console.log(response.data)
      $scope.paymentid = response.data.paymentid;
      console.log($scope.paymentid);
      $scope.type = response.data.paymentType;
      console.log($scope.type);
      $scope.date = response.data.date;
      console.log($scope.date);
      $scope.amount = response.data.Amount;
      console.log($scope.amount);
    },function error(response){
    })
  }
  $scope.paymentSuccess = function(msg){
    console.log(msg);
    $scope.msg = {};
  }
  $scope.paymentDanger = function(msg){
    console.log(msg);
    $scope.msg = {};
  }
  });
  //-------------------------------------------------------------------Online Store------------------------------------------
  app.controller('OnlineStoreController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('paging', true)
    .withOption('searching', true)
    .withOption('info', true)
    .withOption('order', [0])
    $scope.shipping = 0;
    $scope.envelope = 0;
    $scope.uspsParcels = [];
    $scope.selectedValue;
    $scope.OnlineStore = function(){
      $http({
        method : 'GET',
        url : '/onlinestoredata',
      }).then(function success(response){
        $scope.items = response.data;
        console.log($scope.items,'init itemsss')
        $scope.onlineproducts=true
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.emptyCart = function() {
      $http({
        method : 'GET',
        url : '/emptyCart'
      }).then(function success(response){
      console.log(response.data,'data')
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
    $scope.BillDetails = function(){
      $http({
        method : 'GET',
        url : '/getbilldetails'
      }).then(function success(response){
        $scope.bills=response.data[0];
        console.log($scope.bills,'billssss')
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.getParcels = function(products){
//       let array = []
//       products.forEach(obj=>{
// array.push(obj.ProductCode)
//       })
      $http({
        method : 'POST',
        url : '/getParcels',
        data : {products :products}
      }).then(function success(response){
        $scope.parcels = response.data
      },function error(response){
          alert('Error occured. Please try again later!');
        })
    }
    $scope.getshippingValues = function(bills){
      $http({
        method : 'POST',
        url : '/saveShippingData',
        data:{bills : bills,parcels: $scope.parcels}
      }).then(function success(response){
        let selected = ['Priority Overnight®','Express Saver®','First Overnight®','2Day®']
        let res = response.data.filter(obj=>selected.includes(obj.servicelevel.name))
        $scope.shippingValues = res;
        $scope.saveRates(res);
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
    $scope.saveRates = function(data){
      $http({
        method : 'POST',
        url : '/saveRatesIntoDb',
        data:data
      }).then(function success(response){
        console.log(response.data,"ttt")
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
    $scope.SameAddress = function(bills){
      if($scope.sameasabove){
        $scope.bills.FirstName1 = angular.copy($scope.bills.FirstName);
        $scope.bills.LastName1 = angular.copy($scope.bills.LastName);
        $scope.bills.Email1 = angular.copy($scope.bills.Email);
        $scope.bills.Phone1 = angular.copy($scope.bills.Phone);
        $scope.bills.Address1 = angular.copy($scope.bills.Address);
        $scope.bills.City1 = angular.copy($scope.bills.City);
        $scope.bills.State1 = angular.copy($scope.bills.State);
        $scope.bills.Zip1 = angular.copy($scope.bills.Zip);
        $scope.bills.Country1 = angular.copy($scope.bills.Country);
      } else {
        $scope.bills.FirstName1 = "";
        $scope.bills.LastName1 = "";
        $scope.bills.Address1 = "";
        $scope.bills.City1 = "";
        $scope.bills.State1 = "";
        $scope.bills.Zip1 = "";
        $scope.bills.Country1 = "";
      }
    }
    // $scope.saveBillingInfo = function(bills){
    //   $scope.shownext=false;
    //   $scope.showcheckout=true;
    //   $scope.showcheckout1=false;
    //   $scope.showpay=false;
    //   $scope.showfulldata=true
    //   $http({
    //     method : 'POST',
    //     url : '/savebillinginfo',
    //     data : bills
    //   }).then(function success(response){
    //     // console.log(response.data)
    //     $scope.fed = response.data.data[0].Fed;
    //     $scope.Handling = response.data.data[0].Handling;
    //   $scope.Total = response.data.data[0].Total;
    //     $scope.tempid = response.data.tempid[0].TempId; 
    //   },function error(response){
    //     // alert('Error occured. Please try again later!');
    //   })
    // }
    $scope.ShowCartPayment = function(){
      $scope.carttable = true;
      $scope.carttable1 = false;
      $scope.payment = true;
      $scope.address = false;
      $scope.shipDetails=false;
      $scope.onlineproducts=false;
    }
    $scope.CardDetails = function(pay) {
    $scope.PaymentType.cvv = "";
    $scope.PaymentType.cc = "";
    $scope.PaymentType.expire = "";
    $http({
      method : 'POST',
      url : '/carddetails',
      data : pay
    }).then(function success(response){
      console.log(response,"nnnn")
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
    $scope.ShowCartTable = function(){
      $http({
        method : 'GET',
        url : '/showcartproducts',
      }).then(function success(response){
        $scope.products = response.data;
        //console.log($scope.products.length)
        sum = 0;
        for (i=0; i < $scope.products.length; i++) {
          sum += ($scope.products[i].Price * $scope.products[i].Qty);
        }
        $scope.amount1 = sum;
        $scope.handling = sum * 0.02;
        $scope.amount = $scope.handling + sum;
        $scope.amount = $scope.handling + sum + (Number($scope.shipping) ? Number($scope.shipping) : 0) + $scope.envelope;
        if($scope.PaymentType?.Payment == 'eCheck') {
          $scope.amount =  sum + (Number($scope.shipping) ? Number($scope.shipping) : 0) + $scope.envelope;
        }        
        },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.getValues = function(value,bills){
$scope.selectedValue = value;
      $scope.tWeight =0;
      $scope.tHeight =0;
      $scope.tlength = 0;
      $scope.tWidth = 0;
      if(value === 'usps') {
$scope.parcels.forEach(obj=>{
  $scope.tWeight += obj.weight;
  $scope.tHeight += obj.height;
  $scope.tlength += obj.length;
  $scope.tWidth += obj.width;
})

$scope.uspsParcels.push({
  distance_unit: "in",
  height:$scope.tHeight,
  length:$scope.tlength,
  mass_unit: "lb",
  weight:$scope.tWeight,
  width:$scope.tWidth
})
$http({
  method : 'POST',
  url : '/saveShippingData',
  data:{bills : bills,parcels: $scope.uspsParcels}
}).then(function success(response){
    $scope.envelope = 2;
    sum = 0;
    for (i=0; i < $scope.products.length; i++) {
      sum += ($scope.products[i].Price * $scope.products[i].Qty);
    }
    $scope.amount1 = sum;
    $scope.handling = sum * 0.02;
    $scope.amount = $scope.handling + sum;
    $scope.amount = $scope.handling + sum + $scope.shipping + $scope.envelope;
    let selected = ['First-Class Package/Mail Parcel','Parcel Select','Priority Mail','Priority Mail Express']
    let res = response.data.filter(obj=>selected.includes(obj.servicelevel.name))
 $scope.shippingValues = res;
 $scope.saveRates(res); 
},function error(response){
  alert('Error occured. Please try again later!');
})
      }
      if(value === 'fedex'){
      $http({
        method : 'POST',
        url : '/saveShippingData',
        data:{bills : bills,parcels: $scope.parcels}
      }).then(function success(response){

        if(value === 'fedex'){
          $scope.envelope = 0;
          let selected = ['Priority Overnight®','Express Saver®','First Overnight®','2Day®']
          let res = response.data.filter(obj=>selected.includes(obj.servicelevel.name))
          $scope.shippingValues = res;
          $scope.saveRates(res);
        }       
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
    }
    $scope.CalulateWithShipping = function(ship){
      let tempArr = $scope.shippingValues.filter(obj=>obj.amount == ship)
      $scope.selectedRate = tempArr[0].object_id
      $scope.selectedType = tempArr[0].servicelevel.name
      // if(Number($scope.shippingValue) != Number(ship)){
        sum = 0;
        for (i=0; i < $scope.products.length; i++) {
          sum += ($scope.products[i].Price * $scope.products[i].Qty);
        }
        $scope.amount1 = sum;
        $scope.handling = sum * 0.02;
        $scope.amount = $scope.handling + sum;
        $scope.amount = $scope.handling + sum + (Number(ship) ? Number(ship) : 0) + $scope.envelope;
      // } else {
      $scope.shipping = Number(ship);
      // $scope.amount = $scope.amount +  $scope.shipping;
    // }
      $scope.shippingValue = ship;
    }
    
    $scope.CartPayment = function(pay,amount,bills,tempid,product,handling){
      let shipObj = {
        shipCost : $scope.shipping,
        shipType : $scope.selectedType
      }
      $http({
        method : 'POST',
        url : '/cartpayment',
        data : {pay : pay, amount : amount, bills : bills,tempid:tempid,product : product,handling:handling,shipObj:shipObj}
      }).then(function success(response){ 
        var msg = response.data.msg;
        alert(msg)
        $scope.createOrder(bills,product);
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
    $scope.createOrder = function(bills,product){
      let tempArray = [];
      if($scope.selectedValue === 'fedex'){
      product.forEach(obj=>{
tempArray.push({
  currency: "USD",
  product: "437f40b02951453e98969f2464165c3b",
  quantity: obj.Qty,
  sku: "HM-123",
  title: obj.Product,
  total_amount:obj.TotalPrice,
  total_weight: obj.Totalweight,
  "weight_unit": "lb"
})
      })
    }
    if($scope.selectedValue === 'usps') {
      $scope.uspsPQty = 0;
      $scope.uspsTotalP = 0;
      $scope.uspsTotalW = 0;
      product.forEach(obj=>{
        $scope.uspsPQty += obj.Qty,
        $scope.uspsTotalP += obj.TotalPrice,
        $scope.uspsTotalW += obj.Totalweight
      })
      tempArray.push({
        currency: "USD",
  product: "437f40b02951453e98969f2464165c3b",
  quantity:  $scope.uspsPQty,
  sku: "HM-123",
  title: 'Products',
  total_amount:$scope.uspsTotalP,
  total_weight: $scope.uspsTotalW,
  "weight_unit": "lb"
      })
    }
     let temp =  $scope.shippingValues.filter(obj=>{ return  obj.amount == $scope.shipping })
      let shippingObj = {
        shipping_cost: $scope.shipping,
        subtotal_price : $scope.amount1,
        total_price : $scope.amount,
        shipping_method:temp[0].servicelevel.name,
      }
      $http({
        method : 'POST',
        url : '/createShippingOrder',
        data: {bills:bills,product : tempArray,shippingObj : shippingObj}
      }).then(function success(response){ 
        console.log(response.data,'responseee')
        $scope.trackShipping(bills,$scope.amount);
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
    $scope.trackShipping = function(bills,amountTotal){
      let tempS =  $scope.shippingValues.filter(obj=>{ return  obj.amount == $scope.shipping })
      let shippingDet = {
        carrier_account : tempS[0].carrier_account,
        servicelevel_token : tempS[0].servicelevel.token,
        selectedObjectRateId : $scope.selectedRate,
        totalAmount :amountTotal
      }
      $http({
        method : 'POST',
        url : '/trackingOrder',
        data : {bills : bills,shippingDet : shippingDet}
      }).then(function success(response){ 
        $scope.saveTrackingToDb(response.data);
        $scope.shippingTrack = response.data;
        $scope.shipDetails = true;
        $scope.carttable = false;
        $scope.carttable1 = false;
        $scope.payment = false;
        $scope.address = false;
        $scope.onlineproducts=false;
        // window.open('wotracking/' + response.data.tracking_number, '_blank');
        // window.location.href = 'wotracking/' + response.data.tracking_number;
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
    $scope.saveTrackingToDb = function(data){
      $http({
        method : 'POST',
        url : '/saveTrackingData',
        data : {trackingData : data}
      }).then(function success(response){ 
        console.log(response.data,'last')

      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
    $scope.HidePayment = function(){
      $scope.carttable = true;
      $scope.carttable1 = false;
      $scope.payment = false;
      $scope.address = true;
    }
    $scope.ShowCartCount = function(){
      $http({
        method : 'GET',
        url : '/showcartcount',
      }).then(function success(response){
        $scope.productlength = response.data.length;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.productlength1 = 0;
    $scope.AddToCart = function(item,items){
      $scope.productlength1++;
      $http({
        method : 'POST',
        url : '/addtocart',
        data : item
      }).then(function success(response){
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.UpdateCart = function(product){
      $http({
        method : 'POST',
        url : '/updatecart',
        data : product
      }).then(function success(response){
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.productlength1 = 0;
    $scope.RemoveFromCart = function(product){
      $scope.productlength1--;
      $http({
        method : 'POST',
        url : '/removefromcart',
        data : product
      }).then(function success(response){
        var index = $scope.products.indexOf(product);
        $scope.products.splice(index, 1);
        sum = 0;
        for (i=0; i < $scope.products.length; i++) {
          sum += ($scope.products[i].Price * $scope.products[i].Qty);
        }
        $scope.amount1 = sum;
        $scope.handling = sum * 0.02;
          $scope.amount = $scope.handling + sum;
        $scope.amount = $scope.handling + sum;
        if($scope.PaymentType.Payment == 'eCheck') {
          $scope.amount =  sum;
        }
        // $scope.ShowCartTable();
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  });
  //-------------------------------------------------------------------Work Order------------------------------------------
  app.controller('WorkOrderController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
    $scope.ShowWO = function(){
      $http({
        method : 'GET',
        url : '/showworkorder'
      }).then(function success(response){
        $scope.wos = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  });
    //-------------------------------------------------------------------News------------------------------------------
  app.controller('NewsController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
    $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
    $scope.NewsInfo = function(){
      $http({
        method : 'GET',
        url : '/newsinfo',
      }).then(function success(response){
        $scope.news = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.MoreNews = function(news){
      $http({
        method : 'POST',
        url : '/newsmore',
        data : news
      }).then(function success(response){
        $scope.morenews = $sce.trustAsHtml(response.data[0].htext);
        // console.log($scope.morenews)
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  });
  //-------------------------------------------------------------------Events------------------------------------------
  app.controller('ScheduleController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
    $scope.ScheduleDate = function(){
      $http({
        method : 'GET',
        url : '/scheduledate',
      }).then(function success(response){
        $scope.sdate = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.ScheduleInfo = function(){
      $http({
        method : 'GET',
        url : '/scheduleinfo',
      }).then(function success(response){
        $scope.sinfo = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
      })
    }
    $scope.schedulehide = false;
    $scope.MoreSchedule = function(sinf){
      $scope.schedulehide = true;
      $scope.schedulehide1 = true;
      $http({
        method : 'POST',
        url : '/moreschedule',
        data : sinf
      }).then(function success(response){
        $scope.data1 = response.data.data1[0];
        $scope.data2 = response.data.data2;
        $scope.data3 = response.data.data3;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.ClassData = function(tjd){
      $scope.schedulehide1 = false;
      $scope.classhide = true;
      $http({
        method : 'POST',
        url : '/classdata',
        data : tjd
      }).then(function success(response){
        $scope.cinfo = response.data[0];
      },function error(response){
      // alert('Error occured. Please try again later!');
      })
    }
    $scope.ExitSchedule = function(){
      $scope.schedulehide = false;
      $scope.schedulehide1 = false;
    }
    $scope.ExitClass = function(){
      $scope.classhide = false;
      $scope.schedulehide1 = true;
    }
  });
      //-------------------------------------------------------------------Results------------------------------------------
  app.controller('ResultController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
    $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
    titleAttr: 'csv'
  },
  ]
  )
  ;
    $scope.ShowResults = function(){
      $http({
        method : 'GET',
        url : '/showresults',
      }).then(function success(response){
        $scope.results = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.MoreResults = function(res){
      $scope.showres = true;
      $scope.showres1 = true;
      $http({
        method : 'POST',
        url : '/moreresults',
        data : res
      }).then(function success(response){
        $scope.data1 = response.data.data1[0];
        $scope.data2 = response.data.data2;
        $scope.data3 = response.data.data3;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.ExitResult = function(){
      $scope.showres = false;
      $scope.showres1 = false;
    }
    $scope.ExitResClass = function(){
      $scope.reshide = false;
      $scope.showres1 = true;
    }
    $scope.ClassResData = function(tjd){
      $scope.showres1 = false;
      $scope.reshide = true;
      $http({
        method : 'POST',
        url : '/classresdata',
        data : tjd
      }).then(function success(response){
        $scope.cinfo = response.data.data[0];
        $scope.resu = response.data.table;
      },function error(response){
      // alert('Error occured. Please try again later!');
      })
    }
    $scope.AnimalProfileTab = function(re){
      $scope.reshide1 = true;
      $scope.reshide = false;
      $scope.showres1 = false;
      $scope.showres = true;
      $http({
        method : 'POST',
        url : '/animalprofiletab',
        data : re
      }).then(function success(response){
        $scope.apts = response.data.data4[0];
        $scope.apts1 = response.data.data5;
        $scope.apts2 = response.data.data6;
        $scope.apts3 = response.data.data7;
      },function error(response){
      // alert('Error occured. Please try again later!');
      })
    }
    $scope.ExitSumClass = function(){
      $scope.reshide1 = false;
      $scope.reshide = true;
      $scope.showres1 = false;
      $scope.showres = true;
    }
  });
  //--------------------------------------------------------------------------------Competition------------------------------------------------------------------------------------
  app.controller('CompetitionController', function($scope,$http,$sce){
     $scope.showfrontier = false;
    $scope.ShowFrontier = function(){
      $scope.showfrontier = true;
      $scope.showfrontier1 = true;
    }
    $scope.ExitFrontier = function(){
      $scope.showfrontier = false;
      $scope.showfrontier1 = false;
    }
    $scope.ShowLegacy = function(){
      $scope.showfrontier = true;
      $scope.showfrontier2 = true;
    }
    $scope.Exitlegacy = function(){
      $scope.showfrontier = false;
      $scope.showfrontier2 = false;
    }
    $scope.ShowProgram = function(){
      $scope.showfrontier = true;
      $scope.showfrontier3 = true;
      $http({
        method : 'GET',
        url : '/programdata',
      }).then(function success(response){
        $scope.prs = response.data;
      },function error(response){

      });
    }
    $scope.ExitProgram = function(){
      $scope.showfrontier = false;
      $scope.showfrontier3 = false;
    }
  });
    //--------------------------------------------------------------------------------Standings------------------------------------------------------------------------------------
  app.controller('StandingsController', function($scope,$http,$sce){
    $scope.showstand = false;
    $scope.ShowCurrentStand = function(){
      $scope.showstand = true;
      $scope.current = true;
    }
    $scope.ExitCurrent = function(){
      $scope.showstand = false;
      $scope.current = false;
    }
    $scope.ShowPastStand = function(){
      $scope.showstand = true;
      $scope.past = true;
    }
    $scope.ExitPast = function(){
      $scope.showstand = false;
      $scope.current = false;
      $scope.past = false;
    }
    $scope.CurrentStandDate = function(){
      $http({
        method : 'GET',
        url : '/currentstanddate'
      }).then(function success(response){
        $scope.cdate = response.data[0];
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.SeasonOut = function(){
      $http({
        method : 'GET',
        url : '/seasonout'
      }).then(function success(response){
        $scope.season = response.data[0];
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.SeasonOut1 = function(){
      var d = new Date(2012, 7, 25);
      $scope.preyear = d.setFullYear(d.getFullYear() - 1);
      $http({
        method : 'GET',
        url : '/seasonout1'
      }).then(function success(response){
        $scope.season1 = response.data[0];
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.AFP = function(data){
      $scope.current = false;
      $scope.past = false;
      $scope.tablestandings = true;
      $scope.tablestandings1 = false;
      $http({
        method : 'POST',
        url : '/seasontable',
        data : data
      }).then(function success(response){
        $scope.seasons = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.AFP1 = function(data){
      $scope.past = false;
      $scope.current = false;
      $scope.tablestandings1 = true;
      $scope.tablestandings = false;
      $http({
        method : 'POST',
        url : '/seasontable1',
         data : data
      }).then(function success(response){
        $scope.seasons = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.ExitTablePastStand = function(){
      $scope.current = false;
      $scope.past = true;
      $scope.tablestandings = false;
      $scope.tablestandings1 = false;
    }
    $scope.ExitTableCurrentStand = function(){
      $scope.current = true;
      $scope.past = false;
      $scope.tablestandings = false;
      $scope.tablestandings1 = false;
    }
    $scope.ShowPPYear = function(){
      var year = new Date()
      year.setFullYear(year.getFullYear())
      var previousYear = new Date()
      previousYear.setFullYear(previousYear.getFullYear() - 1)
      $scope.cyear = year;
      $scope.pyear = previousYear;
    }
  });
  //-------------------------------------------------------------------My Entries------------------------------------------
  app.controller('EntriesController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('paging', true)
    .withOption('searching', true)
    .withOption('info', true)
    .withOption('order', [0])
    $scope.Entries = function(){
      $http({
        method : 'GET',
        url : '/myentries',
      }).then(function success(response){
        $scope.mes = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.entrypayments = false;
    $scope.entrypayments1 = false;
    $scope.PayforEntry = function(){
      $scope.entrypayments = true;
      $scope.entrypayments1 = false;
    }
  });
  //-------------------------------------------------------------------Event Entries------------------------------------------
  app.controller('EnterEventsController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('paging', true)
    .withOption('searching', true)
    .withOption('info', true)
    $scope.hideentry = false;
    $scope.hideentry1 = false;
    $scope.EventEntryList = function(){
      $http({
        method : 'GET',
        url : '/evententrylist',
      }).then(function success(response){
        $scope.eels = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.EnterEventData = function(eel){
      $scope.hideentry = true;
      $scope.hideentry1 = true;
      // console.log(eel);
      $http({
        method : 'POST',
        url : '/entereventdata',
        data : eel
      }).then(function success(response){
        $scope.eesd = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.EnterEventScreen = function(ees){
      $scope.hideentry = true;
      $scope.hideentry1 = false;
      $scope.hideentry2 = true;
      // console.log(eel);
      $http({
        method : 'POST',
        url : '/entereventscreen',
        data : ees
      }).then(function success(response){
        $scope.eesi = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  $scope.MyEntry = function(eesi){
      // console.log(eel);
      $http({
        method : 'POST',
        url : '/myentry',
        data : eesi
      }).then(function success(response){
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  });
    //-------------------------------------------------------------------My Payments------------------------------------------
  app.controller('PaymentController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('paging', true)
    .withOption('searching', true)
    .withOption('info', true)
    .withOption('order', [0])
    $scope.Payments = function(){
      $http({
        method : 'GET',
        url : '/mypayments',
      }).then(function success(response){
        $scope.pays = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.ShowPayNext = function(pay){
      // alert('hi')
      $scope.showpays = true;
      $http({
        method : 'POST',
        url : '/paynext',
         data : pay
      }).then(function success(response){
        $scope.pays1 = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.ExitPay = function(){
      $scope.showpays = false;
    }
  });
  //------------------------------------------------------------------------------------Contact Us-------------------------------------------------------------------------------------
  app.controller('ContactController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
    $scope.ContactInfo = function(contact){
      $http({
        method : 'POST',
        url : '/contactinfo',
        data : contact
      }).then(function success(response){
        $scope.contact = {};
        alert('Thankyou for contacting us');
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  });
  //--------------------------------------------------------------------Custom Payments---------------------------------------------------------
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
app.service('fileUpload1', ['$http', function ($http) {
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
        // console.log(success.data)
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
app.controller('CpayController', function($scope,$http,$filter){
  // fileUpload1
  // $scope.CustomPay = function(pay){
  //   var details = $scope.pay
  //   // console.log(details)
  //   var uploadUrl = "/custompay";
  //   fileUpload1.uploadFileToUrl(details, uploadUrl)
  // }
  $scope.customPayment = function(){
    $http({
        method : "GET",
        url : "/renewdetails",
    }).then(function success(response){
      $scope.userDetails = response.data[0];
      $scope.getDetails($scope.userDetails);
    }, function error(response){
      alert('Error Occured, Please try again later')
    })
  }
  $scope.getDetails = function(memeberId) {
    console.log('test custom payment!')
    $http({
      method : 'POST',
      url : '/getbillinfo',
      data : {id : 1362}
    }).then(function success(response){
      $scope.userData = response.data[0];
      $scope.getCustomDetails();
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.getCustomDetails = function(){
    $http({
      method : 'POST',
      url : '/getCustomPaymentDetails',
      data : {id : $scope.userDetails.MemberNumber}
    }).then(function success(response){
      $scope.customdata = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  //   $scope.CustomPay = function(pay){
  //   $http({
  //       method : 'POST',
  //       url : '/custompay',
  //       data : {pay:pay,customdata:$scope.customdata}
  //     }).then(function success(response){
  //       alert(response.data.msg);
  //     },function error(response){
  //     // alert('Error occured. Please try again later!');
  //   })
  // }
  $scope.CustomPay = function(pay){
    $http({
      method : 'POST',
      url : '/custompay',
      data : {pay:pay,customdata:$scope.customdata}
    }).then(function success(response){ 
      var msg = response.data.msg;
      alert(msg);
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
});
//-------------------------------------------------------------Group Payment------------------------------------------
app.controller('GCpayController', function($scope,$http){
  $scope.GCustomPay = function(gpay){
    // console.log(gpay)
      $http({
        method : 'POST',
        url : '/gcustompay',
        data : gpay
      }).then(function success(response){
        $scope.contact = {};
        alert(response.data.msg);
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
});