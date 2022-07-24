var app = angular.module('adminApp',['ui.directives', 'ui.filters','datatables', 'datatables.buttons','AngularPrint','ngFileUpload','ckeditor','ngRoute']);
//-----------------------------------------------------------Main Page--------------------------------------------------------------
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', { template: 
        `<div>
            <h2 class="text-center" style="background-color:#503219; color:#fff; padding:5px; min-width:100px;">Home</h2>
          </div>
          <div class="container border" style="height:100%;width:90%;padding: 10px;">
            <h3 class="text-danger text-center">Welcome to Admin Panel</h3>
          </div>`,
          controller:'EditAnimalController'
      })
    .when('/main', {templateUrl: 'main', controller:'MainPageController' })
    .when('/transferedanimals', { templateUrl: 'transferedanimals', controller:'TransferController' })
    .when('/eventwithouteid', { templateUrl: 'eventwithouteid', controller:'EventWithoutEIDController' })
    .when('/workorders/:wono/:cat/:sta', { templateUrl: 'workorders', controller:'MainPageController' })
    .when('/editanimal', { templateUrl: 'editanimal', controller:'animalController' })
    .when('/editanimals/:id', { templateUrl: 'editanimals', controller:'SearchEditMember' })
    .when('/addnewanimal', { templateUrl: 'addnewanimal', controller:'AddAnimalController' })
    .when('/searchanimal', { templateUrl: 'searchanimal', controller:'SearchAnimalController' })
    .when('/searchmembers', { templateUrl: 'searchmembers' })
    .when('/addmember', { templateUrl: 'addmember', controller:'memberController' })
    .when('/memberprofile/:no', { templateUrl: 'memberprofile', controller:'SearchEditMember' })
    .when('/workorder', { templateUrl: 'workorder', controller:'SearchWorkOrderController' })
    .when('/memberpayments', { templateUrl: 'memberpayments' })
    .when('/custompayments', { templateUrl: 'custompayments', controller:'CPaymentsController' })
    .when('/groupcustompay', { templateUrl: 'groupcustompay', controller:'GCPaymentsController' })
    .when('/oevents', { templateUrl: 'oevents', controller:'EventsController' })
    .when('/eventpayments', { templateUrl: 'eventpayments', controller:'EventPaymentController' })
    .when('/eventroster', { templateUrl: 'eventroster', controller:'RoasterController' })
    .when('/eventeidmanager', { templateUrl: 'eventeidmanager', controller:'EventEIDManagerController' })
    .when('/eventeidimport', { templateUrl: 'eventeidimport', controller:'EventEIDImportController' })
    .when('/dnatesting', { templateUrl: 'dnatesting', controller:'DnaTestController' })
    .when('/dnaverify', { templateUrl: 'dnaverify', controller:'DNAVerifyController' })
    .when('/importlabresult', { templateUrl: 'importlabresult', controller:'DNAVerifyController' })
    .when('/genoresearch', { templateUrl: 'genoresearch', controller:'GenoResearchController' })
    .when('/breederscertificate', { templateUrl: 'breederscertificate', controller:'CertificateController' })
    .when('/superstakes', { templateUrl: 'superstakes', controller:'SuperStakesController' })
    .when('/onlinestore', { templateUrl: 'onlinestore', controller:'OnlineStoreController' })
    .when('/discountmanager', { templateUrl: 'discountmanager', controller:'DiscountManagerController' })
    .when('/eidorderexport', { templateUrl: 'eidorderexport', controller:'EIDExportController' })
    .when('/eidorderimport', { templateUrl: 'eidorderimport', controller:'EIDOrderImportController' })
    .when('/bulkemail', { templateUrl: 'bulkemail', controller:'BulkEmailController' })
    .when('/membershipdue', { templateUrl: 'membershipdue', controller:'MembershipDueController' })
    .when('/membershipprices', { templateUrl: 'membershipprices', controller:'MembershipPricesController' })
    .when('/registrationprices', { templateUrl: 'registrationprices', controller:'RegistrationPricesController' })
    .when('/workorderprice', { templateUrl: 'workorderprice', controller:'WorkorderPriceController' })
    .when('/utilities', { templateUrl: 'utilities', controller:'UtilitiesController' })
    .when('/animalearning', { templateUrl: 'animalearning', controller:'AnimalEarningsController' })
    .when('/approval', { templateUrl: 'approval', controller:'AnimalApprovalController' })
    .when('/memberapproval', { templateUrl: 'memberapproval', controller:'MemberApprovalController' })
    .when('/databasebackup', { templateUrl: 'databasebackup', controller:'DatabaseBackupController' })
    .when('/bulkemailoutbox', { templateUrl: 'bulkemailoutbox', controller:'BulkEmailOutboxController' })
    .when('/emailoutbox', { templateUrl: 'emailoutbox', controller:'EmailOutboxController' })
    .when('/adhoc', { templateUrl: 'adhoc', controller:'AdHocController' })
    .when('/memberInventoryReport', { templateUrl: 'memberInventoryReport', controller:'ReportsController' })
    .when('/memberDueDateReport', { templateUrl: 'memberDueDateReport', controller:'ReportsController' })
    .when('/membersStartdateReport', { templateUrl: 'membersStartdateReport', controller:'ReportsController' })
    .when('/animalBirthDateReport', { templateUrl: 'animalBirthDateReport', controller:'ReportsController' })
    .when('/animalRegReports', { templateUrl: 'animalRegReports', controller:'ReportsController' })
    .when('/membershipbyMonthReport', { templateUrl: 'membershipbyMonthReport', controller:'ReportsController' })
    .when('/membershipreports', { templateUrl: 'membershipreports', controller:'ReportsController' })
    .when('/labelReportcert', { templateUrl: 'labelReportcert', controller:'ReportsController' })
    .when('/labelreportfailedtesting', { templateUrl: 'labelreportfailedtesting', controller:'ReportsController' })
    .when('/labelrepoprtnonmatch', { templateUrl: 'labelrepoprtnonmatch', controller:'ReportsController' })
    .when('/labelreportmembership', { templateUrl: 'labelreportmembership', controller:'ReportsController' })
    .when('/membershipcards', { templateUrl: 'membershipcards', controller:'ReportsController' })
    .when('/letteroffilledtesting', { templateUrl: 'letteroffilledtesting', controller:'ReportsController' })
    .when('/reportcert', { templateUrl: 'reportcert', controller:'ReportCertificateController' })
    .when('/membershiprenewalnotification', { templateUrl: 'membershiprenewalnotification', controller:'MemRenewalNotiController' })
    .when('/membershiprenewalreport', { templateUrl: 'membershiprenewalreport', controller:'MembershipRenewalReportController' })
    .when('/memberprofdet', { templateUrl: 'memberprofdet', controller:'MemberDetProfController' })
    // .when('/regevents', { templateUrl: 'regevents', controller:'EventsRegController' })
    .when('/regpastevents', { templateUrl: 'regpastevents', controller:'PastController' })
    .when('/regeventresults', { templateUrl: 'regeventresults', controller:'EventResultsController' })
    .when('/reglink2classes', { templateUrl: 'reglink2classes', controller:'LinkController' })
    .when('/reganimals', { templateUrl: 'reganimals', controller:'AddAnimalRegController' })
    .when('/reghandlers', { templateUrl: 'reghandlers', controller:'HandlerController' })
    .when('/regprograms', { templateUrl: 'regprograms', controller:'ProgramController' })
    .when('/regaddevent', { templateUrl: 'regaddevent', controller:'AddEventController' })
    .when('/regstandings', { templateUrl: 'regstandings', controller:'StandingsController' })
    .when('/regimportjpad', { templateUrl: 'regimportjpad', controller:'JpadController' })
    .when('/addevent', { templateUrl: 'addevent', controller:'additionEventController' })
    .when('/eventview/:id', { templateUrl: 'eventview', controller:'EventViewController' }) 
    .when('/eventhome', { templateUrl: 'eventhome', controller:'EventHomeController' }) 
    .when('/resultboss', { templateUrl: 'resultboss', controller:'ResultBossController' }) 
    .when('/bullboss', { templateUrl: 'bullboss', controller:'BullBossController' }) 
    .when('/resupxml', { templateUrl: 'resupxml', controller:'ImportJpadController' }) 
    .when('/pastevent', { templateUrl: 'pastevent', controller:'PastEventController' })  
    .when('/handlerlist', { templateUrl: 'handlerlist', controller:'HandlerListController' })  
    .when('/handlerform', { templateUrl: 'handlerform', controller:'HandlerFormController' })
    .when('/program', { templateUrl: 'program', controller:'ProgramEventsController' })  
    .when('/classlink', { templateUrl: 'classlink', controller:'ClassLinkController' })
    .when('/addclass', { templateUrl: 'addclass', controller:'AddClassController' })
    .when('/addjudges', { templateUrl: 'addjudges', controller:'AddJudgesController' })
    .when('/classview/:id', { templateUrl: 'classview', controller:'ClassViewController' })
    .when('/editclass', { templateUrl: 'editclass', controller:'EditClassController' })
    .when('/regevents', { templateUrl: 'regevents', controller:'RegisterEventsController' })
    .when('/rlist', { templateUrl: 'rlist', controller:'RlistController' }) 
    .when('/classentrylist', { templateUrl: 'classentrylist', controller:'ClassEntryListController' }) 
    .otherwise({ redirectTo: '/' });
  }]);
app.directive('fileModel', ['$parse', function ($parse) {
  return {
   restrict: 'A',
   link: function(scope, element, attrs) {
    var model = $parse(attrs.fileModel);
    var modelSetter = model.assign;

    element.bind('change', function() {
     scope.$apply(function() {
      modelSetter(scope, element[0].files[0]);
    });
   });
  }
};
}]);
app.directive('loadingWidget', function() {
    return {
        restrict: 'A',
        scope: {
            field: '=',
            attributes: '=',
            editMode: '='
        },
        link: function (scope, element, attrs) {
            // console.log("elm: ", element[0]);
            new Spinner().spin(element[0]);
        }
    };
});
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
app.filter('pagination', function()
{
 return function(input, start)
 {
  start = 0;
  if(input){
  return input.slice(start);
  }
 };
});
//----------------------Print work order controller------------------------------------------
app.controller('MainPageController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$filter,$routeParams,$route,$window){
  $scope.vm = {};
  $scope.renewalEnabled = false;
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', false)
  .withOption('searching', false)
  .withOption('info', false)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.totalPostage= 0;
  $scope.curPage = 0;
  $scope.pageSize = 10;
  $scope.wocategories = $routeParams.cat;
  var data1 = {
    WorkOrderNumber : $routeParams.wono,
    Categories : $routeParams.cat,
    status : $routeParams.sta
  }
  $scope.assignedto = function(){
  $http({
    method : 'GET',
    url : '/assignedtodata'
  }).then(function success(response){
    $scope.assigned = response.data
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.redirect = function(ework){

  window.open('../printworkorder?number=' +ework.WorkOrderNumber, '_blank');

};
$scope.Sample = function(){
  console.log("hurray!")
}
  $scope.GetWorkOrder = function(woor){
  // console.log(woor)
  $scope.showworkorder =true;
  $scope.editworkorder = false;
  $scope.addworkorder = false;
  $scope.eworkorderform1 = false;
  $scope.eworkorderform2 = false;
  $scope.isHide1 = true;
  $scope.additional = false;
  $http({
    method : 'POST',
    url : '/editmemberpayment1',
    data : woor
  }).then(function success(response){
    if(response.data.emps){
        $scope.emps = response.data.emps[0];
      }
      if(response.data.merchand){
        $scope.merchands = response.data.merchand;
      }
      if(response.data.shipping){
        $scope.shipping = response.data.shipping[0];
      }
      if(response.data.wods){
        $scope.wods = response.data.wods[0];
      }
      if(response.data.wom){
        $scope.wom = response.data.wom;
      }
      if(response.data.wotable1){
        $scope.wotable1 = response.data.wotable1;
      }
      if(response.data.animaltab){
        $scope.animaltab = response.data.animaltab;
      }
      if(response.data.eventdata){
        $scope.eventdata = response.data.eventdata[0];
      }
      if(response.data.eventtable){
        $scope.eventtable = response.data.eventtable;
      }
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.openNewPage = function(){
  console.log('insidee')
  $scope.isHide1 = false;
  $scope.printWo = true;
}
$scope.HideAdditional=function(emps){
    $scope.isHide1=false;
    $scope.additional = true;
    $scope.addanimal = false;
    $http({
      method : 'POST',
      url : '/getadditionalinfo',
      data : emps
    }).then(function success(response){
      $scope.gais = response.data[0];
      $scope.tgais = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.MakePayment = function(){
    $scope.pay = true;
    $scope.editworkorder = false;
  }
  $scope.MakePayment5 = function(){
    $scope.pay5 = true;
    $scope.addworkorder = false;
  }
  $scope.AddAni=function(emps){
    $scope.isHide1=false;
    $scope.additional = true;
    $scope.addanimal = false;
    $http({
      method : 'POST',
      url : '/getadditionalinfo',
      data : emps
    }).then(function success(response){
      $scope.gais = response.data[0];
      $scope.tgais = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ExitAddPay=function(emps){
    $scope.showworkorder =true;
    $scope.editworkorder = false;
    $scope.addworkorder = false
    $scope.eworkorderform2 = false;
    $scope.isHide1=false;
    $scope.additional = false;
    $scope.addanimal = false;
  }
  $scope.ExitAdditional=function(emps){
    $scope.isHide1=true;
    $scope.additional = false;
    $scope.addanimal = false;
    $scope.eworkorderform2 = false;
  }
  $scope.ExitAddAni=function(emps){
    $scope.isHide1=true;
    $scope.addanimal = false;
    $scope.additional = false;
  }
  $scope.SameAddress = function(sameasabove) {
    // console.log(sameasabove)
    if(sameasabove){
      $scope.ework.ShippingFirstName = angular.copy($scope.ework.FirstName);
      $scope.ework.ShippingLastName = angular.copy($scope.ework.LastName);
      $scope.ework.ShippingCity = angular.copy($scope.ework.BillingCity);
      $scope.ework.ShippingState = angular.copy($scope.ework.BillingState);
      $scope.ework.ShippingZip = angular.copy($scope.ework.BillingZip);
      $scope.ework.ShippingCountry = angular.copy($scope.ework.BillingCountry);
      $scope.ework.ShippingAddress = angular.copy($scope.ework.BillingAddress);
    } else {
      $scope.ework.ShippingFirstName = "";
      $scope.ework.ShippingLastName = "";
      $scope.ework.ShippingCity = "";
      $scope.ework.ShippingState = "";
      $scope.ework.ShippingZip = "";
      $scope.ework.ShippingCountry = "";
      $scope.ework.ShippingAddress = "";
    }
  };
  $scope.mainPage = function(){
    $http({
      method : 'POST',
      url : '/mainpagedata',
      data : {page : $scope.curPage, pageSize : $scope.pageSize, search : $scope.vm ? $scope.vm.Search : ''}
    }).then(function success(response){
      $scope.mainwos = response.data
      // console.log(mainwos)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
    $scope.numberOfPages = function() {
      if($scope.mainwos && $scope.mainwos[0].xCount){
      return Math.ceil($scope.mainwos[0].xCount / $scope.pageSize);
      }
    };
  }
  $scope.searchMain = function(){
    $scope.curPage = 0;
    $scope.pageSize = 10;
    console.log($scope.vm,'vmmm')
    $scope.mainPage();
  }
  $scope.showstat = false;
  $scope.ShowStatus = function(){
    $scope.showstat = true;
  }
  $scope.EditWorkOrder = function(){
  $scope.showworkorder = true;
  $scope.addworkorder = false;
  $scope.editworkorder = true;
  $scope.eworkorderform2 = true;
  $scope.Categories = $routeParams.cat
  // console.log($scope.Categories)
  $http({
    method : 'POST',
    url : '/editworkorder',
    data : data1
  }).then(function success(response){
    $scope.ework = response.data.details[0];
    $scope.ework.CreatedDate = $filter('date')( response.data.details[0].CreatedDate, 'MM/dd/yyyy');
    $scope.ework.DueDate = $filter('date')( response.data.details[0].DueDate, 'MM/dd/yyyy');
    $scope.ework1 = response.data.table;
    $scope.id = response.data.id;
    $scope.fname = response.data.fname;
    $scope.lname = response.data.lname;
    $scope.heading = response.data.headings;
    if($scope.ework.MembershipRenewalPrice !=null){
      $scope.renewalEnabled = true;
    }
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.changePayment = function(paymentType){
  if(paymentType.Payment == 'eCheck'){
    $scope.ework.TotalPriceAmt = $scope.ework.TotalPriceAmt - $scope.ework.HandlingAmt
  }
  else{
    $scope.ework.TotalPriceAmt = $scope.ework.TotalPriceAmt;
  }
}
$scope.updateRenewalPrice = function(){
  $scope.renewalEnabled = !$scope.renewalEnabled;
  if($scope.ework.MembershipRenewalPrice!=null && !$scope.renewalEnabled){
   $scope.ework.TotalPriceAmt = $scope.ework.TotalPriceAmt - $scope.ework.MRP
  } 
  if($scope.ework.MembershipRenewalPrice == null && $scope.renewalEnabled) {
   $scope.ework.TotalPriceAmt = $scope.ework.TotalPriceAmt + $scope.ework.MRP

  }
}
$scope.UpdateWorkOrder = function(ework1){
  $http({
    method : 'POST',
    url : '/updateworkorder',
    data : ework1
  }).then(function success(response){
    alert('Updated Successfully');
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.UpdateWorkOrder1 = function(ework){
    // console.log(ework)
    $http({
      method : 'POST',
      url : '/updateworkorder1',
      data : ework
    }).then(function success(response){
      alert('Updated Successfully');
    },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.MakePayment = function(){
    $scope.pay = true;
    $scope.editworkorder = false;
  }
  $scope.MakePayment5 = function(){
    $scope.pay5 = true;
    $scope.addworkorder = false;
  }
  $scope.UpdateWorkOrder3 = function(ework,pay){
    // console.log(ework)
    let tempB = [];
    $scope.ework1.forEach(obj=>{
      if(obj.Quantity!= null || obj.LineId != null) {
        tempB.push(obj);
      }
    })
    $http({
      method : 'POST',
      url : '/updateworkorder3',
      data : {ework:ework,pay:pay,worklists: tempB}
    }).then(function success(response){
      alert(response.data.msg);
    },function error(response){
        alert('Error occured. Please try again later!');
      })
  }
  $scope.UpdateWorkOrder2 = function(ework1,ework){
    $http({
      method : 'POST',
      url : '/updateworkorder2',
      data : {ework1 : ework1, ework : ework}
    }).then(function success(response){
        // alert('Updated Successfully');
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.ChangeValue =function(eworks,ework,ework6){
    // console.log(eworks)
    // console.log(ework)
    // console.log(ework6)
    if(!ework6){
      eworks.SubTotal = (eworks.Price * eworks.Quantity) + eworks.ItemPostage;
      var total = 0;
      angular.forEach($scope.ework1,function(data){
        total += (data.Price * data.Quantity) + data.ItemPostage;
        $scope.totalPostage +=data.ItemPostage

        if(eworks.Quantity == 0 && total == 0) {
          $scope.ework.TotalPriceAmt=total;
          $scope.ework.HandlingAmt = total;
        }else{
          $scope.ework.HandlingAmt = total * 0.02;
          $scope.ework.TotalPriceAmt= total + $scope.ework.HandlingAmt;
          if ($scope.Account != undefined) 
          {
            $scope.ChangeUpgrade(test,ework);
          }
        }
      })
      $scope.ework.shippingAmt = $scope.totalPostage;
      return total;
    }
    else if(!eworks){
      // console.log(ework6)
      // console.log(ework.MRP)
      ework6.SubTotal1 = ework6.Account;
      $scope.ework.TotalPriceAmt = Number($scope.ework.TotalPriceAmt) + Number(ework6.Account) + Number(ework.MRP);
    }
  }

  $scope.shipping = function(worklist){
    // console.log(worklist.ItemPostage)
    // console.log(worklist.Quantity)
    if(worklist.ItemPostage != null && worklist.Quantity != null){
      $scope.woshow2=true;
    }
    else{
      $scope.woshow2=false;
    }
  }
  $scope.AddWorkOrder = function(){
    $scope.woshow=false;
    $scope.woshow2=false;
    $scope.wohide1=false;
    $scope.addworkorder=true;
    $scope.showworkorder=true;
  }
  $scope.AddMemberWorkorder = function(work){
    $http({
      method : 'POST',
      url : '/addmemberworkorder',
      data : work
    }).then(function success(response){
      $scope.workorders = response.data.personaldata[0];
      // $scope.ework.DueDate = $filter('date')( response.data.details[0].DueDate, 'MM/dd/yyyy');
      var type = $scope.workorders.Type;
        // console.log(type)
        var type1 = type.toUpperCase();
        // console.log(type1);
        if(type1 == 'MEDIA' || type1 == 'VIDEO JUDGE' || type1 == 'INACTIVE'){
          $scope.woshow=false;
          $scope.wohide1=true;
          $scope.showworkorder=false;
          alert(type1+ 'members do not have access to breeder services.  Please upgrade membership through member payments"')
        }
        else{
          $scope.woshow=true;
          $scope.woshow2=false;
          $scope.wohide1=false;
          $scope.showworkorder=true;
          $scope.headings = response.data.headings;
          $scope.worklists = response.data.listdata;
          $scope.id1 = response.data.id;
          $scope.fname1 = response.data.fname;
          $scope.lname1 = response.data.lname;
            // console.log($scope.work)
          }
        },function error(response){
          // alert('Error occured. Please try again later!');
        })
  } 
  $scope.countQP = function(worklist,workorders){
    if(!worklist.Quantity || !worklist.Price){
      worklist.SubTotal = 0;
    }
    else{
      if(worklist.ItemPostageType == 'Order' && worklist.checktype==true){
        worklist.SubTotal = (worklist.Quantity * worklist.Price) + worklist.ItemPostage;
        var total = 0;
        angular.forEach($scope.worklists,function(data){
          total += (data.Price * data.Quantity) + data.ItemPostage;

          if(worklist.Quantity == 0 && total == 0) {
            // console.log('if')
            $scope.workorders.TotalPriceAmt=total;
            $scope.workorders.HandlingAmt = total.toFixed(2);
          }else{
            // console.log('else')
            $scope.workorders.HandlingAmt = total * 0.02;
            $scope.workorders.TotalPriceAmt=total + $scope.workorders.HandlingAmt.toFixed(2);
          }
        })
        return total;
      }
      else{
        worklist.SubTotal = worklist.Quantity * worklist.Price;
        var total = 0;
        angular.forEach($scope.worklists,function(data){
          total += (data.Price * data.Quantity) + data.ItemPostage;

          if(worklist.Quantity == 0 && total == 0) {
            $scope.workorders.TotalPriceAmt=total;
            $scope.workorders.HandlingAmt = total;
          }else{
            $scope.workorders.HandlingAmt = total * 0.02;
            $scope.workorders.TotalPriceAmt=total + $scope.workorders.HandlingAmt;
          }
        })
        return total;
      }
    }

  }
    
      $scope.addTotal = function() {
      $scope.ework.HandlingAmt = $scope.ework.storeTotal * 0.02;
    
      $scope.ework.TotalPrice = $scope.ework.storeTotal + $scope.ework.HandlingAmt
      }
  $scope.InsWorkOrder = function(workorders){
    $http({
      method : 'POST',
      url : '/insertworkorder',
      data : workorders
    }).then(function success(response){
      alert('Added Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.InsWorkOrder2 = function(worklists){
    $http({
      method : 'POST',
      url : '/insertworkorder2',
      data : worklists
    }).then(function success(response){
      alert('Updated Successfully');
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.StatusDropdown = function(){
    $http({
      method : 'GET',
      url : '/statusdata'
    }).then(function success(response){
      $scope.status = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EditMemberWorkorder = function(ework){
    // console.log(ework)
    $http({
      method : 'POST',
      url : '/editmemberworkorder',
      data : work
    }).then(function success(response){
      alert('Updated Successfully')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ResetWorkOrder = function(wo){
    $scope.wo = {};
  }
  $scope.ChangeValue =function(eworks,ework,ework6){
    // console.log(eworks)
    // console.log(ework)
    // console.log(ework6)
    if(!ework6){
      eworks.SubTotal = eworks.Price * eworks.Quantity;
      var total = 0;
      angular.forEach($scope.ework1,function(data){
        total +=data.Price * data.Quantity;

        if(eworks.Quantity == 0 && total == 0) {
          $scope.ework.TotalPriceAmt=total;
          $scope.ework.HandlingAmt = total;
        }else{
          $scope.ework.HandlingAmt = total * 0.02;
          $scope.ework.TotalPriceAmt= total + $scope.ework.HandlingAmt;
          if ($scope.Account != undefined) 
          {
            $scope.ChangeUpgrade(test,ework);
          }
        }
      })
      return total;
    }
    else if(!eworks){
      // console.log(ework6)
      // console.log(ework.MRP)
      ework6.SubTotal1 = ework6.Account;
      $scope.ework.TotalPriceAmt = Number($scope.ework.TotalPriceAmt) + Number(ework6.Account) + Number(ework.MRP);
    }
  }
  $scope.updateShipping = function(){
// $scope.ework.TotalPriceAmt =  $scope.ework.TotalPriceAmt + Number($scope.ework.ShippingAmt)
$scope.ework.storeTotal = $scope.ework.TotalPriceAmt - $scope.ework.HandlingAmt
  }
});
//-------------------------------------------------Custom Payments-------------------------
app.controller('CPaymentsController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
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
  $scope.PaymentLink = function(cpay){
  $http({
    method : 'POST',
    url : '/paymentlink',
    data : cpay
  }).then(function success(response){
    alert('Email Sent Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
});


//-------------------------------------------------Group Custom Payments-------------------------
app.controller('GCPaymentsController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
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
  $scope.PaymentGCLink = function(gcpay){
  $http({
    method : 'POST',
    url : '/gcpaymentlink',
    data : gcpay
  }).then(function success(response){
    alert('Email Sent Successfully');
    $scope.gcpay = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
});
//-----------------------------------------------------------Add Animal-------------------------------------------------------------
app.controller('animalController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$timeout){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', false)
  .withOption('searching', false)
  .withOption('info', false)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.curPage = 0;
$scope.pageSize = 10;
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
      $scope.searchanimallist.MemberNumber = selected;
      $scope.addanimal.breederno = selected
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
$scope.searchanimal = function(searchanimallist){
    // console.log(searchanimallist)
    $http({
      method : 'POST',
      url : '/searchanimaldata',
      data : {searchanimallist : $scope.searchanimallist,page : $scope.curPage, pageSize : $scope.pageSize, search : $scope.vm ? $scope.vm.Search : ''}
    }).then(function success(response){
      $scope.animallist = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
    $scope.numberOfPages = function() {
      if($scope.animallist && $scope.animallist[0].xCount){
      return Math.ceil($scope.animallist[0].xCount / $scope.pageSize);
      }
    };

  }
$scope.searchEditAnimal = function() {
  $scope.curPage = 0;
  $scope.pageSize = 10;
  $scope.searchanimal();
}
  $scope.resetSearchAnimal = function(searchanimallist){
    $scope.searchanimallist = {};
    $scope.salength = {};
    $scope.animallist = [];
  }
});
//-----------------------------------------------------------Search Member-------------------------------------------------------------
app.controller('memberController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$window){

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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.getactivedata = function(aimembers){
    $http({
      method : 'POST',
      url : '/activememberdata',
      data : aimembers
    }).then(function success(response){
      $scope.aimembers = {};
      $scope.activemember = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.InactiveMember = function(active){
    $http({
      method : 'POST',
      url : '/memberinactive',
      data : active
    }).then(function success(response){
      alert('Inactivated')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddMemberData = function(newmember){
    // console.log(newmember);
    $http({
      method : 'POST',
      url : '/addmemberdata',
      data : newmember
    }).then(function success(response){
      alert('Member Added Successfully');
      $scope.newmember = {};
      $scope.MemberNumber = response.data[0].MemberNumber;
      // console.log($scope.MemberNumber);
      $window.location.href = '#!memberprofile/'+$scope.MemberNumber;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ResetAddMember = function(newmember){
    $scope.newmember = {};
  }
});
//-----------------------------------------------------------Search Animal-------------------------------------------------------------
app.controller('SearchAnimalController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$timeout){

  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', false)
  .withOption('searching', false)
  .withOption('info', false)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.curPage = 1;
  $scope.pageSize = 10;
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
        $scope.animallist.MemberName = selected;
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
$scope.Breeder = function(addanimal){
  // console.log(addanimal)
  $scope.addanimal.breeder = addanimal.memberno
}
$scope.SearchBreeder1 = function(val){
  if(val==''){
    $scope.isSelected = false;
  }
  else{
    // console.log(val)
    $scope.isSelected1 = true;
    $http({
      method : 'POST',
      url : '/searchbreeder',
      data : {text : val}
    }).then(function success(response){
      // console.log(response.data)
      $scope.items = response.data
      $scope.selectItem1 = function(selected) {
        $scope.animallist.Breeder = selected;
        $timeout(function() {
          $scope.isSelected1 = false;
        });

      }
      $scope.queryUpdated = function() {
        $scope.isSelected1 = false;
      }
    },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
}
$scope.AnimalSearch = function(curPage){
  $scope.curPage = curPage
  $http({
    method : 'POST',
    url : '/searchfullanimaldata',
    data : {animallist: $scope.animallist,page : $scope.curPage, pageSize : $scope.pageSize , search : $scope.vm ? $scope.vm.Search : ''}
  }).then(function success(response){
    // $scope.animallist = {};
    $scope.animalfulldata = response.data
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
    $scope.numberOfPages = function() {
      if($scope.animalfulldata && $scope.animalfulldata[0].xCount){
      return Math.ceil($scope.animalfulldata[0].xCount / $scope.pageSize);
      }
    };
}
$scope.searchAnimalInput = function(){
  $scope.curPage = 1;
  $scope.pageSize = 10;
  $scope.AnimalSearch($scope.curPage);
}
$scope.ResetSearchAni = function(animallist){
  $scope.animallist = {};
  $scope.animalfulldata = {};
}
});

//-----------------------------------------------------------Search Edit Member-------------------------------------------------------------
app.controller('SearchEditMember', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$routeParams,$route,$window){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.RegNo=$routeParams.id
  $scope.MemberNo=$routeParams.no;
  // console.log($scope.MemberNo);
  $scope.ShowAll = function(searchedit){
    $http({
      method : 'POST',
      url : '/showalldata',
      data : searchedit
    }).then(function success(response){
      $scope.inventorydata = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })

  }
  $scope.SearchEditMemberData = function(searchedit){
    $http({
      method : 'POST',
      url : '/searcheditmembersdata',
      data : searchedit
    }).then(function success(response){
      $scope.searchedits = response.data.a;
      $scope.salength = response.data.a.length;
      // console.log($scope.salength)
      $scope.inventorydata =  response.data.b;
      $scope.previousdata =  response.data.c;
      $scope.credentials = response.data.d;
      $scope.emails = response.data.e;
      // console.log(emails)
      $scope.emailnotifications = response.data.f;
      $scope.partners = response.data.g;
      $scope.deceaseddata = response.data.h;
      // console.log($scope.partners)
      $scope.searchedit = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.TrasferOwner = function(){
    $scope.transfer = true;
  }
  $scope.SearchTransferOwner = function(searchowner,editanimal){
    $http({
      method : 'POST',
      url : '/searchtransferowner',
      data : {details:searchowner,id:editanimal}
    }).then(function success(response){
      $scope.searchowner = {};
      $scope.stos = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.TransferOwnerName = function(sto,editanimal){
    // console.log(sto.MemberNumber);
    // console.log(editanimal.MemberNo);
    if(sto.MemberNumber == editanimal.MemberNo){
      alert('The selected owner is the same as the previous owner')
    }
    else{
      $http({
        method : 'POST',
        url : '/transferownername',
        data : {details:sto,num:editanimal}
      }).then(function success(response){
        alert('Transfered')
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  }
  $scope.ShowAll = function(msearch){
    $http({
      method : 'POST',
      url : '/showalldata',
      data : msearch
    }).then(function success(response){
      $scope.inventorydata = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })

  }
  $scope.SearchEditMemberData1 = function(){
    $http({
      method : 'POST',
      url : '/searcheditmembersdata1',
      data : {MemberNumber:$scope.MemberNo}
    }).then(function success(response){
      // console.log(response.data)
      $scope.searchedits = response.data.a;
      $scope.salength = response.data.a.length;
      $scope.inventorydata =  response.data.b;
      $scope.previousdata =  response.data.c;
      $scope.credentials = response.data.d;
      $scope.emails = response.data.e;
      // console.log(emails)
      $scope.emailnotifications = response.data.f;
      $scope.partners = response.data.g;
      // console.log($scope.partners)
      $scope.searchedit = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddEarnings = function(addearnings,editanimal){
    $http({
      method : 'POST',
      url : '/addearningsdata',
      data : {addearnings : addearnings,editanimal : editanimal}
    }).then(function success(response){
      // alert('Added Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateEarning = function(earning){
    $http({
      method : 'POST',
      url : '/updateaniearning',
      data : earning
    }).then(function success(response){
      alert('Updated Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteAnimalEarning = function(earning){
    $http({
      method : 'POST',
      url : '/deleteanimalearning',
      data : earning
    }).then(function success(response){
      alert('Removed Successfully')
      var index = $scope.earnings.indexOf(earning);
      $scope.earnings.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteDNAPan = function(dnapan){
    $http({
      method : 'POST',
      url : '/deletednapan',
      data : dnapan
    }).then(function success(response){
      alert('Removed Successfully')
      var index = $scope.dnapanel.indexOf(dnapan);
      $scope.dnapanel.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.CheckSingle = function(single,editanimal,number){
    // console.log(number);
    $http({
      method : 'POST',
      url : '/checksingle',
      data : {reg : editanimal, txtreg : single, num : number}
    }).then(function success(response){
      $scope.dnapanel = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.Updateprint = function(reg){
    $http({
      method : 'POST',
      url : '/updateprintanimal',
      data : reg
    }).then(function success(response){

    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddtoNewList = function(addlist,reg){
    // console.log(number);
    $http({
      method : 'POST',
      url : '/addtonewlist',
      data : {list : addlist, regno : reg}
    }).then(function success(response){
      alert('Added Successfully')
    },function error(response){
      alert('Quick List Name Already Exists');
    })
  }
  $scope.AddtoNewList1 = function(quicklist,reg){
    // console.log(number);
    $http({
      method : 'POST',
      url : '/addtonewlist1',
      data : {list : quicklist, regno : reg}
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddtoNewList2 = function(quicklist,reg){
    // console.log(number);
    $http({
      method : 'POST',
      url : '/addtonewlist2',
      data : {list : quicklist, regno : reg}
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.GetMemQuickList = function(){
    $http({
      method : 'GET',
      url : '/getmemquicklist'
    }).then(function success(response){
      $scope.members = response.data.member;
      $scope.lists = response.data.list;
      // console.log($scope.mirs)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchTransferOwner = function(searchowner,editanimal){
    $http({
      method : 'POST',
      url : '/searchtransferowner',
      data : {details:searchowner,id:editanimal}
    }).then(function success(response){
      $scope.searchowner = {};
      $scope.stos = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.TransferOwnerName = function(sto,editanimal){
    // console.log(sto.MemberNumber);
    // console.log(editanimal.MemberNo);
    if(sto.MemberNumber == editanimal.MemberNo){
      alert('The selected owner is the same as the previous owner')
    }
    else{
      $http({
        method : 'POST',
        url : '/transferownername',
        data : {details:sto,num:editanimal}
      }).then(function success(response){
        alert('Transfered')
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  }
  $scope.UpdateFullAnimalData2 = function(editanimal){
    $http({
      method : 'POST',
      url : '/updatefullanimaldata',
      data : editanimal
    }).then(function success(response){
      alert('Updated Successfully');
      $window.location.href = '#!addnewanimal';
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateFullAnimalData = function(editanimal){
    $http({
      method : 'POST',
      url : '/updatefullanimaldata',
      data : editanimal
    }).then(function success(response){
      alert('Updated Successfully');
      $window.location.href = '#!editanimal';
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SavePedigree = function(pedigreepanel,editanimal){
    $http({
      method : 'POST',
      url : '/savepedigree',
      data : {pedigreepanel:pedigreepanel,editanimal:editanimal}
    }).then(function success(response){
      alert('Saved Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SoldAnimal = function(editanimal){
    // console.log(editanimal)
    $http({
      method : 'POST',
      url : '/soldanimals',
      data : editanimal
    }).then(function success(response){
      alert('Animal Sold Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeceasedAnimal = function(editanimal){
    // console.log(editanimal)
    $http({
      method : 'POST',
      url : '/deceasedanimals',
      data : editanimal
    }).then(function success(response){
      alert('Animal Status Changed to Deceased Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EditAnimalsfullData = function(){
    $scope.transfer = false;
    $scope.hidepanel = true;
    $scope.hidepanel5 = false;
    let RegNo = $routeParams.id
    $http({
      method : 'POST',
      url : '/editanimalsdata',
      data : {RegNo : RegNo}
    }).then(function success(response){
      $scope.editanimal = response.data.a[0];
      $scope.editanimal.Dateregestered = response.data.a[0].Dateregestered
      $scope.editanimal.Submitted = response.data.a[0].Submitted
      $scope.editanimal.Lastupdate = response.data.a[0].Lastupdate
      $scope.editanimal.BirthDate = response.data.a[0].BirthDate
      $scope.memberpanel = response.data.b[0];
      $scope.pedigreepanel = response.data.c[0];
      $scope.dnapanel = response.data.d;
      $scope.previousowner = response.data.e;
      $scope.offspring = response.data.f;
      $scope.eidinformation = response.data.g;
      $scope.earnings = response.data.h;
      // $scope.earning.EventDate = response.data.h.EventDate
      $scope.regno = response.data.a[0].RegNo;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EditAnimalsfullData2 = function(inventory){
    // console.log(inventory)
    $scope.transfer = true;
    $scope.hidepanel = true;
    $scope.hidepanel5 = false;
    $http({
      method : 'POST',
      url : '/editanimalsdata',
      data : inventory
    }).then(function success(response){
      $scope.editanimal = response.data.a[0];
      $scope.editanimal.Dateregestered = response.data.a[0].Dateregestered
      $scope.editanimal.Submitted = response.data.a[0].Submitted
      $scope.editanimal.Lastupdate = response.data.a[0].Lastupdate
      $scope.editanimal.BirthDate = response.data.a[0].BirthDate
      $scope.memberpanel = response.data.b[0];
      $scope.pedigreepanel = response.data.c[0];
      $scope.dnapanel = response.data.d;
      $scope.previousowner = response.data.e;
      $scope.offspring = response.data.f;
      $scope.eidinformation = response.data.g;
      $scope.earnings = response.data.h;
      // $scope.earning.EventDate = response.data.h.EventDate
      $scope.regno = response.data.a[0].RegNo;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchPedigree1 = function(editanimal){
    $http({
      method : 'POST',
      url : '/searchpedigree1',
      data : editanimal
    }).then(function success(response){
      // alert('Email Sent')
      $scope.pedigree10=response.data[0];
    },function error(response){
      // alert('Email Not Sent')
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
  $scope.SoldAnimal = function(editanimal){
    // console.log(editanimal)
    $http({
      method : 'POST',
      url : '/soldanimals',
      data : editanimal
    }).then(function success(response){
      alert('Animal Sold Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchPedigree = function(){
    // console.log($scope.RegNo)
    window.open('../pedigree?id=' + $scope.RegNo,'_blank');
    $http({
      method : 'POST',
      url : '/searchpedigree',
      data : {RegNo : $scope.RegNo}
    }).then(function success(response){
      // alert('Email Sent')
      $scope.pedigree10=response.data[0];
      console.log($scope.pedigree10,'datatatata')
    },function error(response){
      // alert('Email Not Sent')
    })
  }
  $scope.DeceasedAnimal = function(editanimal){
    // console.log(editanimal)
    $http({
      method : 'POST',
      url : '/deceasedanimals',
      data : editanimal
    }).then(function success(response){
      alert('Animal Status Changed to Deceased Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.editPartners = function(editprt){
    // console.log($scope.editprt)
    $http({
      method : 'POST',
      url : '/editpartnerdata',
      data : editprt
    }).then(function success(response){
      alert('Updated Successfully');
      $scope.editprt = {};
      $scope.partners = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ViewPartners = function(searchedit){
    $http({
      method : 'POST',
      url : '/viewpartners',
      data : searchedit
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.getpartnerdata = function(part){
    $http({
      method : 'POST',
      url : '/getpartnerdata',
      data : part
    }).then(function success(response){
      $scope.editprt = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.RemovePartners = function(part){
    // console.log(partners)
    $http({
      method : 'POST',
      url : '/removepartners',
      data : part
    }).then(function success(response){
      alert('Deleted Successfully');
      var index = $scope.partners.indexOf(part);
      $scope.partners.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.HidePanel = function(){
    $scope.hidepanel = true;
    $scope.hidepanel5=true;
  }
  $scope.ExitHidePanel = function(){
    $scope.hidepanel = true;
    $scope.hidepanel5=true;
    $scope.transfer = false;
    $scope.searchedit = {};
  }
  $scope.HidePanel1 = function(){
    $scope.hidepanel = false;
    $scope.hidepanel5 = false;
  }
  $scope.HidePanel2 = function(){
    $scope.hidepanel = false;
    $scope.hidepanel2=true;
    $scope.hidepanel5 = false;
  }
  $scope.HidePanel3 = function(){
    $scope.hidepanel = false;
    $scope.hidepanel3=true;
    $scope.hidepanel5 = false;
  }
  $scope.SearchUpdateMemberData = function(searchedit){
    $http({
      method : 'POST',
      url : '/searchupdatemembersdata',
      data : searchedit
    }).then(function success(response){
      $scope.searchedit = {};
      alert('Updated Successfully')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SendUpdateMemberData = function(searchedit){
    $http({
      method : 'POST',
      url : '/updatesendmail',
      data : searchedit
    }).then(function success(response){
      $scope.searchedit = {};
      alert('Updated Successfully')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ResetSearchAnimal = function(searchedit){
    $scope.searchedit = {};
    $scope.salength = {};
  }
});
//-----------------------------------------------------------Search work order-------------------------------------------------------------
app.controller('SearchWorkOrderController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$filter,$timeout){

  $scope.renewalEnabled = false;
  var current_datetime = new Date()
  var formatted_date = (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate() + "/" + current_datetime.getFullYear()
  $scope.currentdate = formatted_date;
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('searching', false)
  .withOption('paging', false)
  .withOption('info', false)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  // {
  //   extend:    'print',
  //   text:      '<i class="fa fa-print" aria-hidden="true"></i> Print',
  //   titleAttr: 'Print'
  // },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  }
  ]
  )
  ;
$scope.sameAsBilling = false;
$scope.totalItemPostage = 0;
$scope.curPage = 0;
$scope.pageSize = 10;
$scope.sameAsBillingInfo = function() {
  if($scope.sameAsBilling){
  $scope.workorders.ShippingFirstName = $scope.workorders.FirstName;
  $scope.workorders.ShippingLastName = $scope.workorders.LastName;
  $scope.workorders.ShippingCity = $scope.workorders.City;
  $scope.workorders.ShippingState = $scope.workorders.state;
  $scope.workorders.ShippingZip = $scope.workorders.Zip;
  $scope.workorders.ShippingCountry = $scope.workorders.Country;
  $scope.workorders.ShippingAddress = $scope.workorders.Address;
  } else {
    $scope.workorders.ShippingFirstName = ''
    $scope.workorders.ShippingLastName = ''
    $scope.workorders.ShippingCity = ''
    $scope.workorders.ShippingState = ''
    $scope.workorders.ShippingZip = ''
    $scope.workorders.ShippingCountry = '' 
    $scope.workorders.ShippingAddress = ''
  }
}
  $scope.GetWorkOrder = function(woor){
  // console.log(woor)
  $scope.showworkorder =true;
  $scope.editworkorder = false;
  $scope.addworkorder = false;
  $scope.eworkorderform1 = false;
  $scope.eworkorderform2 = false;
  $scope.isHide1 = true;
  $scope.additional = false;
  $http({
    method : 'POST',
    url : '/editmemberpayment1',
    data : woor
  }).then(function success(response){
    if(response.data.emps){
        $scope.emps = response.data.emps[0];
      }
      if(response.data.merchand){
        $scope.merchands = response.data.merchand;
      }
      if(response.data.shipping){
        $scope.shipping = response.data.shipping[0];
      }
      if(response.data.wods){
        $scope.wods = response.data.wods[0];
      }
      if(response.data.wom){
        $scope.wom = response.data.wom;
      }
      if(response.data.wotable1){
        $scope.wotable1 = response.data.wotable1;
      }
      if(response.data.animaltab){
        $scope.animaltab = response.data.animaltab;
      }
      if(response.data.eventdata){
        $scope.eventdata = response.data.eventdata[0];
      }
      if(response.data.eventtable){
        $scope.eventtable = response.data.eventtable;
      }
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.HideAdditional=function(emps){
    $scope.isHide1=false;
    $scope.additional = true;
    $scope.addanimal = false;
    $http({
      method : 'POST',
      url : '/getadditionalinfo',
      data : emps
    }).then(function success(response){
      $scope.gais = response.data[0];
      $scope.tgais = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.MakePayment = function(){
    $scope.pay = true;
    $scope.editworkorder = false;
  }
  $scope.MakePayment5 = function(){
    $scope.pay5 = true;
    $scope.addworkorder = false;
    $scope.workorders = $scope.workorders.Status ? $scope.workorders : {...$scope.workorders,Status : 'Open'}  
    if($scope.workorders.ShippingAmt > 0) {
    $scope.workorders.TotalPriceAmt = $scope.workorders.TotalPriceAmt;
    $scope.workorders.storeTotal = $scope.workorders.TotalPriceAmt - $scope.workorders.HandlingAmt - $scope.workorders.shippingAmt
    } else {
    $scope.workorders.storeTotal = $scope.workorders.TotalPriceAmt - $scope.workorders.HandlingAmt
    }
  }
  $scope.AddAni=function(emps){
    $scope.isHide1=false;
    $scope.additional = true;
    $scope.addanimal = false;
    $http({
      method : 'POST',
      url : '/getadditionalinfo',
      data : emps
    }).then(function success(response){
      $scope.gais = response.data[0];
      $scope.tgais = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ExitAddPay=function(emps){
    $scope.showworkorder =true;
    $scope.editworkorder = false;
    $scope.addworkorder = false
    $scope.eworkorderform2 = false;
    $scope.isHide1=false;
    $scope.additional = false;
    $scope.addanimal = false;
  }
  $scope.ExitAdditional=function(emps){
    $scope.isHide1=true;
    $scope.additional = false;
    $scope.addanimal = false;
    $scope.eworkorderform2 = false;
  }
  $scope.ExitAddAni=function(emps){
    $scope.isHide1=true;
    $scope.addanimal = false;
    $scope.additional = false;
  }
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
        $scope.wo.member = selected;
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
$scope.StatusDropdown = function(){
  $http({
    method : 'GET',
    url : '/statusdata'
  }).then(function success(response){
    $scope.status = response.data
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.updatecontains = function(){
  $http({
    method : 'GET',
    url : '/containdata'
  }).then(function success(response){
    $scope.contains = response.data
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.assignedto = function(){
  $http({
    method : 'GET',
    url : '/assignedtodata'
  }).then(function success(response){
    $scope.assigned = response.data
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.SearchWorkOrder = function(wo){
  $http({
    method : 'POST',
    url : '/searchworkdata',
    data : wo
  }).then(function success(response){
    $scope.wodata = response.data
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.SearchWorkOrder1 = function(){
   
  $http({
    method : 'POST',
    url : '/searchworkdata1',
    data : {page : $scope.curPage, pageSize : $scope.pageSize,search : $scope.vm.Search}
  }).then(function success(response){
    $scope.wodata = response.data
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
    $scope.numberOfPages = function() {
      if($scope.wodata && $scope.wodata[0].xCount){
      return Math.ceil($scope.wodata[0].xCount / $scope.pageSize);
      }
    };
}
$scope.searchWorkorder = function () {
  $scope.curPage = 0;
  $scope.pageSize = 10;
  $scope.SearchWorkOrder1();
}
$scope.SameAddress = function(sameasabove) {
    // console.log(sameasabove)
    if(sameasabove){
      $scope.ework.ShippingFirstName = angular.copy($scope.ework.FirstName);
      $scope.ework.ShippingLastName = angular.copy($scope.ework.LastName);
      $scope.ework.ShippingCity = angular.copy($scope.ework.BillingCity);
      $scope.ework.ShippingState = angular.copy($scope.ework.BillingState);
      $scope.ework.ShippingZip = angular.copy($scope.ework.BillingZip);
      $scope.ework.ShippingCountry = angular.copy($scope.ework.BillingCountry);
      $scope.ework.ShippingAddress = angular.copy($scope.ework.BillingAddress);
    } else {
      $scope.ework.ShippingFirstName = "";
      $scope.ework.ShippingLastName = "";
      $scope.ework.ShippingCity = "";
      $scope.ework.ShippingState = "";
      $scope.ework.ShippingZip = "";
      $scope.ework.ShippingCountry = "";
      $scope.ework.ShippingAddress = "";
    }
  };
$scope.EditWorkOrder = function(wor){
  $scope.showworkorder = true;
  $scope.addworkorder = false;
  $scope.editworkorder = true;
  $http({
    method : 'POST',
    url : '/editworkorder',
    data : wor
  }).then(function success(response){
    $scope.ework = response.data.details[0];
    $scope.ework.CreatedDate = $filter('date')( response.data.details[0].CreatedDate, 'MM/dd/yyyy');
    $scope.ework.DueDate = $filter('date')( response.data.details[0].DueDate, 'MM/dd/yyyy');
    $scope.ework1 = response.data.table;
    $scope.id = response.data.id;
    $scope.fname = response.data.fname;
    $scope.lname = response.data.lname;
    $scope.heading = response.data.headings;
    if($scope.ework.MembershipRenewalPrice !=null){
      $scope.renewalEnabled = true;
    }

  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.updateRenewalPrice = function(){
  $scope.renewalEnabled = !$scope.renewalEnabled;
  if($scope.ework.MembershipRenewalPrice!=null && !$scope.renewalEnabled){
   $scope.ework.TotalPriceAmt = $scope.ework.TotalPriceAmt - $scope.ework.MRP
  } 
  if($scope.ework.MembershipRenewalPrice == null && $scope.renewalEnabled) {
   $scope.ework.TotalPriceAmt = $scope.ework.TotalPriceAmt + $scope.ework.MRP

  }
}
$scope.UpdateWorkOrder = function(ework1){
  $http({
    method : 'POST',
    url : '/updateworkorder',
    data : ework1
  }).then(function success(response){
    alert('Updated Successfully');
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.UpdateWorkOrder3 = function(ework,pay){
    // console.log(ework)
    $http({
      method : 'POST',
      url : '/updateworkorder3',
      data : {ework:ework,pay:pay}
    }).then(function success(response){
      alert(response.data.msg);
    },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
$scope.UpdateWorkOrder1 = function(ework){
    // console.log(ework)
    $http({
      method : 'POST',
      url : '/updateworkorder1',
      data : ework
    }).then(function success(response){
      alert('Updated Successfully');
    },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.UpdateWorkOrder2 = function(ework1,ework){
    $http({
      method : 'POST',
      url : '/updateworkorder2',
      data : {ework1 : ework1, ework : ework}
    }).then(function success(response){
        // alert('Updated Successfully');
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.ChangeValue =function(eworks,ework,ework6){
    // console.log(eworks)
    // console.log(ework)
    // console.log(ework6)
    if(!ework6){
      eworks.SubTotal = ( eworks.Quantity *  eworks.Price ) +  eworks.ItemPostage;
      var total = 0;
      $scope.totalItemPostage = 0;
      angular.forEach($scope.ework1,function(data){
        total +=data.Quantity * ( data.Price + data.ItemPostage);
        $scope.totalItemPostage += data.ItemPostage;
        if(eworks.Quantity == 0 && total == 0) {
          $scope.ework.TotalPriceAmt=total;
          $scope.ework.HandlingAmt = total;
        }else{
          $scope.ework.HandlingAmt = total * 0.02;
          $scope.ework.TotalPriceAmt= total + $scope.ework.HandlingAmt;
          if ($scope.Account != undefined) 
          {
            $scope.ChangeUpgrade(test,ework);
          }
        }
      })
      $scope.workorders.shippingAmt = $scope.totalItemPostage;
      return total;
    }
    else if(!eworks){
      // console.log(ework6)
      // console.log(ework.MRP)
      ework6.SubTotal1 = ework6.Account;
      $scope.ework.TotalPriceAmt = Number($scope.ework.TotalPriceAmt) + Number(ework6.Account) + Number(ework.MRP);
    }
  }

  $scope.shipping = function(worklist){
    // console.log(worklist.ItemPostage)
    // console.log(worklist.Quantity)
    if(worklist.ItemPostage != null && worklist.Quantity != null){
      $scope.woshow2=true;
    }
    else{
      $scope.woshow2=false;
    }
  }
  $scope.AddWorkOrder = function(){
    $scope.woshow=false;
    $scope.woshow2=false;
    $scope.wohide1=false;
    $scope.addworkorder=true;
    $scope.showworkorder=true;
  }
  $scope.AddMemberWorkorder = function(work){
    $http({
      method : 'POST',
      url : '/addmemberworkorder',
      data : work
    }).then(function success(response){
      $scope.workorders = response.data.personaldata[0];
      // $scope.ework.DueDate = $filter('date')( response.data.details[0].DueDate, 'MM/dd/yyyy');
      var type = $scope.workorders.Type;
        // console.log(type)
        var type1 = type.toUpperCase();
        // console.log(type1);
        if(type1 == 'MEDIA' || type1 == 'VIDEO JUDGE' || type1 == 'INACTIVE'){
          $scope.woshow=false;
          $scope.wohide1=true;
          $scope.showworkorder=false;
          alert(type1+ 'members do not have access to breeder services.  Please upgrade membership through member payments"')
        }
        else{
          $scope.woshow=true;
          $scope.woshow2=false;
          $scope.wohide1=false;
          $scope.showworkorder=true;
          $scope.headings = response.data.headings;
          $scope.worklists = response.data.listdata;
          $scope.id1 = response.data.id;
          $scope.fname1 = response.data.fname;
          $scope.lname1 = response.data.lname;
            // console.log($scope.work)
          }
        },function error(response){
          // alert('Error occured. Please try again later!');
        })
  } 
  $scope.countQP = function(worklist,workorders){
    if(!worklist.Quantity || !worklist.Price){
      worklist.SubTotal = 0;
    }
    else{
      if(worklist.ItemPostageType == 'Order' && worklist.checktype==true){
        worklist.SubTotal = ( worklist.Quantity * worklist.Price ) + worklist.ItemPostage;
        var total = 0;
        $scope.totalItemPostage = 0;
        angular.forEach($scope.worklists,function(data){
          total +=data.Quantity * (data.Price + data.ItemPostage);
          $scope.totalItemPostage += data.ItemPostage;
          if(worklist.Quantity == 0 && total == 0) {
            // console.log('if')
            $scope.workorders.TotalPriceAmt=total;
            $scope.workorders.HandlingAmt = total
          }else{
            // console.log('else')
            $scope.workorders.HandlingAmt = total * 0.02;
            $scope.workorders.TotalPriceAmt=total + $scope.workorders.HandlingAmt
          }
        })
        $scope.workorders.shippingAmt = $scope.totalItemPostage;
        return total;
      }
      else{
        worklist.SubTotal = ( worklist.Quantity * worklist.Price ) + worklist.ItemPostage;
        
        var total = 0;
        $scope.totalItemPostage = 0;
        angular.forEach($scope.worklists,function(data){
          total +=data.Quantity * (data.Price + data.ItemPostage);
          $scope.totalItemPostage += data.ItemPostage;
          if(worklist.Quantity == 0 && total == 0) {
            $scope.workorders.TotalPriceAmt=total;
            $scope.workorders.HandlingAmt = total
          }else{
            $scope.workorders.HandlingAmt = total * 0.02;
            $scope.workorders.TotalPriceAmt=total + $scope.workorders.HandlingAmt
          }
        })
         $scope.workorders.shippingAmt = $scope.totalItemPostage;
        return total;
      }
    }

  }
  $scope.InsWorkOrder = function(workorders){
   $scope.workorders = $scope.workorders.Status ? $scope.workorders : {...$scope.workorders,Status : 'Open'}  
    if($scope.workorders.ShippingAmt > 0) {
    $scope.workorders.TotalPriceAmt = $scope.workorders.TotalPriceAmt;
    $scope.workorders.storeTotal = $scope.workorders.TotalPriceAmt - $scope.workorders.HandlingAmt - $scope.workorders.shippingAmt
    } else {
    $scope.workorders.storeTotal = $scope.workorders.TotalPriceAmt - $scope.workorders.HandlingAmt
    }
    $http({
      method : 'POST',
      url : '/insertworkorder',
      data : $scope.workorders
    }).then(function success(response){
      alert('Added Successfully');
      $scope.InsWorkOrder2($scope.worklists);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.addDiscount = function(payment) {
if(payment.Payment && payment.Payment === 'eCheck' ||payment.Payment && payment.Payment === 'other') { 
  if($scope.workorders.ShippingAmt > 0) {

    $scope.workorders.storeTotal = $scope.workorders.TotalPriceAmt - $scope.workorders.HandlingAmt - $scope.workorders.ShippingAmt
  } else {
    $scope.workorders.storeTotal = $scope.workorders.TotalPriceAmt - $scope.workorders.HandlingAmt

  }
}
  }

  $scope.calculateTotal = function(workorders) {
  $scope.workorders.HandlingAmt = $scope.workorders.storeTotal * 0.02;

  $scope.workorders.TotalPriceAmt = $scope.workorders.storeTotal + $scope.workorders.HandlingAmt
  }
  $scope.InsWorkOrder5 = function(workorders,pay,worklists){
    let tempA = [];
    worklists.forEach(obj=>{
      if(obj.Quantity!= null || obj.LineId != null) {
        tempA.push(obj);
      }
    })
    $http({
      method : 'POST',
      url : '/insertworkorder5',
      data : {workorders:workorders,pay:pay,worklists:tempA}
    }).then(function success(response){
      $scope.InsWorkOrder2($scope.worklists);
      alert(response.data.msg);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.InsWorkOrder2 = function(worklists){
    console.log('insertworkorder2',worklists)
    $http({
      method : 'POST',
      url : '/insertworkorder2',
      data : $scope.worklists
    }).then(function success(response){
      alert('Updated Successfully');
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.StatusDropdown = function(){
    $http({
      method : 'GET',
      url : '/statusdata'
    }).then(function success(response){
      $scope.status = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EditMemberWorkorder = function(ework){
    // console.log(ework)
    $http({
      method : 'POST',
      url : '/editmemberworkorder',
      data : work
    }).then(function success(response){
      alert('Updated Successfully')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ResetWorkOrder = function(wo){
    $scope.wo = {};
  }
});
//-----------------------------------------------------------Add Animal-------------------------------------------------------------
app.controller('AddAnimalController', function($scope,$http,$timeout,$window){
  $scope.isSelected = true;
  $scope.selectItem = function(selected) {
    $scope.query = selected;
    $timeout(function() {
      $scope.isSelected = true;
    });

  }
  $scope.queryUpdated = function() {
    $scope.isSelected = false;
  }
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
  $scope.CheckDNA = function(addanimal){
      $http({
        method : "POST",
        url : "/checkdna",
        data : addanimal
      }).then(function success(response){
        $scope.dna = response.data[0].CountID;
        if ($scope.dna > 0) {
          // console.log($scope.dna)
          $scope.message = "DNA Number Already Exists";
        }
      }, function error(response){
        alert('Error Occured, Please Try Again !')
      })
  }
  $scope.CheckAnimal = function(addanimal){
    var breed = addanimal.name
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
        url : "/checkanimaldata1",
        data : addanimal
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
  $scope.CheckHerd = function(addanimal){
    $http({
      method : "POST",
      url : "/checkherddata1",
      data : addanimal
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
  $scope.displayModalFunc = function(addanimal){
    console.log('first')
    if(!addanimal.payment && !addanimal.paymentwo) {
    $('#displayModal').modal('show');
    } else {
      $scope.AddAnimalData(addanimal);
    }
  }
  $scope.saveAndAddNew = function(addanimal){
    if(!addanimal.payment && !addanimal.paymentwo) {
      $('#displayModal1').modal('show');
      } else {
       $scope.editModal(addanimal);
      }
  }
  $scope.editModal = function(addanimal){
    console.log('second')
    if(!addanimal.payment && !addanimal.paymentwo){
      // alert("You have added an animal without a Word Order.")
      // $('#displayModal').modal('show');
      $http({
        method : 'POST',
        url : '/addanimaldata',
        data : addanimal
      }).then(function success(response){
        console.log(response.data[0],'yes')
        // alert('Added Successfully');
        $scope.addanimal1 = response.data[0];
        // window.open('/admin/home#!/editanimals/' +$scope.addanimal1.RegNo);
        // $window.location.href = '/editanimals/'+$scope.addanimal1.RegNo;
        $('#displayModal1').modal('hide');
        $('#displayModal').modal('hide');
        $scope.addanimal = {};
        
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    // else if(!addanimal.paymentwo){
    //   // alert("You have added an animal without a Word Order.")
    //   // $('#displayModal').modal('show');
    //   $http({
    //     method : 'POST',
    //     url : '/addanimaldata',
    //     data : addanimal
    //   }).then(function success(response){
    //     // console.log(response.data[0])
    //     // alert('Added Successfully');
    //     $scope.addanimal1 = response.data[0];
    //     // $window.location.href = '/editanimals/'+$scope.addanimal1.RegNo;
    //     // window.open('/admin/home#!/editanimals/' +$scope.addanimal1.RegNo);
    //     $('#displayModal1').modal('hide');
    //     $('#displayModal').modal('hide');
    //     $scope.addanimal = {};
    //     // alert('Added Successfully');
    //   },function error(response){
    //     // alert('Error occured. Please try again later!');
    //   })
    // }
    else{
      $http({
        method : 'POST',
        url : '/addanimaldata',
        data : addanimal
      }).then(function success(response){
        // console.log(response.data[0])
        $scope.addanimal1 = response.data[0];
        $('#displayModal1').modal('hide');
        $('#displayModal').modal('hide');
        $scope.addanimal = {};
        // alert('Added Successfully');
        // $window.location.href = '/editanimals/'+$scope.addanimal1.RegNo;
        // window.open('/admin/home#!/editanimals/' +$scope.addanimal1.RegNo);
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
  }
  $scope.resetModal = function(){
    $scope.reganimal = {};
  }
  $scope.edate = new Date();
  $scope.ldate = new Date();
  $scope.AddAnimalData = function(addanimal){
    if(!addanimal.payment){
      // alert("You have added an animal without a Word Order.")
      // $('#displayModal').modal('show');
      $http({
        method : 'POST',
        url : '/addanimaldata',
        data : addanimal
      }).then(function success(response){
        console.log(response.data[0],'yes')
        // alert('Added Successfully');
        $scope.addanimal1 = response.data[0];
        $('#displayModal').modal('hide');
        $('#displayModal1').modal('hide');
        window.open('/admin/home#!/editanimals/' +$scope.addanimal1.RegNo);
        // $window.location.href = '/editanimals/'+$scope.addanimal1.RegNo;
        // $scope.addanimal = {};
        
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    else if(!addanimal.paymentwo){
      // alert("You have added an animal without a Word Order.")
      // $('#displayModal').modal('show');
      $http({
        method : 'POST',
        url : '/addanimaldata',
        data : addanimal
      }).then(function success(response){
        // console.log(response.data[0])
        // alert('Added Successfully');
        $scope.addanimal1 = response.data[0];
        // $window.location.href = '/editanimals/'+$scope.addanimal1.RegNo;
        $('#displayModal').modal('hide');
        $('#displayModal1').modal('hide');
        window.open('/admin/home#!/editanimals/' +$scope.addanimal1.RegNo);
        // $scope.addanimal = {};
        // alert('Added Successfully');
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    else{
      $http({
        method : 'POST',
        url : '/addanimaldata',
        data : addanimal
      }).then(function success(response){
        // console.log(response.data[0])
        $scope.addanimal1 = response.data[0];
        // $scope.addanimal = {};
        // alert('Added Successfully');
        // $window.location.href = '/editanimals/'+$scope.addanimal1.RegNo;
        $('#displayModal').modal('hide');
        $('#displayModal1').modal('hide');
        window.open('/admin/home#!/editanimals/' +$scope.addanimal1.RegNo);
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
  }
  $scope.ResetAddAnimal = function(addanimal){
    $scope.addanimal = {};
  }
  $scope.Breeder = function(addanimal){
  var breeder = addanimal.memberno;
  var index = breeder.indexOf("-")
  $scope.addanimal.breeder = breeder.split('-')[1];
  // console.log($scope.addanimal.breeder);
}
  $scope.SearchBreeder1 = function(val){
    if(val==''){
      $scope.isSelected = false;
    }
    else{
      $scope.isSelected1 = true;
    // console.log(val)
    $http({
      method : 'POST',
      url : '/searchbreeder',
      data : {text : val}
    }).then(function success(response){
      // console.log(response.data)
      $scope.items = response.data
      $scope.selectItem1 = function(selected) {
        $scope.addanimal.breeder = selected;
        $timeout(function() {
          $scope.isSelected1 = false;
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
        $scope.addanimal.memberno = selected;
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
});
//-----------------------------------------------------------Edit Animal-------------------------------------------------------------
app.controller('EditAnimalController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$routeParams){
  $scope.vm = {};
  $scope.renewalEnabled = false;
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.GetWorkOrder = function(woor){
    // console.log(woor)
  $scope.eworkorderform2 = true
  $scope.eworkorderform1 = false;
  $scope.isHide1 = true;
  $scope.additional = false;
  $http({
    method : 'POST',
    url : '/editmemberpayment1',
    data : woor
  }).then(function success(response){
    if(response.data.emps){
        $scope.emps = response.data.emps[0];
      }
      if(response.data.merchand){
        $scope.merchands = response.data.merchand;
      }
      if(response.data.shipping){
        $scope.shipping = response.data.shipping[0];
      }
      if(response.data.wods){
        $scope.wods = response.data.wods[0];
      }
      if(response.data.wom){
        $scope.wom = response.data.wom;
      }
      if(response.data.wotable1){
        $scope.wotable1 = response.data.wotable1;
      }
      if(response.data.animaltab){
        $scope.animaltab = response.data.animaltab;
      }
      if(response.data.eventdata){
        $scope.eventdata = response.data.eventdata[0];
      }
      if(response.data.eventtable){
        $scope.eventtable = response.data.eventtable;
      }
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.HideAdditional=function(emps){
    $scope.isHide1=false;
    $scope.additional = true;
    $scope.addanimal = false;
    $http({
      method : 'POST',
      url : '/getadditionalinfo',
      data : emps
    }).then(function success(response){
      $scope.gais = response.data[0];
      $scope.tgais = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddAni=function(emps){
    $scope.isHide1=false;
    $scope.additional = true;
    $scope.addanimal = false;
    $http({
      method : 'POST',
      url : '/getadditionalinfo',
      data : emps
    }).then(function success(response){
      $scope.gais = response.data[0];
      $scope.tgais = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ExitAddPay=function(emps){
    $scope.eworkorderform2 = true
    $scope.eworkorderform1 = true;
    $scope.isHide1=false;
    $scope.additional = false;
    $scope.addanimal = false;
  }
  $scope.ExitAdditional=function(emps){
    $scope.isHide1=true;
    $scope.additional = false;
    $scope.addanimal = false;
  }
  $scope.ExitAddAni=function(emps){
    $scope.isHide1=true;
    $scope.addanimal = false;
    $scope.additional = false;
  }
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
  $scope.addregno = false;
  $scope.addregno1 = false;
  $scope.addtolist = true;
  $scope.ShowAddreg = function(val){
    // console.log(val)
    $scope.addregno = true;
    $scope.addregno1 = true;
    $scope.addtolist = true;
    $scope.showregeditadd = val;
  }
  $scope.AddToList = function(){
    $scope.addregno = true;
    $scope.addregno1 = false;
    $scope.addtolist = false;
    $http({
      method : 'GET',
      url : '/displaylist'
    }).then(function success(response){
      $scope.quicklists = response.data
      // console.log($scope.quicklists)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AdminUserData = function(){
    $http({
      method : 'GET',
      url : '/adminuserdata'
    }).then(function success(response){
      $scope.uname = response.data.fname+" "+response.data.lname;
      $scope.image = response.data.image;
      $scope.id = response.data.id;
      $scope.security1 = response.data.security;
      // console.log($scope.security1)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SavePedigree = function(pedigreepanel,editanimal){
    $http({
      method : 'POST',
      url : '/savepedigree',
      data : {pedigreepanel:pedigreepanel,editanimal:editanimal}
    }).then(function success(response){
      alert('Saved Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SoldAnimal = function(editanimal){
    // console.log(editanimal)
    $http({
      method : 'POST',
      url : '/soldanimals',
      data : editanimal
    }).then(function success(response){
      alert('Animal Sold Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchPedigree = function(editanimal){
    $http({
      method : 'POST',
      url : '/searchpedigree',
      data : editanimal
    }).then(function success(response){
      // alert('Email Sent')
      $scope.pedigree10=response.data[0];
    },function error(response){
      // alert('Email Not Sent')
    })
  }
  $scope.DeceasedAnimal = function(editanimal){
    // console.log(editanimal)
    $http({
      method : 'POST',
      url : '/deceasedanimals',
      data : editanimal
    }).then(function success(response){
      alert('Animal Status Changed to Deceased Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EditAnimalsfullData = function(animal){
    $http({
      method : 'POST',
      url : '/editanimalsdata',
      data : animal
    }).then(function success(response){
      $scope.editanimal = response.data.a[0];
      $scope.editanimal.Dateregestered = response.data.a[0].Dateregestered
      $scope.editanimal.Submitted = response.data.a[0].Submitted
      $scope.editanimal.Lastupdate = response.data.a[0].Lastupdate
      $scope.editanimal.BirthDate = response.data.a[0].BirthDate
      $scope.memberpanel = response.data.b[0];
      $scope.pedigreepanel = response.data.c[0];
      $scope.dnapanel = response.data.d;
      $scope.previousowner = response.data.e;
      $scope.offspring = response.data.f;
      $scope.eidinformation = response.data.g;
      $scope.earnings = response.data.h;
      // $scope.earning.EventDate = response.data.h.EventDate
      $scope.regno = response.data.a[0].RegNo;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddEarnings = function(addearnings,editanimal){
    $http({
      method : 'POST',
      url : '/addearningsdata',
      data : {addearnings : addearnings,editanimal : editanimal}
    }).then(function success(response){
      $scope.earnings = response.data;
      alert('Added Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateEarning = function(earning){
    $http({
      method : 'POST',
      url : '/updateaniearning',
      data : earning
    }).then(function success(response){
      alert('Updated Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteAnimalEarning = function(earning){
    $http({
      method : 'POST',
      url : '/deleteanimalearning',
      data : earning
    }).then(function success(response){
      alert('Removed Successfully')
      var index = $scope.earnings.indexOf(earning);
      $scope.earnings.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteDNAPan = function(dnapan){
    $http({
      method : 'POST',
      url : '/deletednapan',
      data : dnapan
    }).then(function success(response){
      alert('Removed Successfully')
      var index = $scope.dnapanel.indexOf(dnapan);
      $scope.dnapanel.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.CheckSingle = function(single,editanimal,number){
    // console.log(number);
    $http({
      method : 'POST',
      url : '/checksingle',
      data : {reg : editanimal, txtreg : single, num : number}
    }).then(function success(response){
      $scope.dnapanel = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.Updateprint = function(reg){
    $http({
      method : 'POST',
      url : '/updateprintanimal',
      data : reg
    }).then(function success(response){

    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddtoNewList = function(addlist,reg){
    // console.log(number);
    $http({
      method : 'POST',
      url : '/addtonewlist',
      data : {list : addlist, regno : reg}
    }).then(function success(response){
      alert('Added Successfully')
    },function error(response){
      alert('Quick List Name Already Exists');
    })
  }
  $scope.AddtoNewList1 = function(quicklist,reg){
    // console.log(number);
    $http({
      method : 'POST',
      url : '/addtonewlist1',
      data : {list : quicklist, regno : reg}
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddtoNewList2 = function(quicklist,reg){
    // console.log(number);
    $http({
      method : 'POST',
      url : '/addtonewlist2',
      data : {list : quicklist, regno : reg}
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.GetMemQuickList = function(){
    $http({
      method : 'GET',
      url : '/getmemquicklist'
    }).then(function success(response){
      $scope.members = response.data.member;
      $scope.lists = response.data.list;
      // console.log($scope.mirs)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.Submitml = function(){
    alert('Animal(s) Added');
  }
  $scope.Exitml = function(){
    $scope.addregno=false;
    $scope.addtolist=true;
    $scope.addregno1=false;
  }
  $scope.MultipleList = function(multiplelist,editanimal){
    $http({
      method : 'POST',
      url : '/multiplelist',
      data : {multiplelist : multiplelist,editanimal : editanimal}
    }).then(function success(response){
      $scope.mls = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.Checkml = function(multiplelist,editanimal){
    $http({
      method : 'POST',
      url : '/checkml',
      data : {multiplelist : multiplelist,editanimal : editanimal}
    }).then(function success(response){
      $scope.dnapanel = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteDNAList = function(editanimal){
    // console.log(editanimal)
    $http({
      method : 'post',
      url : '/deletednalist',
      data : editanimal
    }).then(function success(response){
      alert('Removed Successfully')
      $scope.dnapanel = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.transfer = false;
  $scope.TrasferOwner = function(){
    $scope.transfer = true;
  }
  $scope.SearchTransferOwner = function(searchowner,editanimal){
    $http({
      method : 'POST',
      url : '/searchtransferowner',
      data : {details:searchowner,id:editanimal}
    }).then(function success(response){
      $scope.searchowner = {};
      $scope.stos = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.TransferOwnerName = function(sto,editanimal){
    // console.log(sto.MemberNumber);
    // console.log(editanimal.MemberNo);
    if(sto.MemberNumber == editanimal.MemberNo){
      alert('The selected owner is the same as the previous owner')
    }
    else{
      $http({
        method : 'POST',
        url : '/transferownername',
        data : {details:sto,num:editanimal}
      }).then(function success(response){
        alert('Transfered')
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  }
  $scope.ChangeValue =function(eworks,ework,ework6){
    // console.log(eworks)
    // console.log(ework)
    // console.log(ework6)
    if(!ework6){
      eworks.SubTotal = eworks.Price * eworks.Quantity;
      var total = 0;
      angular.forEach($scope.ework1,function(data){
        total +=data.Price * data.Quantity;

        if(eworks.Quantity == 0 && total == 0) {
          $scope.ework.TotalPriceAmt=total;
          $scope.ework.HandlingAmt = total;
        }else{
          $scope.ework.HandlingAmt = total * 0.02;
          $scope.ework.TotalPriceAmt= total + $scope.ework.HandlingAmt;
          if ($scope.Account != undefined) 
          {
            $scope.ChangeUpgrade(test,ework);
          }
        }
      })
      return total;
    }
    else if(!eworks){
      // console.log(ework6)
      // console.log(ework.MRP)
      ework6.SubTotal1 = ework6.Account;
      $scope.ework.TotalPriceAmt = Number($scope.ework.TotalPriceAmt) + Number(ework6.Account) + Number(ework.MRP);
    }
  }
  $scope.UpdateFullAnimalData2 = function(editanimal){
    $http({
      method : 'POST',
      url : '/updatefullanimaldata',
      data : editanimal
    }).then(function success(response){
      alert('Updated Successfully');
      $window.location.href = '#!addnewanimal';
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateFullAnimalData = function(editanimal){
    $http({
      method : 'POST',
      url : '/updatefullanimaldata',
      data : editanimal
    }).then(function success(response){
      alert('Updated Successfully');
      $window.location.href = '#!editanimal';
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
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
        $scope.ework.MemberName = selected;
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
$scope.updatecontains = function(){
  $http({
    method : 'GET',
    url : '/containdata'
  }).then(function success(response){
    $scope.contains = response.data
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.Editform = function(){
  $scope.eworkorderform1=true;
  $scope.eworkorderform2 = true;
  $scope.isHide1 = false;
}
$scope.Exiteditform = function(){
  $scope.eworkorderform1=false;
  $scope.eworkorderform2=false;
}
$scope.assignedto = function(){
  $http({
    method : 'GET',
    url : '/assignedtodata'
  }).then(function success(response){
    $scope.assigned = response.data
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.SearchWorkOrder = function(wo){
  $http({
    method : 'POST',
    url : '/searchworkdata',
    data : wo
  }).then(function success(response){
    $scope.wodata = response.data
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.SameAddress = function(sameasabove) {
    // console.log(sameasabove)
    if(sameasabove){
      $scope.ework.ShippingFirstName = angular.copy($scope.ework.FirstName);
      $scope.ework.ShippingLastName = angular.copy($scope.ework.LastName);
      $scope.ework.ShippingCity = angular.copy($scope.ework.BillingCity);
      $scope.ework.ShippingState = angular.copy($scope.ework.BillingState);
      $scope.ework.ShippingZip = angular.copy($scope.ework.BillingZip);
      $scope.ework.ShippingCountry = angular.copy($scope.ework.BillingCountry);
      $scope.ework.ShippingAddress = angular.copy($scope.ework.BillingAddress);
    } else {
      $scope.ework.ShippingFirstName = "";
      $scope.ework.ShippingLastName = "";
      $scope.ework.ShippingCity = "";
      $scope.ework.ShippingState = "";
      $scope.ework.ShippingZip = "";
      $scope.ework.ShippingCountry = "";
      $scope.ework.ShippingAddress = "";
    }
  };
$scope.EditWorkOrder = function(wor){
  $scope.showworkorder = true;
  $scope.addworkorder = false;
  $scope.editworkorder = true;
  $http({
    method : 'POST',
    url : '/editworkorder',
    data : wor
  }).then(function success(response){
    $scope.ework = response.data.details[0];
    $scope.ework.CreatedDate = response.data.details[0].CreatedDate;
    $scope.ework.DueDate = response.data.details[0].DueDate;
    $scope.ework1 = response.data.table;
    $scope.id = response.data.id;
    $scope.fname = response.data.fname;
    $scope.lname = response.data.lname;
    $scope.heading = response.data.headings;
    if($scope.ework.MembershipRenewalPrice !=null){
      $scope.renewalEnabled = true;
    }
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.updateRenewalPrice = function(){
  $scope.renewalEnabled = !$scope.renewalEnabled;
  if($scope.ework.MembershipRenewalPrice!=null && !$scope.renewalEnabled){
   $scope.ework.TotalPriceAmt = $scope.ework.TotalPriceAmt - $scope.ework.MRP
  } 
  if($scope.ework.MembershipRenewalPrice == null && $scope.renewalEnabled) {
   $scope.ework.TotalPriceAmt = $scope.ework.TotalPriceAmt + $scope.ework.MRP

  }
}
$scope.UpdateWorkOrder = function(ework1){
    // alert('hi')
    $http({
      method : 'POST',
      url : '/updateworkorder',
      data : ework1
    }).then(function success(response){
      // alert('Updated Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateWorkOrder1 = function(ework){
    // console.log(ework)
    $http({
      method : 'POST',
      url : '/updateworkorder1',
      data : ework
    }).then(function success(response){
      alert('Updated Successfully');
      $scope.ework = {};
    },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.UpdateWorkOrder2 = function(ework1,ework){
    $http({
      method : 'POST',
      url : '/updateworkorder2',
      data : {ework1 : ework1, ework : ework}
    }).then(function success(response){
        // alert('Updated Successfully');
        $scope.ework1 = {};
        $scope.ework = {};
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.shipping = function(worklist){
    // console.log(worklist.ItemPostage)
    // console.log(worklist.Quantity)
    if(worklist.ItemPostage != null && worklist.Quantity != null){
      $scope.woshow2=true;
    }
    else{
      $scope.woshow2=false;
    }
  }
  // $scope.countQP = function(worklist,workorders){
  //   if(!worklist.Quantity || !worklist.Price){
  //     worklist.SubTotal = 0;
  //   }
  //   else{
  //     if(worklist.ItemPostageType == 'Order' && worklist.checktype==true){
  //       worklist.SubTotal = worklist.Quantity * worklist.Price;
  //     }
  //     else{
  //       worklist.SubTotal = worklist.Quantity * worklist.Price + worklist.ItemPostage;;
  //     }
  //   }
  // }
  
  $scope.AddWorkOrder = function(){
    $scope.woshow=false;
    $scope.woshow2=false;
    $scope.wohide1=false;
    $scope.addworkorder=true;
    $scope.showworkorder=true;
  }
  $scope.AddMemberWorkorder = function(work){
    $http({
      method : 'POST',
      url : '/addmemberworkorder',
      data : work
    }).then(function success(response){
      $scope.workorders = response.data.personaldata[0];
      // $scope.ework.DueDate = $filter('date')( response.data.details[0].DueDate, 'MM/dd/yyyy');
      var type = $scope.workorders.Type;
        // console.log(type)
        var type1 = type.toUpperCase();
        // console.log(type1);
        if(type1 == 'MEDIA' || type1 == 'VIDEO JUDGE' || type1 == 'INACTIVE'){
          $scope.woshow=false;
          $scope.wohide1=true;
          $scope.showworkorder=false;
          alert(type1+ 'members do not have access to breeder services.  Please upgrade membership through member payments"')
        }
        else{
          $scope.woshow=true;
          $scope.woshow2=false;
          $scope.wohide1=false;
          $scope.showworkorder=true;
          $scope.headings = response.data.headings;
          $scope.worklists = response.data.listdata;
          $scope.id1 = response.data.id;
          $scope.fname1 = response.data.fname;
          $scope.lname1 = response.data.lname;
            // console.log($scope.work)
          }
        },function error(response){
          // alert('Error occured. Please try again later!');
        })
  } 
  $scope.InsWorkOrder = function(workorders,workorderdata){
    $http({
      method : 'POST',
      url : '/insertworkorder',
      data : {details : workorders, others : workorderdata}
    }).then(function success(response){
      alert('Added Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.InsWorkOrder2 = function(worklists){
    $http({
      method : 'POST',
      url : '/insertworkorder2',
      data : worklists
    }).then(function success(response){
        // alert('Updated Successfully');
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.StatusDropdown = function(){
    $http({
      method : 'GET',
      url : '/statusdata'
    }).then(function success(response){
      $scope.status = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EditMemberWorkorder = function(ework){
    // console.log(ework)
    $http({
      method : 'POST',
      url : '/editmemberworkorder',
      data : work
    }).then(function success(response){
      alert('Updated Successfully')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ResetWorkOrder = function(wo){
    $scope.wo = {};
  }
});

//------------------------------------------------Member Payments-------------------------------------------
app.controller('MemberPaymentController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$filter,$window){
  $scope.vm = {};
  $scope.renewalEnabled = false;
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', false)
  .withOption('searching', false)
  .withOption('info', false)
  .withOption('order', [0])
  .withButtons([
  {
    extend:    'copy',
    text:      '<i class="fa fa-files-o"></i> Copy',
    titleAttr: 'Copy'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.isShow=true;
  $scope.isHide=false;
  $scope.isHide1 = false;
  $scope.addExistingProdData=true;
  $scope.TemporaryShoppingCart=true;
  $scope.EditPay=true;
  $scope.additional = true;
  $scope.addanimal = true;
  $scope.editworkorder = false;
  $scope.addPaymentInfo = {};
  $scope.paymentStatus = 0;
  $scope.date = $filter('date')(Date.now(), 'MM/dd/yyyy');
  $scope.statusResponse = false;
  $scope.curPage = 0;
$scope.pageSize = 10;
$scope.selecteddropdown = false;
  $scope.changeme = function(){
    $scope.isShow=false;
    $scope.isHide=true;
  }
  $scope.save=function(emps){
    $window.location.href = "#!memberpayments"
  }
  $scope.view=function(){
    $scope.isShow=false;
    $scope.isHide=false;
    $scope.addExistingProdData=true;
    $scope.TemporaryShoppingCart=false;
  }
  $scope.HideAdditional=function(emps){
    $scope.isHide1=false;
    $scope.additional = false;
    $scope.EditPay = true;
    console.log('hurray')
    $http({
      method : 'POST',
      url : '/getadditionalinfo',
      data : emps
    }).then(function success(response){
      $scope.gais = response.data[0];
      $scope.tgais = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.patchTable = function(data) {
    $http({
      method : 'POST',
      url : '/getTableData',
      data : {memberno: data.MemberID,parentPaymentId: data.ParentPaymentId,paymentId:data.PaymentId}
    }).then(function success(response){
      $scope.tableData = response.data.table;
      console.log($scope.tableData,'tableData')
      $scope.personData = response.data.data[0];
      $scope.personData.memberName = $scope.personData.FirstName + $scope.personData.LastName
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.HideAdditional1=function(woords){
    $scope.EditPay=true;
    $scope.additional = false;
    $http({
      method : 'POST',
      url : '/getadditionalinfo',
      data : woords
    }).then(function success(response){
      $scope.gais = response.data[0];
      $scope.tgais = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowWorkOrder=function(woords){
    $scope.isHide1 = false;
    $scope.editworkorder = true;
  }
  $scope.HideWorkOrder=function(woords){
    $scope.isHide1 = true;
    $scope.editworkorder = false;
  }
  $scope.AddAni=function(emps){
    $scope.EditPay=true;
    $scope.additional = true;
    $scope.addanimal = false;
    $http({
      method : 'POST',
      url : '/getadditionalinfo',
      data : emps
    }).then(function success(response){
      $scope.gais = response.data[0];
      $scope.tgais = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ExitAdditional=function(emps){
    $scope.EditPay=false;
    $scope.additional = true;
  }
  $scope.ExitAddAni=function(emps){
    $scope.EditPay=false;
    $scope.addanimal = true;
  }
  $scope.openSection = function(id,value){
    if(value == 1) {
        obj={
          PaymentID : id,
          Category:'Work Order'
        }
        $scope.EditMemberPayment(obj,1)
      }
  if(value == 2) {
        obj={
          ParentPaymentId : id,
          paymentID:null,
          Category:'Work Order'
        }
        $scope.EditMemberPayment(obj,2)
  }
}
  $scope.EditMemberPayment=function(vmp,value){
    $scope.statusResponse = false;
    if(value == 1) {
      $scope.paymentStatus = value;
    vmp.PaymentID = vmp.PaymentID;
    }
    if(value == 2) {
      $scope.paymentStatus = value;
      vmp.PaymentID = vmp.ParentPaymentId;
      $http({
        method : 'POST',
        url : '/getchildInfo',
        data : {ParentPaymentId : vmp.ParentPaymentId}
      }).then(function success(response){
$scope.childInfo = response.data;
      },function error(err){
console.log(err,'error')
      })
    }
    $scope.isShow=false;
    $scope.isHide=false;
    $scope.addExistingProdData=true;
    $scope.TemporaryShoppingCart=true;
    $scope.EditPay=false;
    $scope.additional = true;
    console.log(vmp,'vmp')
    $http({
      method : 'POST',
      url : '/editmemberpayment',
      data : vmp
    }).then(function success(response){
      if(response.data.emps){
        $scope.statusResponse = true;
        $scope.emps = response.data.emps[0];
        $scope.emps.cc = parseInt(response.data.emps[0].cc)
        $scope.emps.expire = response.data.emps[0].expire;
        $scope.emps.Payment = response.data.emps[0].paymentType;
      }
      if(response.data.merchand){
        $scope.merchands = response.data.merchand;
      }
      if(response.data.shipping){
        $scope.shipping = response.data.shipping[0];
      }
      if(response.data.wods){
        $scope.wods = response.data.wods[0];
      }
      if(response.data.wom){
        $scope.wom = response.data.wom;
      }
      if(response.data.wotable1){
        $scope.wotable1 = response.data.wotable1;
      }
      if(response.data.animaltab){
        $scope.animaltab = response.data.animaltab;
      }
      if(response.data.eventdata){
        $scope.eventdata = response.data.eventdata[0];
      }
      if(response.data.eventtable){
        $scope.eventtable = response.data.eventtable;
      }
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }      
  $scope.ViewMemberPayments = function(memberpay){
    $scope.curPage = 1;
    $scope.recPerPage = 10;
    $scope.loader = false;
    $scope.selecteddropdown = true;
    $http({
      method : 'POST',
      url : '/viewmemberpayments',
      data : {memberpay : $scope.memberpay, page : $scope.curPage, recPerPage : $scope.pageSize}
    }).then(function success(response){
      // console.log(response.data)
      $scope.vmps = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
    $scope.numberOfPages = function() {
      if($scope.vmps && $scope.vmps[0].xCount){
      return Math.ceil($scope.vmps[0].xCount / $scope.pageSize);
      }
    };
  }
  $scope.tempArray = []
  $scope.displayTable = function(id){
    $http({
      method : 'POST',
      url : '/getPaymentTable',
      data : {id : id}
    }).then(function success(response){
      $scope.paymentTable = response.data
      let y = $scope.wotable1.map(obj=>obj.Header)
      console.log(y,'ooooooooooo')
      y.forEach(obj=>{
        if(obj.includes('Registration')){
          $scope.tempArray.push(obj);
        }
      });
      console.log(response,'responsepppppppppppppppppppp')
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.Viewmempay = function(){
    $http({
      method : 'POST',
      url : '/viewmempay',
      data : {page : $scope.curPage, recPerPage : $scope.pageSize, search : $scope.vm ? $scope.vm.Search : ''}
    }).then(function success(response){
      $scope.vmps = response.data.data
      $scope.membercount = response.data.count[0].count;
      // console.log(response,'response')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
    $scope.numberOfPages = function() {
      if($scope.vmps && $scope.membercount){
      return Math.ceil($scope.membercount / $scope.pageSize);
      }
    };
  }
//   $scope.searchMemberPay = function() {
//     $scope.curPage = 0;
//     $scope.pageSize =10;
//     if(!$scope.selecteddropdown) {
// $scope.Viewmempay();
//     }
//     if($scope.selecteddropdown) {
//       $scope.ViewMemberPayments();
//     }
//   }
  $scope.EventCheck = function(evenreg,eventdata){
    $http({
      method : 'POST',
      url : '/eventcheck',
      data : {check : evenreg, eventdetails : eventdata}
    }).then(function success(response){
      $scope.msg = response.data[0].msg
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ResetPayments = function(memberpay){
    $scope.memberpay = {};
    $scope.curPage = 0;
    $scope.pageSize =10;
    $scope.selecteddropdown = false;
    $scope.Viewmempay();
  }
  $scope.CheckClosedPayment = function(vmp){
    $http({
      method : 'POST',
      url : '/checkclosedpayment',
      data : vmp
    }).then(function success(response){
      alert('Payment Closed');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateMemberPayments = function(emps){
    $http({
      method : 'POST',
      url : '/updatememberpayments',
      data : emps
    }).then(function success(response){
      alert(response.data.msg)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.printDiv = function(divName) {
    var printContents = document.getElementById('printscreen').innerHTML;
    var popupWin = window.open('', '_blank', 'width=300,height=300');
    popupWin.document.open();
    popupWin.document.write('<html><head>  <link rel="stylesheet" href="../angular/css/bootstrap.min.css"><link rel="stylesheet" href="../angular/css/datatables.bootstrap.css"><link href="../angular/css/jquery-ui.css" rel="stylesheet" type="text/css" /><link rel="stylesheet" type="text/css" href="../angular/css/buttons.datatables.min.css"><link rel="stylesheet" href="../angular/css/font-awesome.min.css"><link href="../angular/css/style.css" rel="stylesheet"><link href="../angular/css/style-responsive.css" rel="stylesheet"><link href="../angular/css/style1.css" rel="stylesheet"></head><body onload="window.print()">' + printContents + '</body></html>');
    popupWin.document.close();
  }
  $scope.SaveWorkOrderPay = function(woords,pay){
    $http({
      method : 'POST',
      url : '/saveworkorderpay',
      data : {woords:woords,pay:pay}
    }).then(function success(response){
      alert(response.data.msg);
    },function error(response){
      // alert('Error occured. Please try again later!');
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
        $scope.work.MemberNumber = selected;
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
$scope.AdditionalMemberPayments = function(emps,pay,addPaymentInfo){
  $http({
    method : 'POST',
    url : '/additionalmemberpayments',
    data : {emps:emps,pay:pay,additional:addPaymentInfo}
  }).then(function success(response){
    alert('Added Successfully')
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.MemTypeDropdown = function(){
  $http({
    method : 'GET',
    url : '/memtypedropdown'
  }).then(function success(response){
    $scope.typedropdown = response.data
      // console.log($scope.typedropdown)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.JuniorValidation = function(newpay){
    // console.log(newpay.bdate)
    if(newpay.type == 89){
      var date = new Date();
      var date1 = new Date(newpay.bdate)
      var year = date.getFullYear();
      var year1 = date1.getFullYear();
      // console.log(year1)
      // console.log(year)
      var diff = year - year1
      // console.log(diff)
      if(diff>18){
        newpay.bdate = '';
        alert('You must be at least 18 or younger to select a Junior Membership')
      }
    }
  }
  $scope.AddNewMembership = function(newpay,pay,amount){
    $http({
      method : 'POST',
      url : '/addnewmembership',
      data : {newpay:newpay,pay:pay,amount : amount.Tot}
    }).then(function success(response){
      $scope.newpay = {};
      $scope.pay = {};
      alert(response.data.msg)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.MemListDropdown = function(){
    $http({
      method : 'GET',
      url : '/getmemlist'
    }).then(function success(response){
      $scope.memlists = response.data
      // console.log($scope.memlists)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowBillInfo = function(memrenupg){
    $http({
      method : 'POST',
      url : '/getbillinfo',
      data : memrenupg
    }).then(function success(response){
      $scope.billinfo = response.data[0];
      // console.log($scope.memlists)
      $scope.CalculateCount1(response.data[0],$scope.PaymentType,$scope.AddNewPayment);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.TypeDropdown = function(billinfo){
    $http({
      method : 'POST',
      url : '/typedropdown',
      data : billinfo
    }).then(function success(response){
      $scope.types = response.data;
      // console.log($scope.memlists)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SaveAniRegMemRenMemUpg = function(memrenupg,billinfo,pay,cat){
    var category = '';
    if(cat == 'AnimalRegistrationMember') { category  = 'Animal Registration'}
    if(cat == 'MembershipRenewalMember') { category = 'Membership Renewal'}
    if(cat == 'MembershipUpgradeMember') { category = 'Membership Upgrade'}
    memrenupg = {...memrenupg,category : category}
   $http({
    method : 'POST',
    url : '/saveaniregmemrenmemupg',
    data : {memrenupg:memrenupg,billinfo:billinfo,pay:pay}
  }).then(function success(response){
    alert('Transaction Successfull')
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.addUpdgrade = function(){
  var tempAmount = 0;
$scope.types.forEach(obj=>{
  console.log(obj,'obj')
  if(obj.Type == $scope.billinfo.type) {
tempAmount = obj.Price;
  }
});
$scope.billinfo.Subtotal = tempAmount;
  $scope.billinfo.handling = $scope.billinfo.Subtotal * 0.02;
    $scope.billinfo.discount = 0;
    $scope.billinfo.Tot = $scope.billinfo.Subtotal + $scope.billinfo.handling;
}
$scope.AddUSSBA = function(usbba){
  $http({
    method : 'POST',
    url : '/addussba',
    data : usbba
  }).then(function success(response){
    $scope.usbba = {};
    alert('Added Successfully')
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.CalculateAmount = function(val1,payType){
  $scope.woords.HandlingFeeAmt = $scope.woords.Total * 0.02;
  if($scope.PaymentType?.Payment == 'eCheck'){
    $scope.woords.HandlingDiscountAmt = $scope.woords.Total * 0.02;
    $scope.woords.Tot = $scope.woords.Total + 0;
  }
  else{
    $scope.woords.HandlingDiscountAmt = 0;
    $scope.woords.Tot = $scope.woords.Total + $scope.woords.HandlingFeeAmt + 0;
  }
}
$scope.GetWorkOrder = function(woor){
  $scope.isHide = false;
  $scope.isHide1 = true;
  $http({
    method : 'POST',
    url : '/getworkorder',
    data : woor
  }).then(function success(response){
    $scope.woords = response.data.details[0];
    $scope.header = response.data.header;
    $scope.payment = response.data.payment[0];
    $scope.animal = response.data.animal;
    $scope.wotable = response.data.wotable;
    $scope.CalculateAmount($scope.woords,$scope.payment)
      // console.log($scope.memlists)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}

$scope.AnimalTableData = function(woords){
  $http({
    method : 'POST',
    url : '/getanimaltabledata',
    data : woords
  }).then(function success(response){
    $scope.gatds = response.data;
      // console.log($scope.memlists)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.CheckExistingAnimal = function(gatd,woords){
  $http({
    method : 'POST',
    url : '/checkexistinganimal',
    data : {gatd:gatd,woords:woords}
  }).then(function success(response){
  },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.CalculateCount = function(val,val1){
  // console.log(val2.cost)
  $scope.cal.handling = val.sum * 0.02;
  if(val1 && val1.Payment == 'eCheck'){
    $scope.cal.discount = val.sum * 0.02;
    $scope.cal.Tot = val.sum + val.shipping;
  }
  else{
    $scope.cal.discount = 0;
    $scope.cal.Tot = val.sum + $scope.cal.handling + val.shipping;
  }
}
$scope.getMembershipPrice = function(newpay){
  $scope.amount = {};
  let array = $scope.typedropdown.filter(obj=>{ return obj ? obj.MembershipPriceID == newpay.type : false  })
    $scope.amount.subtotal = array[0].Price;
    $scope.amount.handling = array[0].Price * 0.02;
    $scope.amount.discount = 0;
      $scope.amount.Tot = $scope.amount.handling + array[0].Price;
    if($scope.PaymentType?.Payment == 'eCheck') {
      $scope.amount.Tot =  array[0].Price;
      $scope.amount.discount = array[0].Price * 0.02;
    }
    // $scope.amount.Tot =  345;
}

$scope.CalculateCount1 = function(val,val1,addNewPayment){
  if($scope.AddNewPayment.name == 'NewMembershipMember'){
  $scope.amount.handling = val.subtotal * 0.02;
  if(val1?.Payment == 'eCheck'){
    $scope.amount.discount = val.subtotal * 0.02;
    $scope.amount.Tot = val.subtotal;
  }
  else{
    $scope.amount.discount = 0;
    $scope.amount.Tot = val.subtotal + $scope.amount.handling;
  }
}
if($scope.AddNewPayment.name == 'MembershipRenewalMember' || $scope.AddNewPayment.name == 'MembershipUpgradeMember' || $scope.AddNewPayment.name == 'AnimalRegistrationMember'){
  console.log('iff',val1)
  $scope.billinfo.handling = val.Subtotal * 0.02;
  if(val1?.Payment == 'eCheck'){
    console.log('innn')
    $scope.billinfo.discount = val.Subtotal * 0.02;
    $scope.billinfo.Tot = val.Subtotal;
  }
  else{
    console.log('else')
    $scope.billinfo.discount = 0;
    $scope.billinfo.Tot = val.Subtotal + $scope.billinfo.handling;
  }
}
}
$scope.CalculateCount2 = function(val,val1){
  $scope.emps.HandlingFeeAmt = val.SubtotalAmt * 0.02;
  if(val1.Payment == 'eCheck'){
    $scope.emps.DiscountAmt = val.HandlingFeeAmt;
    $scope.emps.PaymentAmount = val.SubtotalAmt;
  }
  else{
    $scope.emps.DiscountAmt = 0;
    $scope.emps.PaymentAmount = val.SubtotalAmt + $scope.emps.HandlingFeeAmt + $scope.emps.DiscountAmt;
  }
}
$scope.CalculateCount3 = function(val,val1){
  $scope.addPaymentInfo.HandlingFeeAmt = $scope.addPaymentInfo.SubtotalAmt * 0.02;
  if($scope.PaymentType && $scope.PaymentType.Payment == 'eCheck'){
    $scope.addPaymentInfo.DiscountAmt = $scope.addPaymentInfo.HandlingFeeAmt;
    $scope.addPaymentInfo.PaymentAmount = $scope.addPaymentInfo.SubtotalAmt
  }
  else if ($scope.PaymentType && $scope.PaymentType.Payment == 'other') {
    $scope.addPaymentInfo.DiscountAmt = 0;
    $scope.addPaymentInfo.HandlingFeeAmt = 0;
    $scope.addPaymentInfo.PaymentAmount = $scope.addPaymentInfo.SubtotalAmt;
  } else{
    $scope.addPaymentInfo.DiscountAmt = 0;
    $scope.addPaymentInfo.PaymentAmount = $scope.addPaymentInfo.SubtotalAmt + $scope.addPaymentInfo.HandlingFeeAmt;
  }
}
$scope.MemberOnlineStore = function(){
  $http({
    method : 'GET',
    url : '/memonlinestore'
  }).then(function success(response){
    $scope.memolists = response.data
      // console.log($scope.memolists)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.addMemeberBill = function(sameasabove,newpay) {
  if(sameasabove){
    newpay.baddress = angular.copy(newpay.caddress);
    newpay.bcity = angular.copy(newpay.ccity);
    newpay.bstate = angular.copy(newpay.cstate);
    newpay.bzip = angular.copy(newpay.czip);
    newpay.bcountry = angular.copy(newpay.ccountry);
  } else {
    newpay.baddress = '';
    newpay.bcity = '';
    newpay.bstate = '';
    newpay.bzip = '';
    newpay.bcountry ='';
  }
}
$scope.DontShip = function(value){
  // console.log(value);
  if(value == 1){
    $scope.olss1 = $scope.olss;
  }
  else{
    $scope.olss1 = {};
  }
}
$scope.BillData = function(olstore){
  // console.log(olstore)
  $http({
    method : 'post',
    url : '/osbillinginfo',
    data : olstore
  }).then(function success(response){
    $scope.olss = response.data[0]
    $scope.olss1 = response.data[0]
      // console.log($scope.olss)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.AddExistingProducts = function(){
  $http({
    method : 'GET',
    url : '/addexistingproducts'
  }).then(function success(response){
    $scope.aeps = response.data
      // console.log($scope.memlists)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.SameAddress = function() {
  // console.log()
  if($scope.sameasabove==true){
    $scope.olss.Firstname1 = angular.copy($scope.olss.Firstname);
    $scope.olss.Lastname1 = angular.copy($scope.olss.Lastname);
    $scope.olss.Address1 = angular.copy($scope.olss.Address);
    $scope.olss.City1 = angular.copy($scope.olss.City);
    $scope.olss.State1 = angular.copy($scope.olss.State);
    $scope.olss.Zip1 = angular.copy($scope.olss.Zip);
    $scope.olss.Country1 = angular.copy($scope.olss.Country);
  } else {
    $scope.olss.Firstname1 = "";
    $scope.olss.Lastname1 = "";
    $scope.olss.Address1 = "";
    $scope.olss.City1 = "";
    $scope.olss.State1 = "";
    $scope.olss.Zip1 = "";
    $scope.olss.Country1 = "";
  }
};
$scope.DeleteProducts = function(){
  $http({
      method : 'post',
      url : '/deleteproduct',
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.AddToOrder = function(aep){
    // console.log(aep)
    $http({
      method : 'post',
      url : '/addtoorder',
      data : aep
    }).then(function success(response){
      $scope.aeps1 = response.data;
      $scope.aep = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SaveOnlineStoreData = function(olss,olsss,custom,cal,pay){
    $http({
      method : 'post',
      url : '/saveonlinestoredata',
      data : {olss:olss,olsss:olsss,custom:custom,cal:cal,pay:pay}
    }).then(function success(response){
      // alert(response.data.msg);
      if(response.data.msg == "Transaction was successful."){
        alert(response.data.msg)
        $window.location.href = '#!memberpayments';
      }
      else{
        alert(response.data.msg)
      }
      
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.RefundOnlineStoreData = function(olss,olsss,custom,cal,pay){
    $http({
      method : 'post',
      url : '/refundonlinestoredata',
      data : {olss:olss,olsss:olsss,custom:custom,cal:cal,pay:pay}
    }).then(function success(response){
      
        alert(response.data.msg)
      
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.CalculateOrder = function(aep){
    aep.total = aep.Price*aep.Order;
    aep.totalweight = aep.weight*aep.Order;
    // console.log(aep.descr)
    if(aep.descr){
      if(aep.descr=="Small"){
        var b = "S";
        aep.code = aep.ProductNumber+ '-' +b;
        // console.log(aep.code)
      }
      else if(aep.descr=="Medium"){
        var c ="M";
        aep.code = aep.ProductNumber+ '-' +c;
        // console.log(aep.code)
      }
      else if(aep.descr=="Large"){
        var d ="L";
        aep.code = aep.ProductNumber+ '-' +d;
        // console.log(aep.code)
      }
      else if(aep.descr=="X-Large" || aep.descr=="XLarge"){
        var e = "XL";
        aep.code = aep.ProductNumber+ '-' +e;
        // console.log(aep.code)
      }
      else if(aep.descr=="XX-Large"){
        var f = "XXL";
        aep.code = aep.ProductNumber+ '-' +f;
        // console.log(aep.code)
      }
    }
    else{
      aep.code = aep.ProductNumber;
      // console.log(aep.code)
    }
  }
  $scope.CalculateOrder1 = function(aeps1){
    $scope.cal = {};
    // console.log(aeps1)
    var sum = 0;
    var weight = 0;
    angular.forEach(aeps1,function(data){
      sum +=data.Totprice;
      weight +=data.totalweight;
      $scope.cal.sum = sum;
      $scope.cal.weight = weight;
      $scope.cal.handling = sum * 0.02;
      $scope.cal.discount = 0;
      $scope.cal.Tot = $scope.cal.sum + $scope.cal.handling;
    });
    return sum;
  }
  $scope.ShowOrders = function(){
    // console.log(aep)
    $http({
      method : 'get',
      url : '/showorders'
    }).then(function success(response){
      $scope.aeps1 = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteOrder = function(aep1){
    // console.log(aep)
    $http({
      method : 'post',
      url : '/deleteorders',
      data : aep1
    }).then(function success(response){
      alert('Removed Successfully')
      var index = $scope.aeps1.indexOf(aep1);
      $scope.aeps1.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.CustomProduct = function(custom){
    $http({
      method : 'post',
      url : '/customproducts',
      data : custom
    }).then(function success(response){
      $scope.aeps1 = response.data;
      $scope.custom = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//--------------------------------------------------------Reports-------------------------------------------
//-------------------------------------------------------MemberInventoryReport------------------------------
//-----------------------------------------------------------Edit Animal-------------------------------------------------------------
app.controller('ReportsController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  // $scope.AdHocReport = function(){
  //   $http({
  //     method : 'GET',
  //     url : '/memberinventoryreport'
  //   }).then(function success(response){
  //     $scope.members = response.data
  //   },function error(response){
    // alert('Error occured. Please try again later!');
  //   })
  // }
  $scope.MemberInventoryReport = function(){
    $http({
      method : 'GET',
      url : '/memberinventoryreport'
    }).then(function success(response){
      $scope.mirs = response.data
      // console.log($scope.mirs)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.PrintInventory = function(mir){
    $scope.viewinventory = true;
    $http({
      method : 'POST',
      url : '/printinventory',
      data : mir
    }).then(function success(response){
      $scope.pis = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ExitInventory = function(){
    $scope.viewinventory = false;
  }
  $scope.MemberDueDateReport = function(dates){
    $http({
      method : 'POST',
      url : '/memberduedatereport',
      data : dates
    }).then(function success(response){
      $scope.mdds = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.MemberStartDateReport = function(date){
    $http({
      method : 'POST',
      url : '/memberstartdatereport',
      data : date
    }).then(function success(response){
      $scope.msds = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AnimalBirthDateReport = function(abds){
    $http({
      method : 'POST',
      url : '/animalbirthdatereport',
      data : abds
    }).then(function success(response){
      $scope.abds = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AnimalRegReport = function(arrdate){
    $http({
      method : 'POST',
      url : '/animalregreport',
      data : arrdate
    }).then(function success(response){
      $scope.arrs = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.MembershipByMonthReport = function(memmonth){
    $http({
      method : 'POST',
      url : '/membershipbymonthreport',
      data : memmonth
    }).then(function success(response){
      $scope.mms = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.MembershipReport = function(memreport){
    $http({
      method : 'POST',
      url : '/membershipreport',
      data : memreport
    }).then(function success(response){
      $scope.mers = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.LabelCertiReport = function(){
    $http({
      method : 'GET',
      url : '/labelcertireport'
    }).then(function success(response){
      $scope.lcs = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateLabelCertiReport = function(find){
    $http({
      method : 'POST',
      url : '/updatelabelcertireport',
      data : find
    }).then(function success(response){
      $scope.lcs = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.RemoveLabelCertiReport = function(lc){
    $http({
      method : 'POST',
      url : '/removelabelcertireport',
      data : lc
    }).then(function success(response){
      alert('Removed Successfully')
      var index = $scope.lcs.indexOf(lc);
      $scope.lcs.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.PrintLabelCertiReport = function () {
    $http({
      method : 'POST',
      url : '/printlabelcertireport'
    }).then(function success(response){
      $scope.plcs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.LabelFailedReport = function(){
    $http({
      method : 'GET',
      url : '/labelfailedreport'
    }).then(function success(response){
      $scope.lfs = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.PrintLabelFailReport = function () {
    $http({
      method : 'POST',
      url : '/printfaillabelcertireport'
    }).then(function success(response){
      $scope.pflcs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.LabelNoMatchReport = function(){
    $http({
      method : 'GET',
      url : '/labelnomatchreport'
    }).then(function success(response){
      $scope.nmls = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.PrintLabelNoMatchReport = function () {
    $http({
      method : 'POST',
      url : '/printnonmatchlabelreport'
    }).then(function success(response){
      $scope.pnms = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.LabelReportMembership = function (lrm) {
    $http({
      method : 'POST',
      url : '/labelreportmembership',
      data : lrm
    }).then(function success(response){
      $scope.lrps = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.RangeOfMemberCard = function (msc) {
    $http({
      method : 'POST',
      url : '/membershipcardsearch',
      data : msc
    }).then(function success(response){
      $scope.mscs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.PrintMemberCard = function (msc) {
    $http({
      method : 'POST',
      url : '/membershipcardprint',
      data : msc
    }).then(function success(response){
      $scope.mscp = response.data;
      for(i=0;i<$scope.mscp.length;i++){
        var a = $scope.mscp[i].Mn;
        // console.log(a);
        var b = $scope.mscp[i].MemberNumber.toString();
        // console.log(b);
        var c = $scope.mscp[i].Type;
        // console.log(c);
        var d = $scope.mscp[i].DueDate.toString();
        // console.log(d);
        var doc = new jsPDF('l', 'mm', [900, 600]);
        var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABtMAAATYCAYAAABtOjhKAAAACXBIWXMAAC4jAAAuIwF4pT92AAAgAElEQVR4nOzdSY9j17om5net3bENMrrMVErn6p5btwyUCzDgsgsowIYNuyb+A/5DHnnqkT30xD/BntbMEwOFQqGq7rk6R6dRkxkdgz13szoP1toNGWRm6kiplDLfB6A2ucmIZJARJLXe/X1f/H/98daBiIiIiIiIiIiIiIiIiJ6QH/oOEBEREREREREREREREf1SMUwjIiIiIiIiIiIiIiIiOoFhGhEREREREREREREREdEJDNOIiIiIiIiIiIiIiIiITmCYRkRERERERERERERERHQCwzQiIiIiIiIiIiIiIiKiEximEREREREREREREREREZ3AMI2IiIiIiIiIiIiIiIjoBIZpRERERERERERERERERCcwTCMiIiIiIiIiIiIiIiI6gWEaERERERERERERERER0QkM04iIiIiIiIiIiIiIiIhOYJhGREREREREREREREREdALDNCIiIiIiIiIiIiIiIqITGKYRERERERERERERERERncAwjYiIiIiIiIiIiIiIiOgEhmlEREREREREREREREREJzBMIyIiIiIiIiIiIiIiIjqBYRoRERERERERERERERHRCQzTiIiIiIiIiIiIiIiIiE5gmEZERERERERERERERER0AsM0IiIiIiIiIiIiIiIiohMYphERERERERERERERERGdwDCNiIiIiIiIiIiIiIiI6ASGaUREREREREREREREREQnMEwjIiIiIiIiIiIiIiIiOoFhGhEREREREREREREREdEJDNOIiIiIiIiIiIiIiIiITmCYRkRERERERERERERERHQCwzQiIiIiIiIiIiIiIiKiEximEREREREREREREREREZ3AMI2IiIiIiIiIiIiIiIjoBIZpRERERERERERERERERCcwTCMiIiIiIiIiIiIiIiI6gWEaERERERERERERERER0QkM04iIiIiIiIiIiIiIiIhOYJhGREREREREREREREREdALDNCIiIiIiIiIiIiIiIqITGKYRERERERERERERERERncAwjYiIiIiIiIiIiIiIiOgEhmlEREREREREREREREREJzBMIyIiIiIiIiIiIiIiIjqBYRoRERERERERERERERHRCQzTiIiIiIiIiIiIiIiIiE5gmEZERERERERERERERER0AsM0IiIiIiIiIiIiIiIiohMYphERERERERERERERERGdwDCNiIiIiIiIiIiIiIiI6ASGaUREREREREREREREREQnMEwjIiIiIiIiIiIiIiIiOoFhGhEREREREREREREREdEJDNOIiIiIiIiIiIiIiIiITmCYRkRERERERERERERERHQCwzQiIiIiIiIiIiIiIiKiEximEREREREREREREREREZ3AMI2IiIiIiIiIiIiIiIjoBIZpRERERERERERERERERCcwTCMiIiIiIiIiIiIiIiI6gWEaERERERERERERERER0QkM04iIiIiIiIiIiIiIiIhOYJhGREREREREREREREREdALDNCIiIiIiIiIiIiIiIqIT4g99B4iIiIiIiN6Vcw5CCDjn3vEL9jbvdNsTF9/8hT/s7rw34kd90bt99dtuLt50XXjuhPir7ikREREREdEHwTCNiIiIiIh+UicDr8PM6VjQFb7GHdymOdv+B0IAEHV4I9DZtFsJAAJCtPmO6Jypg5/Dbf01e7fvfk1zeW+zd+YwVDoWMj3dJ9r7sfdzP43hjuaJp3I9B7g3pIXHHu/23/b/qc87134/11zev75+7veu7+wH3NPHrnbsMdq7IE5dfHqZ4R0REREREf0EGKYREREREX3ijoZfR4Kvw9DrZOAVrgcAGflAQwhASAEp0JwXonOdEBAS+/ua2/h9srPPOcBoC2sBax2scWELWOdgNWCdhTGANdZf17mtc4AxFs6i/VoLWGv997B+n7OA6XwNnIN1fr8DAOsfP1sHRQ7hOgdn/f42YPL3rQ2W/Ne48D0cBJx1/nx4IEU38Os8NsD+4+Nvu/94+tv4bMk/tqL9nuLp99z73p3nyf/zAlEsEEUSUQxEkUAUS0SxQBwLyEggjiRkuNy93p/3++NENj9b83PWj0X4JWsCuL2wrg3v4NqvrR/j+nz3MfXPU/1AuqMVdWL/PwzniIiIiIjoKIZpRERERES/Mm8Nvxx8AHBY+XWi6qtb+dSEX1IgOgi+pOyGYqIJaPy+bijjb+scUOwMlLJQlQ1bB60sVGmhlIGqXNhv/G0qC11ZKOVQVdbfttr/eqUsAMDqEILVoUoIxJzzoZpzbSC2f50PXfav6wYwIVSrb28Pgpqmwkq0+8PzgiYYQwjesBcQ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tcODUWvjsDPw7ZAimmw2LI9rPKbxPyY1poWIQn60fu55G7JSYGUtZPvjkK/a8R3eh/L9CJgJ3OOl5/kFO+o57OtK51gKT0uFt447+ff4eO0UChZbHCvXMVgmHzwO6X/FZ0rp3p3u61DZXhiCX7zvJmMm+ykiIiIiIiJyIFKYJiKyF5QmN41jcMf43mSPOVolQrVVNGP1abL21O5U+7vHY45SNTKRMZiOao6JnMN0tltN++O1V00YZsa4SSZ0rxmDMcWKtYolIkvLGQ4PAqZzTMc7VGVb7ijnOqH7aZL3Y+l5r9csZPh1Hu17M97OFNY5HHJcd/TvTafK9mD0+26yxxQRERERERGRqVGYJiIiInvV8BBh+NdFRERERERERET2Jmdvd0BERERERERERERERERkX6UwTURERERERERERERERGQMCtNERERERERERERERERExqAwTURERERERERERERERGQMCtNERERERERERERERERExqAwTURERERERERERERERGQMCtNERERERERERERERERExuDt7Q6IiIiIiMj+xwLW2r3dDRERERGZRhYwe7sTIiJ7gcI0ERERERGZFpXRmQMYo6kWERERkf1J6ac7Ywz6UU9EDiQK00REREREZFoYBgO1QmRxjCrTRERERPYn1oJjDH4UaRUCETmgKEwTEREREZEps9biOoZsEPL9VzowWgBIREREZL/mGkg4DtZarUggIvs9hWkiIiIiIjJlxpjyREpSkykiIiIi+73SHrkK0kTkQKAwTUREREREpkVpIkUL/oiIiIgcGBSkiciBwtnbHRARERERERERERERERHZVylMExERERERERERERERERmDwjQRERERERERERERERGRMShMExERERERERERERERERmDwjQRERERERERERERERGRMShMExERERERERERERERERmDwjQRERERERERERERERGRMShMExERERERERERERERERmDwjQRERERERERERERERGRMShMExERERGRaWGt3dtdEBEREZHXkH7+E5EDhbe3OyAiIiIiIq9/1lqMMVhriQCztzskIiIiIjPKQPnnP2P005+I7N8UpomIiIiIyJRVTqRkHIN+R1lERERk/2QAayGwlkhBmogcIBSmiYiIiIjItAgt1HsO71g0a293RURERERmUH8Qct+2brbnCiQU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AAAAAAAAAAAAkIAwDQAAAAAAAAAAAEhAmAYAAAAAAAAAAAAkIEwDAAAAAAAAAAAAEhCmAQAAAAAAAAAAAAkI0wAAAAAAAAAAAIAEhGkAAAAAAAAAAABAAsI0AAAAAAAAAAAAIAFhGgAAAAAAAAAAAJCAMA0AAAAAAAAAAABIQJgGAAAAAAAAAAAAJCBMAwAAAAAAAAAAABIQpgEAAAAAAAAAAAAJCNMAAAAAAAAAAACABIRpAAAAAAAAAAAAQALCNAAAAAAAAAAAACABYRoAAAAAAAAAAACQgDANAAAAAAAAAAAASECYBgAAAAAAAAAAACQgTAMAAAAAAAAAAAASEKYBAAAAAAAAAAAACQjTAAAAAAAAAAAAgASEaQAAAAAAAAAAAEACwjQAAAAAAAAAAAAgAWEaAAAAAAAAAAAAkIAwDQAAAAAAAAAAAEhAmAYAAAAAAAAAAAAkIEwDAAAAAAAAAAAAEhCmAQAAAAAAAAAAAAkI0wAAAAAAAAAAAIAEhGkAAAAAAAAAAABAAsI0AAAAAAAAAAAAIAFhGgAAAAAAAAAAAJCAMA0AAAAAAAAAAABIQJgGAAAAAAAAAAAAJCBMAwAAAAAAAAAAABIQpgEAAAAAAAAAAAAJCNMAAAAAAAAAAACABIRpAAAAAAAAAAAAQALCNAAAAAAAAAAAACABYRoAAAAAAAAAAACQgDANAAAAAAAAAAAASECYBgAAAAAAAAAAACQgTAMAAAAAAAAAAAASEKYBAAAAAAAAAAAACQjTAAAAAAAAAAAAgASEaQAAAAAAAAAAAEACwjQAAAAAAAAAAAAgAWEaAAAAAAAAAAAAkIAwDQAAAAAAAAAAAEhAmAYAAAAAAAAAAAAkIEwDAAAAAAAAAAAAEhCmAQAAAAAAAAAAAAkI0wAAAAAAAAAAAIAEhGkAAAAAAAAAAABAAsI0AAAAAAAAAAAAIAFhGgAAAAAAAAAAAJCAMA0AAAAAAAAAAABIQJgGAAAAAAAAAAAAJCBMAwAAAAAAAAAAABIQpgEAAAAAAAAAAAAJCNMAAAAAAAAAAACABIRpAAAAAAAAAAAAQALCNAAAAAAAAAAAACABYRoAAAAAAAAAAACQgDANAAAAAAAAAAAASECYBgAAAAAAAAAAACQgTAMAAAAAAAAAAAASEKYBAAAAAAAAAAAACQjTAAAAAAAAAAAAgASE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9AMgIiIiIiIiIiIiIiIi+rRimEZERERERERERERERES0BcM0IiIiIiIiIiIiIiIioi0YphERERERERERERERERFtwTCNiIiIiIiIiIiIiIiIaAuGaURERERERERERERERERbMEwjIiIiIiIiIiIiIiIi2oJhGhEREREREREREREREdEWDNOIiIiIiIiIiIiIiIiItmCYRkRERERERERERERERLQFwzQiIiIiIiIiIiIiIiKiLRimEREREREREREREREREW3BMI2IiIiIiIiIiIiIiIhoC4ZpRERERERERERERERERFswTCMiIiIiIiIiIiIiIiLagmEaERERERERERERERER0RYM04iIiIiIiIiIiIiIiIi2YJhGREREREREREREREREtAXDNCIiIiIiIiIiIiIiIqItGKYRERERERERERERERERbcEwjYiIiIiIiIiIiIiIiGgLhmlEREREREREREREREREWzBMIyIiIiIiIiIiIiIiItqCYRoRERERERERERERERHRFgzTiIiIiIiIiIiIiIiIiLZgmEZERERERERERERERES0BcM0IiIiIiIiIiIiIiIioi0YphERERERERERERERERFtwTCNiIiIiIiIiIiIiIiIaAuGaURERERERERERERERERbMEwjIiIiIiIiIiIiIiIi2oJhGhEREREREREREREREdEWDNOIiIiIiIiIiIiIiIiItmCYRkRERERERERERERERLQFwzQiIiIiIiIiIiIiIiKiLRimEREREREREREREREREW3BMI2IiIiIiIiIiIiIiIhoC4ZpRERERERERERERERERFswTCMiIiIiIiIiIiIiIiLagmEaERERERERERERERER0RYM04iIiIiIiIiIiIiIiIi2YJhGREREREREREREREREtAXDNCIiIiIiIiIiIiIiIqItGKYRERERERERERERERERbcEwjYiIiIiIiIiIiIiIiGgLhmlEREREREREREREREREWzBMIyIiIiIiIiIiIiIiItqCYRoREREREREREREREdH/354dCAAAAAAI8reeYIPSCIZMAwAAAAAAgCHTAAAAAAAAYMg0AAAAAAAAGDINAAAAAAAAhkwDAAAAAACAIdMAAAAAAABgyDQAAAAAAAAYMg0AAAAAAACGTAMAAAAAAIAh0wAAAAAAAGDINAAAAAAAABgyDQAAAAAAAIZMAwAAAAAAgCHTAAAAAAAAYMg0AAAAAAAAGDINAAAAAAAARoLbGWyOn9joAAAEemlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDIxLTAzLTIzPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjIyMzFmYjU1LWU0NzQtNGVlNi04YTQ0LWZiOThhMjNjZTEzMDwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz7igKIgTWVtYmVyc2hpcCBDQVJEIOKAojwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6cGRmPSdodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvJz4KICA8cGRmOkF1dGhvcj5MaXZ2eSBOYWxsaXBvZ3U8L3BkZjpBdXRob3I+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YTwveG1wOkNyZWF0b3JUb29sPgogPC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9J3InPz4pIJ27AAAAAElFTkSuQmCC'
        doc.addImage(imgData, 'JPEG', 0, 0, 320, 220);
        doc.setFontSize(18);
        doc.text(146, 100, a);
        doc.text(146, 113, b);
        doc.text(146, 126, c);
        doc.text(146, 140, d);
        doc.save('Member Card.pdf')
      }
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.RangeOfNumber = function (rmn) {
    $http({
      method : 'POST',
      url : '/rangeofnumber',
      data : rmn
    }).then(function success(response){
      $scope.rnms = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchMemberReport = function () {
    $http({
      method : 'GET',
      url : '/searchmemberreport',
    }).then(function success(response){
      $scope.lsrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.LabelSearchReport = function (labelsearch) {
    $http({
      method : 'POST',
      url : '/labelsearchreport',
      data : labelsearch
    }).then(function success(response){
      $scope.lsrs = response.data;
      // console.log($scope.lsrs)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.removeSearchLabel = function (lsr) {
    $http({
      method : 'POST',
      url : '/removesearchlabel',
      data : lsr
    }).then(function success(response){
      alert('Removed Successfully')
      var index = $scope.lsrs.indexOf(lsr);
      $scope.lsrs.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.PrintSearchLabelReport = function () {
    $http({
      method : 'GET',
      url : '/printsearchlabelreport',
    }).then(function success(response){
      $scope.psls = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.FilledTestingReport = function(){
    $http({
      method : 'GET',
      url : '/filledtestingreport'
    }).then(function success(response){
      $scope.members = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.failedCount = function(){
    $http({
      method : 'GET',
      url : '/failedletter'
    }).then(function success(response){
      $scope.fcount = response.data.length;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.FailedLetter = function(){
    $http({
      method : 'GET',
      url : '/failedletter'
    }).then(function success(response){
      $scope.fletters = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.PrintFailedLetter = function(fletter){
    $http({
      method : 'POST',
      url : '/printfailedletter',
      data : fletter
    }).then(function success(response){
      $scope.pfdata = response.data.data[0];
      $scope.pftable = response.data.table;
      var doc = new jsPDF("p", "pt", "a4");
      var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABMCAMAAAAr+55XAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAGSUExURbS2uSEujgAAACMylf///yIwkiIwj72/wgYNSfz8/Pf39+rq69jZ2+fn6SQzmePk5Xx+fSMjIBopkjRAmO7v7/X19ZWWmQQFCMPEx5yen0xUkD9KmYqNqLGztTk7Oy06lhIgh/Ly846Qkbm7vouSw8zO0ba5vGdtmhkaGhEcdoWHiMjKz0RNjx8sjHN1ddPU2AYJLVRdnN7f4mBhYP0fI2tzpicpKSIxmMDBxX+EqRkniaaoqnR5pkxNTcPGzCk1jamsu93c3bW3ugYTgERFRf3Z2bG4wPYOE1dYWA4RFSk2lBEZXCArgXqBuElSm6Cis4GIvO/v8Hh8nM/Q1LW2xTA8jlxkpGdnZ09YoOUrLjEyLs2ZmlthldZqbKusrtGIiqGjpJCUsaGlwGpysZebtBsndWNqpNNBROY/Qt7S09KvsGxsbdU0N9ROUTxFi/UuMdJ6e+zs9Zabxru9yLCxsFFSU9paXMReYMKys9fExCowMmFmjsCdnbmpqre727HCxS01b/fo6NLT7Cs5oaFkZEdwTKYcCPQAAACGdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8A2ZlaHQAABAR6VFh0UmF3IHByb2ZpbGUgdHlwZSBnaWY6eG1wIGRhdGF4bXAAAEiJlVZJciQ3DLzzFfMEEhsJ/4arwwdH+OCDn+8ES9JIGs043BXNqiZZQAKZADv9/sf57Z8///q2+t8d9/QNn1IKJz611WzF2IZpFcpGplbNbfMi2meMcYgw7yYxo5VVFmdZNQtjbzOXlmqveFG5dtkqhjsMMuMlIj68KfOsjXtthhfxFSuU45dN25VjJcwnYBE7gYL7s4AterdfHN+NYG7EK/L2BmVtsjQTkCU79U6x0majBTSZAQwzlR1zhQEXl2BuYpawjjk6uDNG7KfFlPDQsSnfEQg+XcQboREwGHclEbFPgT1rKxFZq4IL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'
      doc.addImage(imgData, 'JPEG', 15, 30, 560, 70);
      doc.setFontSize(12);
      doc.text(50, 120, 'American Bucking Bull');
      doc.text(50, 135, '101 W. Riverwalk');
      doc.text(50, 150, 'Pueblo CO 81003');
      doc.text(50, 165, 'Phone: 719-242-2747');
      doc.text(50, 180, 'Fax: 719-242-2746');
      doc.text(50, 195, 'www.americanbuckingbull.com');
      doc.text(50, 230, $scope.pfdata.tdate);
      doc.text(50, 250, $scope.pfdata.Membername+' '+$scope.pfdata.UserName);
      doc.text(50, 270, 'Dear Breeder,');
      doc.text(50, 300, 'Please take a tail hair sample for the following animals. The first sample sent in was not usable due to')
      doc.text(50, 315, 'either contamination, over saturation, or a mixture. When taking a hair sample, please take the long')
      doc.text(50, 330, 'hairs from the very end of the tail.  Please also be sure to pull the hairs out, not cut them.  This will')
      doc.text(50, 345, 'help to ensure that the root is still attached to the tail hair.  We will need about 10 hairs per animal') 
      doc.text(50, 360, 'that has failed testing.  After the hair sample has been collected, place it on the tail hair card provided')
      doc.text(50, 375, 'and label it with the animal registration')
      doc.autoTable({
        margin: { top: 400 },
        columns: [
        { header: 'Animal', dataKey: 'Animal' },
        { header: 'PrivateHerd', dataKey: 'PrivateHerd' },
        { header: 'RegNo', dataKey: 'RegNo' },
        ],
        body: $scope.pftable,
      });
      doc.text(50,550, 'If you have any questions feel free to contact the ABBI office and our staff  will be happy to assist you.')
      doc.text(50,580,'Thank you,')
      doc.text(50,595,'Marlissa Gonzalez')
      doc.text(50,610,'Registration Manager')
      doc.save('Letter.pdf')
    },function error(response){
      // alert('Error occured. Please try again later!');
    });
}
$scope.FailedLetterSearch = function (letfailsearch) {
  $http({
    method : 'POST',
    url : '/failedlettersearch',
    data : letfailsearch
  }).then(function success(response){
    $scope.flvs = response.data;
    $scope.flvs.push(response.data);
      // console.log($scope.lsrs)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
$scope.FailedLetterView = function(){
  $http({
    method : 'GET',
    url : '/failedletterview'
  }).then(function success(response){
    $scope.flvs = response.data;
  },function error(response){
    // alert('Error occured. Please try again later!');
  })
}
$scope.failedLetterPrints = function(flv){
  $http({
    method : 'POST',
    url : '/failedLetterprints',
    data : flv
  }).then(function success(response){
    $scope.pfdata1 = response.data.data1[0];
    $scope.pftable1 = response.data.table1;
    var doc = new jsPDF("p", "pt", "a4");
    var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABMCAMAAAAr+55XAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAGSUExURbS2uSEujgAAACMylf///yIwkiIwj72/wgYNSfz8/Pf39+rq69jZ2+fn6SQzmePk5Xx+fSMjIBopkjRAmO7v7/X19ZWWmQQFCMPEx5yen0xUkD9KmYqNqLGztTk7Oy06lhIgh/Ly846Qkbm7vouSw8zO0ba5vGdtmhkaGhEcdoWHiMjKz0RNjx8sjHN1ddPU2AYJLVRdnN7f4mBhYP0fI2tzpicpKSIxmMDBxX+EqRkniaaoqnR5pkxNTcPGzCk1jamsu93c3bW3ugYTgERFRf3Z2bG4wPYOE1dYWA4RFSk2lBEZXCArgXqBuElSm6Cis4GIvO/v8Hh8nM/Q1LW2xTA8jlxkpGdnZ09YoOUrLjEyLs2ZmlthldZqbKusrtGIiqGjpJCUsaGlwGpysZebtBsndWNqpNNBROY/Qt7S09KvsGxsbdU0N9ROUTxFi/UuMdJ6e+zs9Zabxru9yLCxsFFSU9paXMReYMKys9fExCowMmFmjsCdnbmpqre727HCxS01b/fo6NLT7Cs5oaFkZEdwTKYcCPQAAACGdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8A2ZlaHQAABAR6VFh0UmF3IHByb2ZpbGUgdHlwZSBnaWY6eG1wIGRhdGF4bXAAAEiJlVZJciQ3DLzzFfMEEhsJ/4arwwdH+OCDn+8ES9JIGs043BXNqiZZQAKZADv9/sf57Z8///q2+t8d9/QNn1IKJz611WzF2IZpFcpGplbNbfMi2meMcYgw7yYxo5VVFmdZNQtjbzOXlmqveFG5dtkqhjsMMuMlIj68KfOsjXtthhfxFSuU45dN25VjJcwnYBE7gYL7s4AterdfHN+NYG7EK/L2BmVtsjQTkCU79U6x0majBTSZAQwzlR1zhQEXl2BuYpawjjk6uDNG7KfFlPDQsSnfEQg+XcQboREwGHclEbFPgT1rKxFZq4IL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'
    doc.addImage(imgData, 'JPEG', 15, 30, 560, 70);
    doc.setFontSize(12);
    doc.text(50, 120, 'American Bucking Bull');
    doc.text(50, 135, '101 W. Riverwalk');
    doc.text(50, 150, 'Pueblo CO 81003');
    doc.text(50, 165, 'Phone: 719-242-2747');
    doc.text(50, 180, 'Fax: 719-242-2746');
    doc.text(50, 195, 'www.americanbuckingbull.com');
    doc.text(50, 230, $scope.pfdata1.tdate);
    doc.text(50, 250, $scope.pfdata1.Membername+' '+$scope.pfdata1.UserName);
    doc.text(50, 270, 'Dear Breeder,');
    doc.text(50, 300, 'Please take a tail hair sample for the following animals. The first sample sent in was not usable due to')
    doc.text(50, 315, 'either contamination, over saturation, or a mixture. When taking a hair sample, please take the long')
    doc.text(50, 330, 'hairs from the very end of the tail.  Please also be sure to pull the hairs out, not cut them.  This will')
    doc.text(50, 345, 'help to ensure that the root is still attached to the tail hair.  We will need about 10 hairs per animal') 
    doc.text(50, 360, 'that has failed testing.  After the hair sample has been collected, place it on the tail hair card provided')
    doc.text(50, 375, 'and label it with the animal registration')
    doc.autoTable({
      margin: { top: 400 },
      columns: [
      { header: 'Animal', dataKey: 'Animal' },
      { header: 'PrivateHerd', dataKey: 'PrivateHerd' },
      { header: 'RegNo', dataKey: 'RegNo' },
      ],
      body: $scope.pftable1,
    });
    doc.text(50,550, 'If you have any questions feel free to contact the ABBI office and our staff  will be happy to assist you.')
    doc.text(50,580,'Thank you,')
    doc.text(50,595,'Marlissa Gonzalez')
    doc.text(50,610,'Registration Manager')
    doc.save('Letter.pdf')
  },function error(response){
    // alert('Error occured. Please try again later!');
  })
}
$scope.failedLetterDelete = function(flv){
  // console.log(flv)
  $http({
    method : 'POST',
    url : '/failedletterdelete',
    data : flv
  }).then(function success(response){
    alert('Removed Successfully')
    var index = $scope.flvs.indexOf(flv);
    $scope.flvs.splice(index, 1);
  },function error(response){
    // alert('Error occured. Please try again later!');
  })
}
$scope.RegNoRange = function(regnorange){
  $http({
    method : 'POST',
    url : '/regnorange',
    data : regnorange
  }).then(function success(response){
    $scope.rnrs = response.data;
  },function error(response){
    // alert('Error occured. Please try again later!');
  })
}
$scope.FailedLetterRegNoRange = function(){
  $http({
    method : 'GET',
    url : '/failedletterregnorange'
  }).then(function success(response){
    $scope.rnrs = response.data;
  },function error(response){
    // alert('Error occured. Please try again later!');
  })
}
$scope.RegNoRangeDelete = function(rnr){
  $http({
    method : 'POST',
    url : '/regnorangedelete',
    data : rnr
  }).then(function success(response){
    alert('Removed Successfully')
    var index = $scope.rnrs.indexOf(rnr);
    $scope.rnrs.splice(index, 1);
  },function error(response){
    // alert('Error occured. Please try again later!');
  })
}
});
//-----------------------------------------------------------DNA Testing-------------------------------------------------------------
app.controller('DnaTestController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.changeStatus = function(dnatest){
    if(dnatest.status == 'Pending-Sent'){
      $scope.showbatch = true;
      $scope.withoutbatch = true;
      $scope.withbatch = false;
    }
    else{
      $scope.dnas = {};
      $scope.showbatch = false;
      $scope.withoutbatch = false;
      $scope.withbatch = false;
    }
  }
  $scope.CattleService = function(){
    $http({
      method : 'GET',
      url : '/cattleservice'
    }).then(function success(response){
      $scope.ccs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.batchList = function(){
    $http({
      method : 'GET',
      url : '/batchlist'
    }).then(function success(response){
      $scope.bls = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DnaTesting = function(dnatest){
    $http({
      method : 'POST',
      url : '/dnatesting',
      data : dnatest
    }).then(function success(response){
      $scope.dnas = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowAddreg = function(val){
    // console.log(val)
    $scope.addregno = true;
    $scope.addregno1 = true;
    $scope.addtolist = true;
    $scope.showregeditadd = val;
  }
  $scope.ResetDnaTesting = function(dnatest){
    $scope.dnatest = {};
  }
  $scope.DnaTestingMail = function(dnatest){
    // alert('working')
    $http({
      method : 'POST',
      url : '/dnatestingcsvmail',
      data : dnatest
    }).then(function success(response){
      alert('Email Sent Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
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
  $scope.GetMemQuickList = function(){
    $http({
      method : 'GET',
      url : '/getmemquicklist'
    }).then(function success(response){
      $scope.members = response.data.member;
      $scope.lists = response.data.list;
      // console.log($scope.mirs)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddEarnings = function(addearnings,editanimal){
    $http({
      method : 'POST',
      url : '/addearningsdata',
      data : {addearnings : addearnings,editanimal : editanimal}
    }).then(function success(response){
      $scope.earnings = response.data;
      // alert('Added Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateEarning = function(earning){
    $http({
      method : 'POST',
      url : '/updateaniearning',
      data : earning
    }).then(function success(response){
      alert('Updated Successfully');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteAnimalEarning = function(earning){
    $http({
      method : 'POST',
      url : '/deleteanimalearning',
      data : earning
    }).then(function success(response){
      alert('Removed Successfully')
      var index = $scope.earnings.indexOf(earning);
      $scope.earnings.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowBatchData = function(dnatest){
    $scope.editanimaldna=false;
    $scope.withbatch = true;
    $scope.withoutbatch = true;
    $scope.editanimaldna1=false;
    $http({
      method : 'POST',
      url : '/showbatchdata',
      data : dnatest
    }).then(function success(response){
      $scope.batches = response.data.data;
      $scope.file = response.data.file[0];
      // console.log($scope.file)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EditAnimalInDNA = function(dna){
    $scope.editanimaldna=true;
    $scope.editanimaldna1=true;
    $scope.withbatch = false;
    $scope.withoutbatch = true;
    $http({
      method : 'POST',
      url : '/editanimalsdata',
      data : dna
    }).then(function success(response){
      $scope.editanimal = response.data.a[0];
      $scope.memberpanel = response.data.b[0];
      $scope.pedigreepanel = response.data.c[0];
      $scope.dnapanel = response.data.d;
      $scope.previousowner = response.data.e;
      $scope.offspring = response.data.f;
      $scope.eidinformation = response.data.g;
      $scope.earnings = response.data.h;
      $scope.regno = response.data.a[0].RegNo;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});



//-----------------------------------------------------------DNA Verify-------------------------------------------------------------
app.controller('DNAVerifyController',  function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,fileUpload){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.DNAVerifyData = function(dnaverify){
    // console.log(dnaverify)
    $http({
      method : 'POST',
      url : '/dnaverifydata',
      data : dnaverify
    }).then(function success(response){
      $scope.dverifys = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DNAVerifySubmit = function(dnaverify,dverifys){
    if(dnaverify == null || dnaverify == ''){
      alert('At least one offspring and one parent must be provided.');
    }
    else{    
      // console.log(dnaverify)
      // console.log(dverifys)
      $http({
        method : 'POST',
        url : '/dnaverifysubmit',
        data : {offspring : dnaverify, parent : dverifys}
      }).then(function success(response){
        $scope.dverifydata = response.data;
        $scope.head = {'Type':'Parent','Type':'Mating'}
      },function error(response){
        alert('Error occured. Please try again later!');
      })
    }
  }


  $scope.DNATestRes = function(dnares){
    if(!dnares){
      alert('Add File')
  } else {
    var file = dnares.file;
    console.log(file,'file')
    var type = file.name.split('.')[1].includes(['csv'])
   
    if(type) {
      var uploadUrl = "/dnatestres";
          fileUpload.uploadFileToUrl(file, uploadUrl)
          }
          if(!type) {
            alert('File Invalid!')
          }
  }
    
  };

  $scope.ShowDNARes = function(){
    $http({
        method : 'GET',
        url : '/showdnares'
      }).then(function success(response){
        $scope.sdrs = response.data;
      },function error(response){
        alert('Error occured. Please try again later!');
      })
  }
  $scope.ReleaseDB = function(){
    $http({
        method : 'POST',
        url : '/releasedb'
      }).then(function success(response){
        alert('Saved to Database');
      },function error(response){
        alert('Error occured. Please try again later!');
      })
  }
  $scope.ClearTemp = function(){
    $http({
        method : 'POST',
        url : '/cleartemp'
      }).then(function success(response){
        // var index = $scope.sdrs.indexOf(sdr);
        $scope.sdrs = [];
        alert('Cleared Temporary Table');
      },function error(response){
        alert('Error occured. Please try again later!');
      })
  }
});
//-----------------------------------------------------------Event Online-------------------------------------------------------------
  app.controller('EventsController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce,$rootScope,$filter){
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
      extend:    'print',
      text:      '<i class="fa fa-print" aria-hidden="true"></i> Print',
      titleAttr: 'Print'
    },
    {
      extend:    'csvHtml5',
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
    },
    {
      extend:    'excel',
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
    },
    ]
    )
    ;
    // $scope.data = {
    //   textInput: 'Enter Event Here..!',
    //   options: {
    //     language: 'en',
    //     allowedContent: true,
    //     entities: false
    //   }
    // };
    $scope.getEventYear = function(){
      $http({
        method : 'GET',
        url : '/geteventyear'
      }).then(function success(response){
        $scope.eyears = response.data
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.DateYear = function(){
      var year0 = (new Date().getFullYear())-1;
      $scope.year0 = year0; 
      var year = new Date().getFullYear();
      $scope.year = year; 
      var year1 = (new Date().getFullYear())+1;
      $scope.year1 = year1; 
      var year2 = (new Date().getFullYear())+2;
      $scope.year2 = year2; 
    }
    $scope.getEventData = function(events){
      $http({
        method : 'POST',
        url : '/geteventsdata',
        data : events
      }).then(function success(response){
        $scope.eventslists = response.data
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.getEventDateDropdown = function(){
      $http({
        method : 'GET',
        url : '/geteventdatedropdown'
      }).then(function success(response){
        $scope.eyears1 = response.data
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.DeleteEventdata = function(eventslist){
      $http({
        method : 'POST',
        url : '/deleteeventsdata',
        data : eventslist
      }).then(function success(response){
        alert('Removed Successfully')
        var index = $scope.eventslists.indexOf(eventslist);
        $scope.eventslists.splice(index, 1);
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.EditEventData = function(eventslist){
      $scope.hideeventlist = true;
      $scope.hideeventtable = true;
      $scope.showedittable = true;
      $http({
        method : 'POST',
        url : '/editeventdata',
        data : eventslist
      }).then(function success(response){
        // $scope.html = $sce.trustAsHtml(response.data.details[0].Description);
        $scope.data = response.data.details[0].Description;
        $scope.editevents = response.data.details[0];
        $scope.editevents.BeginDate = $filter('date')(response.data.details[0].BeginDate, 'MM/dd/yyyy');
        $scope.editevents.OpenDate = $filter('date')(response.data.details[0].OpenDate, 'MM/dd/yyyy');
        $scope.editevents.EndDate = $filter('date')(response.data.details[0].EndDate, 'MM/dd/yyyy');
        $scope.editevents.CloseDate = $filter('date')(response.data.details[0].CloseDate, 'MM/dd/yyyy');
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.hideEventsData = function(){
      $scope.hideeventlist = false;
      $scope.hideeventtable = false;
      $scope.showedittable = false;
    }
    $scope.PopulateAdditional = function(){
      $http({
        method : 'GET',
        url : '/populateadditional',
      }).then(function success(response){
        $scope.paes = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.ScheduledPayments = function(eventslist){
      $http({
        method : 'POST',
        url : '/schedulepayments',
        data : eventslist
      }).then(function success(response){
        $scope.spss = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.AddEventAdditionalTable = function(etable){
      $http({
        method : 'POST',
        url : '/addeventadditionaltable',
        data : etable
      }).then(function success(response){
        $scope.stes = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.ShowTemEventTable = function(){
      $http({
        method : 'GET',
        url : '/showtempevent'
      }).then(function success(response){
        $scope.stes = response.data
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.DeleteTempEvent = function(ste){
      // console.log(ste);
      $http({
        method : 'POST',
        url : '/deletetempevent',
        data : ste
      }).then(function success(response){
        var index = $scope.stes.indexOf(ste);
        $scope.stes.splice(index, 1);
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.SaveAddEvent = function(addevnt,stes,fee,data){
      $http({
        method : 'POST',
        url : '/saveaddevent',
        data : {event : addevnt,table : stes,fees : fee, desc : data}
      }).then(function success(response){
        $scope.etable = {};
        $scope.ste = {};
        $scope.fees = {};
        $scope.desc = {};
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.data = {
      textInput: 'pretext',
      options: {
        language: 'en',
        allowedContent: true,
        entities: false
      }
    };
  });
//-------------------------------------------------------Event payment-----------------------------------------
app.controller('EventPaymentController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 

  $scope.EventsDropdown = function(){
    $http({
      method : 'GET',
      url : '/eventdropdown',
    }).then(function success(response){
      $scope.epayments = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.chooseMember = function(epayment){
    // console.log($scope.epayment)
    $http({
      method : 'POST',
      url : '/choosemember',
      data : epayment
    }).then(function success(response){
      $scope.membersdrops = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.chooseDate = function(epayment){
    // console.log($scope.epayment)
    $http({
      method : 'POST',
      url : '/choosedate',
      data : epayment
    }).then(function success(response){
      $scope.datedrops = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchEpayment = function(epayment){
    // console.log($scope.epayment)
    $http({
      method : 'POST',
      url : '/searchepayment',
      data : epayment
    }).then(function success(response){
      $scope.epaymentdatas = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchEpayment1 = function(epayment){
    // console.log($scope.epayment)
    $http({
      method : 'POST',
      url : '/searchepayment1',
      data : epayment
    }).then(function success(response){
      $scope.epaymentdatas = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.modalEventPayment = function(epaymentdata){
    // console.log($scope.epayment)
    $http({
      method : 'POST',
      url : '/modaleventpayment',
      data : epaymentdata
    }).then(function success(response){
      $scope.ep = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EditEventPayments = function(epaymt,ep){
    // console.log($scope.epayment)
    $http({
      method : 'POST',
      url : '/editeventpayments',
      data : {details : epaymt, modal : ep}
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-------------------------------------------Roaster Controller------------------------------------------------
app.controller('RoasterController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.eventIDDropdown = function(){
    $http({
      method : 'GET',
      url : '/eventiddropdown'
    }).then(function success(response){
      $scope.eveids = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AllEventIDDropdown = function(){
    $http({
      method : 'GET',
      url : '/alleventiddropdown'
    }).then(function success(response){
      $scope.eveids = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.RoasterEventList = function(roaster){
    // console.log($scope.epayment)
    $http({
      method : 'POST',
      url : '/roastereventlist',
      data : roaster
    }).then(function success(response){
      $scope.roasterevents = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AdditionalInfoRoaster = function(roaster){
    $http({
      method : 'POST',
      url : '/additionalinforoaster',
      data : roaster
    }).then(function success(response){
      $scope.addeventinfos = response.data.details;
      $scope.buck = response.data.buck[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SaveAddInfo = function(addeventinfo,roaster){
    $http({
      method : 'POST',
      url : '/saveaddinfo',
      data : {eventinfo : addeventinfo, eventid : roaster}
    }).then(function success(response){
      // $scope.addeventinfos = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DownloadAddInfo = function(addeventinfos,roaster){
    $http({
      method : 'POST',
      url : '/downloadaddinfo',
      data : {details : addeventinfos, id : roaster}
    }).then(function success(response){
      $scope.addeventinfos = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------Event Eid Manager------------------------------------------
app.controller('EventEIDManagerController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.EventEidMember = function(){
    $http({
      method : 'GET',
      url : '/eventeidmember'
    }).then(function success(response){
      $scope.eveids = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.eventStatusDropdown = function(){
    $http({
      method : 'GET',
      url : '/eventestatusdropdown'
    }).then(function success(response){
      $scope.evestats = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchEventEidManager = function(eventeidmanager){
    $http({
      method : 'POST',
      url : '/searcheventeidmanager',
      data : eventeidmanager
    }).then(function success(response){
      $scope.eems = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ResetEventEidManager = function(eventeidmanager){
    $scope.eventeidmanager = {};
  }
  $scope.AddNewEIDManager = function(addeid){
    $http({
      method : 'POST',
      url : '/addneweidmanager',
      data : addeid
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EditEIDManager = function(eem,eventeidmanager){
    $http({
      method : 'POST',
      url : '/editeidmanager',
      data : {animal : eventeidmanager, eid : eem}
    }).then(function success(response){
      $scope.eeidms = response.data.details[0];
      $scope.reorders = response.data.table;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteEIDManager = function(eem){
    $http({
      method : 'POST',
      url : '/deleteeidmanager',
      data : eem
    }).then(function success(response){
      var index = $scope.eems.indexOf(eem);
      $scope.eems.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateEIDManager = function(eeidms){
    $http({
      method : 'POST',
      url : '/updateeidmanager',
      data : eeidms
    }).then(function success(response){
      alert('Updated Successfully')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------Event EID Import------------------------------------------
app.controller('EventEIDImportController', function($scope,$http,fileUpload,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.EventEIDImportList = function(){
    $http({
      method : 'GET',
      url : '/eventeidimportlist'
    }).then(function success(response){
      $scope.eeils = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EIDImportEventList = function(){
    $http({
      method : 'GET',
      url : '/eidimporteventlist'
    }).then(function success(response){
      $scope.eiels = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowEIDEventImport = function(eidimport){
    $http({
      method : 'POST',
      url : '/showeidimport',
      data : eidimport
    }).then(function success(response){
      $scope.seis = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.readExcel = function(addimport) {
    let tempE = [];
    /*Checks whether the file is a valid excel file*/
  
     if(!$("#ngexcelfile")[0].files[0]){
       alert('Add File')
     } else{
      var regex = ['xlsx','xls'].includes($("#ngexcelfile")[0].files[0].name.split('.')[1]);
      if(!regex){
        alert('Invalid File!')
      } else{
     var reader = new FileReader();  
     reader.onload = function (e) {  
       var data = e.target.result;  
         var workbook = XLS.read(data, { type: 'binary' });  
       
       var sheet_name_list = workbook.SheetNames;  
       var cnt = 0; 
       sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
         
          
           var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
         if (exceljson.length > 0) { 
           exceljson.forEach(obj=>{
             tempE.push({tagId : obj.TagId , timestamp : obj.Timestamp})
           }) 
         }  
       });  
       $scope.arrayExcel = tempE;
     $http({
      method : 'POST',
      url : '/addeidimport',
      data : {first : addimport, second: tempE}
    }).then(function success(response){
      console.log(response,'iiiiiiiiiiiiii')
      alert(response.data === 'OK' ? 'Import Successfull' : response.data)
      $scope.addimport = {};
    },function error(response){
      alert('Error occured. Please try again later!');
    })
     } 
       reader.readAsBinaryString($("#ngexcelfile")[0].files[0]);  
    }
  }

};
  $scope.AddEIDImport = function(addimport){
    // console.log(addimport)
    var file = addimport;
    var uploadUrl = "/addeidimport";
    fileUpload.uploadFileToUrl(file, uploadUrl);
  };
});
app.service('fileUpload', ['$http', function ($http) {
  this.uploadFileToUrl = function(file, uploadUrl){
      // console.log(file)
      // console.log(uploadUrl)
      var fd1 = new FormData();
      for(var key in file){
        // console.log(file[key])
        fd1.append(key, file[key])
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
//-----------------------------------------------Event EID Export------------------------------------------
app.controller('EIDExportController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.exportSec= false; 
  $scope.exportObj={};
  $scope.FileEID = function(){
    $http({
      method : 'GET',
      url : '/fileeid'
    }).then(function success(response){
      $scope.fes = response.data
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.ViewEIDExport = function(){
    $http({
      method : 'GET',
      url : '/vieweidexport'
    }).then(function success(response){
      $scope.vee = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ViewReorderExport = function(){
    $http({
      method : 'GET',
      url : '/viewreorderexport'
    }).then(function success(response){
      $scope.vre = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ExportEidCount = function(){
    $http({
      method : 'GET',
      url : '/exporteidcount'
    }).then(function success(response){
      $scope.eec = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ViewBatch = function(fes){
    $http({
      method : 'POST',
      url : '/viewbatch',
      data : fes
    }).then(function success(response){
      window.open('http://office.americanbuckingbull.com/OrderExport/OrderExportFiles/'+response.data[0].filename+'')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.CreateOrder = function(ves){
    console.log(ves,'vesss')
    $http({
      method : 'POST',
      url : '/createorder',
      data : {array: ves, exportObj: $scope.exportObj}
    }).then(function success(response){
      $scope.vee = {};
      $scope.exportObj = {};
      alert('Exported Successfully')
      $scope.exportSec = false;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }

  $scope.GetOrderDetails = function(){
    $http({
      method : 'GET',
      url : '/getorderdetails',
    }).then(function success(response){
      $scope.god = response.data
      $scope.exportObj.to='marlissa@pbr.com'
    },function error(response){
      alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteVeOrder = function(ve){
    $http({
      method : 'POST',
      url : '/deleteveorder',
      data : ve
    }).then(function success(response){
      var index = $scope.vee.indexOf(ve);
      $scope.vee.splice(index, 1);
      alert('Deleted Successfully')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------Bulk Email------------------------------------------
app.controller('BulkEmailController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.ViewBulkEmail = function(){
    $http({
      method : 'GET',
      url : '/viewbulkemail'
    }).then(function success(response){
      $scope.bes = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteBulkEmail = function(bes){
    $http({
      method : 'POST',
      url : '/deletebulkemail',
      data : bes
    }).then(function success(response){
      $scope.bes = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
  //-----------------------------------------------Workorder Price------------------------------------------
  app.controller('WorkorderPriceController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
    },
    {
      extend:    'excel',
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
    },
    ]
    )
    ; 
    $scope.ViewWop = function(PriceYear){
      $http({
        method : 'POST',
        url : '/viewwop',
        data:PriceYear
      }).then(function success(response){
        $scope.vwop = response.data
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.UpdateWOPrices = function(vwp){
      $http({
        method : 'POST',
        url : '/Updatewoprices',
        data:vwp
      }).then(function success(response){
        alert('Updated Successfully')
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.NewWOPrice = function(addwop){
      $http({
        method : 'POST',
        url : '/newwop',
        data:addwop
      }).then(function success(response){
        alert('Added Successfully')
        $('#workop').modal('hide');
        $scope.ViewWop();
        $scope.addwop = {};
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.ResetWOPrice = function(PriceYear){
      $scope.PriceYear = {Year: null, Cid: null};
    }
    $scope.AddWop = function(vmds){
      $http({
        method : 'POST',
        url : '/sendmemdue',
        data : vmds
      }).then(function success(response){
        alert('Email Sent')
      },function error(response){
        alert('Email Not Sent');
      })
    }
    $scope.GetPyCat = function(){
      $http({
        method : 'GET',
        url : '/getpycat'
      }).then(function success(response){
        $scope.Priceyear = response.data.Priceyear
        $scope.Category = response.data.Category
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }    
  });
  //-----------------------------------------------Due Email------------------------------------------
  app.controller('MembershipDueController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
    },
    {
      extend:    'excel',
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
    },
    ]
    )
    ; 
    $scope.ViewMemDue = function(){
      $http({
        method : 'GET',
        url : '/viewmemdue'
      }).then(function success(response){
        $scope.vmds = response.data
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.SendEmailMemDue = function(vmds){
      $http({
        method : 'POST',
        url : '/sendmemdue',
        data : vmds
      }).then(function success(response){
        alert('Email Sent')
      },function error(response){
        alert('Email Not Sent');
      })
    }
  });
//-----------------------------------------------Membership Prices------------------------------------------
app.controller('MembershipPricesController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.priceAdmin = function(){
    $http({
      method : 'GET',
      url : '/priceadmin'
    }).then(function success(response){
      $scope.pas = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.editpricetable = false;
  $scope.tableMembershipprice = function(pa){
    $scope.editpricetable = true;
    $http({
      method : 'POST',
      url : '/tablemembershipprice',
      data : pa
    }).then(function success(response){
      $scope.ump = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateMemberPrice = function(ump){
    $http({
      method : 'POST',
      url : '/updatemembershipprice',
      data : ump
    }).then(function success(response){
      alert('Updated Successfully');
      $scope.ump = {};
      $scope.priceAdmin();
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.NewMemberPrice = function(nmp){
    $http({
      method : 'POST',
      url : '/newmembershipprice',
      data : nmp
    }).then(function success(response){
      alert('Added Successfully')
      $('#newmembershipprice').modal('hide')
      $scope.priceAdmin();
      $scope.nmp={};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------Registration Prices------------------------------------------
app.controller('RegistrationPricesController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.viewRegPrices = function(){
    $http({
      method : 'GET',
      url : '/viewregprice'
    }).then(function success(response){
      $scope.vrps = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddRegPrice = function(nrp){
    $http({
      method : 'POST',
      url : '/addregprice',
      data : nrp
    }).then(function success(response){
      $('#NewRegistrationPrice').modal('hide');
      alert('Added Successfully');
      $scope.nrp = {};
      $scope.viewRegPrices();
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.showregprice = false;
  $scope.editRegPrice = function(vrp){
    $scope.showregprice = true;
    $http({
      method : 'POST',
      url : '/editregprice',
      data : vrp
    }).then(function success(response){
      $scope.urp = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateRegPrice = function(urp){
    $http({
      method : 'POST',
      url : '/updateregprice',
      data : urp
    }).then(function success(response){
      alert('Updated Successfully')
      $scope.urp = {};
      $scope.viewRegPrices();
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------view utilities------------------------------------------
app.controller('UtilitiesController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.ViewUtilities = function(){
    $http({
      method : 'GET',
      url : '/viewutilities'
    }).then(function success(response){
      $scope.vus = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddUtility = function(au){
    $http({
      method : 'POST',
      url : '/addutilities',
      data : au
    }).then(function success(response){
     
      $scope.vus = response.data;
      alert('Added Succesfully');
      $('#newUsers').modal('hide');
      $scope.au = {};
      $scope.ViewUtilities();
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.showutilities = false;
  $scope.editUtilities = function(vu){
    $scope.showutilities = true;
    $http({
      method : 'POST',
      url : '/editutilities',
      data : vu
    }).then(function success(response){
      $scope.urp = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.deleteUtilities = function(vu){
    $http({
      method : 'POST',
      url : '/deleteutilities',
      data : vu
    }).then(function success(response){
      // var index = $scope.vus.indexOf(vu);
      // $scope.vus.splice(index, 1);
      alert('Deleted Successfully')
      $scope.ViewUtilities();
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateUtilities = function(urp){
    $http({
      method : 'POST',
      url : '/updateutilities',
      data : urp
    }).then(function success(response){
      alert('Updated Successfully');
      $scope.ViewUtilities();
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ViewExports = function(){
    $http({
      method : 'GET',
      url : '/viewexports'
    }).then(function success(response){
      $scope.ves = response.data
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.showexports = false;
  $scope.EditExports = function(ve){
    $scope.showexports = true;
    $http({
      method : 'POST',
      url : '/editexports',
      data : ve
    }).then(function success(response){
      $scope.ede = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.updateExports = function(ede){
    $http({
      method : 'POST',
      url : '/updateexports',
      data : ede
    }).then(function success(response){
      alert('Updated Successfully')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddExports = function(ade){
    $http({
      method : 'POST',
      url : '/addExports',
      data : ade
    }).then(function success(response){
      $scope.ade = {};
      $scope.ves = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteExports = function(ve){
    $http({
      method : 'POST',
      url : '/deleteexports',
      data : ve
    }).then(function success(response){  
      var index = $scope.ves.indexOf(ve);
      $scope.ves.splice(index, 1);  
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------Database Backup------------------------------------------
app.controller('DatabaseBackupController', function($scope,$http){
  $scope.DatabaseBackup = function(){
    $http({
      method : 'GET',
      url : '/databasebackup'
    }).then(function success(response){
      alert('Backup Succesfull');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------Animal Earnings Upload------------------------------------------
app.controller('AnimalEarningsController', function($scope,$http,fileUpload){
  $scope.UploadEarnings = function(earnings){
    var file = earnings.file;
    var uploadUrl = "/animalearningupload";
    fileUpload.uploadFileToUrl(file, uploadUrl);
  };
});

//-----------------------------------------------Bulk Email Outbox------------------------------------------
app.controller('BulkEmailOutboxController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
   $scope.dge = {
      textInput: 'Enter text here',
      options: {
        language: 'en',
        allowedContent: true,
        entities: false
      }
    };
  $scope.AddQueue = function(dg,selected){
    // console.log($scope.dg)
    $http({
      method : 'POST',
      url : '/addqueue',
      data : {dg:dg,selected:selected}
    }).then(function success(response){ 
      alert('Added to Queue')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SaveDefault = function(dg){
    // console.log($scope.dg)
    $http({
      method : 'POST',
      url : '/savedefault',
      data :dg
    }).then(function success(response){ 
      alert('Saved Successfully')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SendTestMail = function(dg){
    // console.log($scope.dg)
    $http({
      method : 'POST',
      url : '/sendtestmail',
      data :dg
    }).then(function success(response){ 
      alert('Email Sent')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.GetOutboxEmailData = function(){
    $http({
      method : 'GET',
      url : '/getoutboxemaildata'
    }).then(function success(response){
      $scope.goes = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ChangeDG = function(dg){
    // console.log($scope.dg)
    $http({
      method : 'POST',
      url : '/changedg',
      data : dg
    }).then(function success(response){ 
      $scope.dgel = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.selected = [];
  
  $scope.exist = function(item){
    return $scope.selected.indexOf(item) > -1;
    // console.log($scope.selected)
  }
  // select or not select 1 or multi checkbox
  $scope.toggleSelection = function(item){
   var idx = $scope.selected.indexOf(item);
   if(idx > -1){
     $scope.selected.splice(idx, 1);
     // console.log($scope.selected)
   } else {
     $scope.selected.push(item);
     // console.log($scope.selected)
   }
  }
  
  // selectAll or deselectAll
  $scope.checkAll = function(){
    if($scope.selectAll){
      angular.forEach($scope.dg, function(item){
        var idx = $scope.selected.indexOf(item);
        if(idx >= 0){
          return true;
        } else {
          $scope.selected.push(item);
          // console.log($scope.selected)
        }
      })
    } else {
      $scope.selected = [];
    }
  }// checkAll
  $scope.ChangeDG1 = function(dg){
    // console.log($scope.dg)
    $http({
      method : 'POST',
      url : '/changedg1',
      data : dg
    }).then(function success(response){ 
      $scope.dgel = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DGList = function(){
    $http({
      method : 'GET',
      url : '/dglist'
    }).then(function success(response){
      $scope.dgls = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EventList = function(){
    $http({
      method : 'GET',
      url : '/eventlist'
    }).then(function success(response){
      $scope.els = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateOutboxData = function(goe){
    $http({
      method : 'POST',
      url : '/updateoutboxdata',
      data : goe
    }).then(function success(response){ 
      alert('Updated Successfully')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteOutboxData = function(goe){
    $http({
      method : 'POST',
      url : '/deleteoutboxdata',
      data : goe
    }).then(function success(response){ 
      alert('Deleted Successfully')
      var index = $scope.goes.indexOf(goe);
      $scope.goes.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddOutbox = function(addmail){
    $http({
      method : 'POST',
      url : '/addoutbox',
      data : addmail
    }).then(function success(response){ 
      alert('Added Successfully')
      $scope.goes = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------Email Outbox------------------------------------------
app.controller('EmailOutboxController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.ViewEmailOutbox = function(){
    $http({
      method : 'GET',
      url : '/viewemailoutbox'
    }).then(function success(response){
      $scope.veos = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SendEmailOutbox = function(veo){
    $http({
      method : 'POST',
      url : '/sendemailoutbox',
      data : veo
    }).then(function success(response){ 
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
$scope.DeleteEmailOutbox = function(veo){
    $http({
      method : 'POST',
      url : '/deleteemailoutbox',
      data : veo
    }).then(function success(response){ 
      var index = $scope.veos.indexOf(veo);
      $scope.veos.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------Error Log------------------------------------------
app.controller('ErrorLogController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce,$filter){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.ViewErrorLog = function(){
    $http({
      method : 'GET',
      url : '/viewerrorlog',
    }).then(function success(response){ 
      $scope.vels = response.data;
      $scope.vels.timestamp = $filter('date')( response.data.timestamp, 'MM/dd/yyyy');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------Certificates------------------------------------------
app.controller('CertificateController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce,$filter){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.ViewCertificates = function(){
    $scope.certifactehide=true;
    $scope.offspvoch = false;
    $http({
      method : 'GET',
      url : '/viewcertificates',
    }).then(function success(response){ 
      $scope.certis = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EditCertificateInc = function(cer){
    $http({
      method : 'POST',
      url : '/editcertificatesinc',
      data : cer
    }).then(function success(response){ 
      $scope.ecs = response.data[0];
      $scope.ecs.CertificateDate = $filter('date')( response.data[0].CertificateDate, 'MM/dd/yyyy');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.GenerateVoucher = function(ecs){
    $http({
      method : 'POST',
      url : '/generatevoucher',
      data : ecs
    }).then(function success(response){ 
      $scope.gvs = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.printToCart = function(printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
      }
  $scope.GenerateVoucher1 = function(ecs){
    $http({
      method : 'POST',
      url : '/generatevoucher1',
      data : ecs
    }).then(function success(response){ 
      $scope.gvs1 = response.data;
      // var data = $scope.gvs1;
      // var doc = new jsPDF('p', 'mm', 'a0');
      // var imgData = 'data:image/jpeg;base64,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H+0Yfl/LJ/Cv1W/Y8/4Jy/Bv9gefxVJ8JfBf/CJt44vUv9aP9q3199rmTeVk/wBKml8sjzG+VNo56cDEfwR/4Jt/Bn9nP9pTxn8YPBvgs6P8RfiEZB4g1b+1b24N+ssyzP8AuZZmgjy6If3can5aAP5wfgh/wTn+APiv/gq7+0F8Lf2vPiH4j+D91p+sXV/4c1SHWrLR7PURJdSylpri+t5Yv3kLxNGdyAnf97+H9D/+CWn/AASv/wCCfvw5/b40PXvgX+0j4q+IHxO+Hs0s9tpMnifS7y1vgbdonK+VYx/aYhHNy0MjKCMZGMH9I/2wP+CWXwB/b4lt5/i58L/D/i++tY/Ji1FzLZ6iiDHyC6t3SfZxnHmYHYDmrn7IX/BNH4E/sE21xH8I/hj4d8GzXkQiuL6COS51C5QHOx7udnndQSeGc0AQeLf+ClnwV8E/toaL+z3qPjIWvxe1+NZtP0AaTfuJUaKWVT9pWA2y/uoZG2tICCMV7zaHKn73y4HI28YyOPXmvC/FP/BND4KeNf2zNH/aB1LwW1x8XdAgW20/Xxq9/EbeNYpIlX7MkwtjhJXGTFk7uSa92hVgzM27nseo6++PSgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAChmCKSeAOST2oJxXBfH/9pLwP+zN4e0bVvHPiKy8O6frus2mg2Es+9vtV7dSCOCFQgJ+ZuST8oVWJwMkAHebxjqPWk8xc43LnOMZ74z/KvP8A9o79pHwX+yH8FtZ+InxC1b/hH/B/h2IXGoagLOa6NsrMqAmO3R3bLMBlVPUV4D+y3/wXV/ZR/bS+MNn8P/h18XtN1vxZqkMjWemXekalpf20IMusT3ltCkkm3ny1cuVViBhWNAH1/uGOopQwPevj79qz/guf+yz+xR8Zb74e/E74pDwv4w0uGGa708eGdWvBGkqB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GTzUK7wdyg8gip/+Cryf8Yu6Ud24SfEHwhtVkOG/4n9gQD+WQeOVUepr5Y/4K+eAPEH7F2ieOvFXhTS9S1j4W/tAXWn6Z4u0q1VSvhvXzdWyW+tBf+eVykfk3AQfeSF+rHIB9cftp/8ABVL4A/8ABO2XRYPjL8SdL8I6hr6s9lYi1utQvXjGQZWgtI5ZUjDKyCRgELDbuJBx7d8MfiZoHxe8D6b4m8L61pviDw7rlsl7p2pWFwlxbXsLDIkjkU4Ze3rxzXwL8Zf22/hP/wAEvP8Agot8VfFvx8i1LwjpvxU0HRIfCvi86LfataajFaQyx3GkrJbQyskqSETFWChxMGySK9D/AOCZfjnSP2dP2PNDuvFWiat8N9N+JnxD1efwfoGpWtybqyt9S1C4nsIJIdu633RAtscKseQOBigD7XBzRUdudwbHIB2578cc/jmpKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKjuE3joSMHOOp9h/jUlFAFVrfcuQvlsWDcA8N05weeD60rxNtBVT+7BwuQCeCBg/h69Cas0UAU0tWEZDLkK28jbgHB4wMHoAMY5yo6ZqRYmKqFUoqn7uAox+Rx69jkDpViigCrHHIj8K3XJPGDn2/U4HPr1pLaH+Jk+8d5O3qTxnByeRxg9AQO1W6KAKuxnyNhUdjjjPY49jj07dacYyw/1eVYjjp34PPoMds9KsUUAVVhdCf8AZUjcF56emM+nfJwKkRCf4WXHAx9eevPpU1FAFa5g81duPlxjAByORjn/ADjr2pHiZuQhZ94bD4A9OuDwMZ9cgVaooAqrZqQNyhlyTgrgEkEZPuc85oeDLjcjNzu3HBZSOMgYx2+vJq1RQAyEEZyOe/p+FPoooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKK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'
      // for(i=0; i<data.length; i++){
      //   doc.addImage(imgData, 'JPEG', 10, 10, 80, 50);
      //   doc.setFontSize(15);
      //   doc.text(42, 34, data[i].SireName.toString())
      //   doc.setFontSize(9);
      //   doc.text(45, 42, data[i].SireRegNo.toString())
      //   doc.text(45, 46, data[i].CertificateNo.toString())
      //   doc.setFontSize(10);
      //   doc.text(62, 57, data[i].VoucherNo.toString())
      // }
      // doc.save('Vouchers.pdf')
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ViewCertificate = function(ecs){
    $http({
      method : 'POST',
      url : '/viewcertificate',
      data : ecs
    }).then(function success(response){ 
      $scope.vcss = response.data;
      var id = $scope.vcss[0].SireRegno;
      var id1 = id.toString();
      // console.log(typeof(id1))
      var doc = new jsPDF('l', 'mm', 'a4');
      doc.addImage(imgData, 'JPEG', 15, 30, 267, 160);
      doc.setFontSize(16);
      doc.text(249, 41, $scope.vcss[0].CertificateNumber)
      doc.text(140, 107, $scope.vcss[0].Animal)
      doc.text(160, 122, id1);
      doc.text(140, 131, $scope.vcss[0].CertificateDate);
      doc.text(80, 153, $scope.vcss[0].BreederDisplay);
      doc.save('Breeder.pdf')
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.certifactehide=true;
  $scope.paymentParticipants = function(){
    $scope.paymentid=false;  
    $scope.showpayment=false ; 
  }
  $scope.save = function(){
    $scope.paymentid=true;  
    $scope.showpayment=true ; 
    $scope.viewanimal=true;
  }
  $scope.viewExitAnimals = function(){
    $scope.viewanimal=false;
  }
  $scope.offspringVoucher=function(){
    $scope.offspvoch = true;
    $scope.certifactehide = false;
    $http({
      method : 'GET',
      url : '/offspringvoucher',
    }).then(function success(response){ 
      $scope.offvous = response.data;
      $scope.offvou.DtCreated = $filter('date')(  response.data.DtCreated, 'MM/dd/yyyy');
      $scope.offvou.DtUsed = $filter('date')(  response.data.DtUsed, 'MM/dd/yyyy');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.OffSpringDeleteCert = function(offvou){
    $http({
      method : 'POST',
      url : '/offspringdeletecert',
      data : offvou
    }).then(function success(response){ 
      var index = $scope.offvous.indexOf(offvou);
      $scope.offvous.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.OffSpringUpdateCert = function(offvou){
    $http({
      method : 'POST',
      url : '/offspringupdatecert',
      data : offvou
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddOffspringVouch = function(addoffspringvouch){
    $http({
      method : 'POST',
      url : '/offspringaddcert',
      data : addoffspringvouch
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.GetAnimalInfo = function(vanimal){
    $http({
      method : 'POST',
      url : '/getanimalinfo',
      data : vanimal
    }).then(function success(response){
      $scope.gavs = response.data[0];
      $scope.gavs.CertificateDate = $filter('date')(Date.now(), 'MM/dd/yyyy');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddBCAnimalInv = function(gavs,vanimal){
    $http({
      method : 'POST',
      url : '/addbcanimalinv',
      data : {animaldata : gavs,animal : vanimal}
    }).then(function success(response){
      alert('Added Successfully')
      $('#myModal5').modal('hide');
      $scope.ViewCertificates();
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateBCAnimalInv = function(ecs){
    $http({
      method : 'POST',
      url : '/updatebcanimalinv',
      data : ecs
    }).then(function success(response){
      $scope.uba = response.data;
      alert('Updated Successfully')
      $('#editAnimal1').modal('hide');
      $scope.ViewCertificates();
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------Super Stakes-----------------------------------------
app.controller('SuperStakesController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.StakesYearList = function(){
    $http({
      method : 'GET',
      url : '/stakesyearlist',
    }).then(function success(response){ 
      $scope.syls = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SuperStakesData = function(syear){
    $http({
      method : 'POST',
      url : '/superstakesdata',
      data : syear
    }).then(function success(response){
      $scope.pos = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ParticipantsSS = function(syear){
    $http({
      method : 'POST',
      url : '/participantsss',
      data : syear
    }).then(function success(response){
      $scope.Participants = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------Buckers-----------------------------------------
app.controller('BuckersController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.BProgramYearDropdown = function(){
    $http({
      method : 'GET',
      url : '/bprogramyeardropdown',
    }).then(function success(response){ 
      $scope.bpys = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.BuckersYearData = function(bpy){
    $http({
      method : 'POST',
      url : '/buckersyeardata',
      data : bpy
    }).then(function success(response){
      $scope.btds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteBuckData = function(btd){
    $http({
      method : 'POST',
      url : '/deletebuckerdata',
      data : btd
    }).then(function success(response){ 
      var index = $scope.btds.indexOf(btd);
      $scope.btds.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.GetBuckersData = function(buckeranimal){
    $http({
      method : 'POST',
      url : '/getbuckersdata',
      data : buckeranimal
    }).then(function success(response){
      $scope.abuds = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddBuckersData = function(abuds,buckeranimal){
    $http({
      method : 'POST',
      url : '/addbuckersdata',
      data : {details : abuds, id : buckeranimal}
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.EditBuckersData = function(btd){
    $http({
      method : 'POST',
      url : '/editbuckersdata',
      data : btd
    }).then(function success(response){
      $scope.ebds = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateBuckersData = function(btd){
    $http({
      method : 'POST',
      url : '/updatebuckersdata',
      data : btd
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//-----------------------------------------------EID Order Import-----------------------------------------
app.controller('EIDOrderImportController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.newImportArray = []
  $scope.fileType = '';
  $scope.SelectFile = function (file) {
    $scope.SelectedFile = file;
  };
  $scope.Upload = function () {
    // alert('hi')
    if(!$scope.SelectedFile){
      alert('Add File')
    } else {
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test($scope.SelectedFile.name.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
        var reader = new FileReader();
          //For Browsers other than IE.
          if (reader.readAsBinaryString) {
            reader.onload = function (e) {
              $scope.ProcessExcel(e.target.result);
            };
            reader.readAsBinaryString($scope.SelectedFile);
          } else {
              //For IE Browser.
              reader.onload = function (e) {
                var data = "";
                var bytes = new Uint8Array(e.target.result);
                for (var i = 0; i < bytes.byteLength; i++) {
                  data += String.fromCharCode(bytes[i]);
                }
                $scope.ProcessExcel(data);
              };
              reader.readAsArrayBuffer($scope.SelectedFile);
            }
          } else {
            $window.alert("This browser does not support HTML5.");
          }
        } else {
          alert("Please upload a valid Excel file.");
        }
      }
      };
      $scope.ProcessExcel = function (data) {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
        // console.log(workbook)
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        if(!excelRows[0]['PO Number'] || !excelRows[0]['EID'] || !excelRows[0]['Brand']) {
          alert('Invalid Columns!')
        } else {
        excelRows.forEach(obj=>{
          $scope.newImportArray.push({PO_Number : obj['PO Number'], EIDNumber : obj['EID'], BrandNo : obj['Brand']})
        })
        if($scope.SelectedFile.name.toLowerCase().includes('order')) {
          $scope.fileType = 'Reorder'
        } else {
          $scope.fileType=null;
        }
        //Display the data from Excel file in Table.
        
          $http({
            method : 'POST',
            url : '/eidordeimport',
            data : {excelRows : $scope.newImportArray, fileType : $scope.fileType}
          }).then(function success(response){
            alert('Imported Successfully')
          },function error(response){
            // alert('Error occured. Please try again later!');
          })
        }
      };
  });
//-----------------------------------------------Online Store-----------------------------------------
app.controller('OnlineStoreController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,fileUpload,$sce){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.productShow=true;
  $scope.producthide=false;
  $scope.editProduct = function(atp){
    $scope.productShow=false;
    $scope.producthide=true;
    $http({
      method : 'POST',
      url : '/editnewproducts',
      data : atp
    }).then(function success(response){
      $scope.newproduct2 = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.editProduct1 = function(option){
    $scope.productShow=false;
    $scope.producthide=true;
    $http({
      method : 'POST',
      url : '/editnewproducts1',
      data : option
    }).then(function success(response){
      $scope.newproduct2 = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ExitEditProduct = function(){  
    $scope.tabledata=true;
    $scope.editdata=false;
    $scope.uploadimg=false;
  }
  $scope.tabledata=true;
  $scope.editdata=false;
  $scope.uploadimg=false;
  $scope.editdata1=function(vos){
    $scope.tabledata=false;
    $scope.editdata=true;
    $http({
      method : 'POST',
      url : '/editdata1',
      data : vos
    }).then(function success(response){
      $scope.editproduct = response.data.details[0];
      $scope.optiondata = response.data.options;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.OnlineProducts = function(){
    $http({
      method : 'GET',
      url : '/onlineproducts',
    }).then(function success(response){ 
      $scope.ops = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DisplayTempData = function(){
    $http({
      method : 'GET',
      url : '/displaytempdata',
    }).then(function success(response){ 
      $scope.atps = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ViewProducts = function(op1){
    // console.log(op1)
    $http({
      method : 'POST',
      url : '/viewproducts',
      data : op1
    }).then(function success(response){
      $scope.voss = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.InitialProducts = function(){
    // console.log(op1)
    $http({
      method : 'POST',
      url : '/viewproducts',
    }).then(function success(response){
      $scope.voss = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ReportCategoryDropdown = function(){
    $http({
      method : 'GET',
      url : '/reportcategory',
    }).then(function success(response){ 
      $scope.rcds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SelectMessageDropdown = function(){
    $http({
      method : 'GET',
      url : '/selectmessage',
    }).then(function success(response){ 
      $scope.smds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.atps = [];
  $scope.AddNewProduct = function(newproduct1){
    $scope.atps.push(newproduct1)
    $http({
      method : 'POST',
      url : '/tempproducts',
      data : newproduct1
    }).then(function success(response){
      alert('Added Successfully')
      $('#AddNewProducts').modal('hide');
      $scope.atp = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.options = [];
  $scope.AddNewProduct1 = function(newproduct3){
    $scope.options.push(newproduct1)
    $http({
      method : 'POST',
      url : '/tempproducts1',
      data : newproduct3
    }).then(function success(response){
      $scope.option = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateNewProduct = function(newproduct2){
    $http({
      method : 'POST',
      url : '/updatenewproducts',
      data : newproduct2
    }).then(function success(response){ 
      $scope.newproduct2 = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdateNewProduct1 = function(newproduct4){
    $http({
      method : 'POST',
      url : '/updatenewproducts1',
      data : newproduct4
    }).then(function success(response){ 
      $scope.newproduct4 = {};
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteNewProduct = function(atp){
    $http({
      method : 'POST',
      url : '/deletenewproducts',
      data : atp
    }).then(function success(response){ 
      var index = $scope.atps.indexOf(atp);
      $scope.atps.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteNewProduct1 = function(option){
    $http({
      method : 'POST',
      url : '/deletenewproducts1',
      data : option
    }).then(function success(response){ 
      var index = $scope.atps.indexOf(atp);
      $scope.atps.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SaveAddNewProducts = function(newproduct){
    $http({
      method : 'POST',
      url : '/saveaddnewproducts',
      data : newproduct
    }).then(function success(response){ 
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SaveAddNewProducts1 = function (editproduct) {
    var details = $scope.editproduct
    var uploadUrl = "/saveaddnewproducts1";
    fileUpload.uploadFileToUrl(details, uploadUrl)
    $scope.editproduct = {};
  }
  $scope.DeleteAddedProduct = function(vos){
    $http({
      method : 'POST',
      url : '/deleteaddedproduct',
      data : vos
    }).then(function success(response){ 
      var index = $scope.voss.indexOf(vos);
      $scope.voss.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
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
        alert(success.data)
        return success.data
      },function(error){
        console.log(error,'error')
        // alert(error);
            })
      return data
    }
  }]);
//-----------------------------------------------Discount Manager-----------------------------------------
app.controller('DiscountManagerController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$sce,$filter){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 

  $scope.addDisc=true;
  $scope.editdisc=false;
  $scope.editDiscount=function(gdd){
    $scope.addDisc=false;
    $scope.editdisc=true;
    $http({
      method : 'POST',
      url : '/editdiscount',
      data : gdd
    }).then(function success(response){
      $scope.edms = response.data[0];
      $scope.edms.StartDate = $filter('date')( response.data[0].StartDate, 'MM/dd/yyyy');
      $scope.edms.endDate = $filter('date')( response.data[0].endDate, 'MM/dd/yyyy');
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.BacktoEditDiscount=function(){
    $scope.addDisc=true;
    $scope.editdisc=false;
  }
  $scope.UpdateDiscount=function(edms){
    $http({
      method : 'POST',
      url : '/updatediscount',
      data : edms
    }).then(function success(response){
      $scope.edms = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.GetDiscountData = function(){
    $http({
      method : 'GET',
      url : '/getdiscountdata',
    }).then(function success(response){ 
      $scope.gdds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddNewDiscount = function(newdiscount){
    $http({
      method : 'POST',
      url : '/addnewdiscount',
      data : newdiscount
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteDiscount = function(gdd){
    $http({
      method : 'POST',
      url : '/deletediscount',
      data : gdd
    }).then(function success(response){ 
      var index = $scope.gdds.indexOf(gdd);
      $scope.gdds.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddExistingProd = function(){
    $http({
      method : 'GET',
      url : '/addexistingprod',
    }).then(function success(response){
      $scope.aexps = response.data;

    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddProductToList = function(aexp,edms){
    $http({
      method : 'POST',
      url : '/addproducttolist',
      data : {Product : aexp,Discount : edms}
    }).then(function success(response){
      $scope.aprols = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteExistingPro = function(aprol){
    $http({
      method : 'POST',
      url : '/deleteexistingproducts',
      data : aprol
    }).then(function success(response){ 
      var index = $scope.aprols.indexOf(aprol);
      $scope.aprols.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowExisitingList = function(gdd){
    $http({
      method : 'POST',
      url : '/showexistinglist',
      data : gdd
    }).then(function success(response){
      $scope.aprols = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//--------------------------------------------Certificate in reports-------------------------------------------------------
app.controller('ReportCertificateController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.printToCart = function(printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
      }
  $scope.CertiCount=function(){
    $http({
      method : 'GET',
      url : '/certicount',
    }).then(function success(response){
      $scope.ccrs = response.data[0];
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.CertificateAnimalPrint=function(){
    $http({
      method : 'GET',
      url : '/certificateanimalprint',
    }).then(function success(response){
      $scope.caps = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ViewCertSearchAnimal=function(){
    $http({
      method : 'GET',
      url : '/viewcertsearchanimal',
    }).then(function success(response){
      $scope.vcsa = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.DeleteCertSearchAnimal=function(vcsa){
    $http({
      method : 'POST',
      url : '/deletecertsearchanimal',
      data : vcsa
    }).then(function success(response){
      var index = $scope.vcsa.indexOf(vcs);
      $scope.vcsa.splice(index, 1);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchCAnimal=function(csearch){
    $http({
      method : 'POST',
      url : '/certsearchanimal',
      data : csearch
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddRegNoRangeCerti=function(range){
    $http({
      method : 'POST',
      url : '/addregnorangecerti',
      data : range
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.UpdatePendingPrint=function(certirange){
    $http({
      method : 'POST',
      url : '/updatependingprint',
      data : certirange
    }).then(function success(response){
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//--------------------------------------------Membership renewal notification-------------------------------------------------------
app.controller('MemRenewalNotiController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.PrintAllExpired=function(){
    $http({
      method : 'GET',
      url : '/printallexpired',
    }).then(function success(response){
      $scope.paes = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.MemExpiration=function(memexp){
    $http({
      method : 'POST',
      url : '/membershipexpiry',
      data : memexp
    }).then(function success(response){
      $scope.mses = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.MemberRenew=function(renew){
    $http({
      method : 'POST',
      url : '/memberrenewsearch',
      data : renew
    }).then(function success(response){
      $scope.mrss = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.PrintMemRenewal=function(mrs){
    $http({
      method : 'POST',
      url : '/printmemrenewal',
      data : mrs
    }).then(function success(response){
      $scope.pemr = response.data[0];
      var date = new Date($scope.pemr.Duedate).toLocaleDateString();
      // console.log(date)
      var doc = new jsPDF("p", "pt", "a4");
      var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABMCAMAAAAr+55XAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAGSUExURbS2uSEujgAAACMylf///yIwkiIwj72/wgYNSfz8/Pf39+rq69jZ2+fn6SQzmePk5Xx+fSMjIBopkjRAmO7v7/X19ZWWmQQFCMPEx5yen0xUkD9KmYqNqLGztTk7Oy06lhIgh/Ly846Qkbm7vouSw8zO0ba5vGdtmhkaGhEcdoWHiMjKz0RNjx8sjHN1ddPU2AYJLVRdnN7f4mBhYP0fI2tzpicpKSIxmMDBxX+EqRkniaaoqnR5pkxNTcPGzCk1jamsu93c3bW3ugYTgERFRf3Z2bG4wPYOE1dYWA4RFSk2lBEZXCArgXqBuElSm6Cis4GIvO/v8Hh8nM/Q1LW2xTA8jlxkpGdnZ09YoOUrLjEyLs2ZmlthldZqbKusrtGIiqGjpJCUsaGlwGpysZebtBsndWNqpNNBROY/Qt7S09KvsGxsbdU0N9ROUTxFi/UuMdJ6e+zs9Zabxru9yLCxsFFSU9paXMReYMKys9fExCowMmFmjsCdnbmpqre727HCxS01b/fo6NLT7Cs5oaFkZEdwTKYcCPQAAACGdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8A2ZlaHQAABAR6VFh0UmF3IHByb2ZpbGUgdHlwZSBnaWY6eG1wIGRhdGF4bXAAAEiJlVZJciQ3DLzzFfMEEhsJ/4arwwdH+OCDn+8ES9JIGs043BXNqiZZQAKZADv9/sf57Z8///q2+t8d9/QNn1IKJz611WzF2IZpFcpGplbNbfMi2meMcYgw7yYxo5VVFmdZNQtjbzOXlmqveFG5dtkqhjsMMuMlIj68KfOsjXtthhfxFSuU45dN25VjJcwnYBE7gYL7s4AterdfHN+NYG7EK/L2BmVtsjQTkCU79U6x0majBTSZAQwzlR1zhQEXl2BuYpawjjk6uDNG7KfFlPDQsSnfEQg+XcQboREwGHclEbFPgT1rKxFZq4IL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'
      doc.addImage(imgData, 'JPEG', 15, 30, 560, 70);
      doc.setFontSize(22);
      doc.text(180, 150, 'Membership Expiration Notice');
      doc.setFontSize(12);
      doc.text(80,180, $scope.pemr.Address+',');
      doc.text(80,200, $scope.pemr.City+',');
      doc.text(80,220, $scope.pemr.State+',');
      doc.text(80,240, $scope.pemr.Zip+',');
      doc.text(80,260, $scope.pemr.Country);
      doc.text(80,320, 'Re : Membership Expiration Notice');
      doc.text(80,350, 'Your Membership at ABBI Inc will expire on '+date);
      doc.text(80,380, 'If you have any question, please call : 719-242-2747');
      doc.save('Notice.pdf')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
}
app.controller('MyCtrl', ['$scope', '$filter',  
  function ($scope, $filter) { 
    $scope.myDate = new Date('2013/07/21'); 

    $scope.myDateFiltered = $filter('date') 
    ($scope.myDate, 'dd/MM/yy'); 
  }]); 
});
//--------------------------------------------Membership renewal Report-------------------------------------------------------
app.controller('MembershipRenewalReportController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ; 
  $scope.TypeDropdown=function(){
    $http({
      method : 'GET',
      url : '/typedropdown',
    }).then(function success(response){
      $scope.tds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SearchReportofRenewal=function(renewalreport){
    $http({
      method : 'POST',
      url : '/searchreportofrenewal',
      data : renewalreport
    }).then(function success(response){
      $scope.srfrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
});
//--------------------------------------------------------Adhoc--------------------------------------------------------------------
app.controller('AdHocController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.ContinueScreen = function(checkvalue){
    $scope.showadhoc= true;
    $scope.adhocnext = true;
    // console.log($scope.checkvalue)
    if($scope.checkvalue.members == true){
      $http({
        method : 'POST',
        url : '/adhocmembers',
        data : {event : 'members'}
      }).then(function success(response){
        $scope.members1 = response.data;
        // console.log($scope.members1)
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    if($scope.checkvalue.registration == true){
      $http({
        method : 'POST',
        url : '/adhocregistration',
        data : {event : 'registration'}
      }).then(function success(response){
        $scope.registration1 = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    if($scope.checkvalue.payments == true){
      $http({
        method : 'POST',
        url : '/adhocpayments',
        data : {event : 'payments'}
      }).then(function success(response){
        $scope.payments1 = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    if($scope.checkvalue.eventsmember == true){
      $http({
        method : 'POST',
        url : '/adhoceventsmember',
        data : {event : 'events_member'}
      }).then(function success(response){
        $scope.eventsmember1 = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    if($scope.checkvalue.eventsanimal == true){
      $http({
        method : 'POST',
        url : '/adhoceventsanimal',
        data : {event : 'events_animal'}
      }).then(function success(response){
        $scope.eventsanimal1 = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    if($scope.checkvalue.events == true){
      $http({
        method : 'POST',
        url : '/adhocevents',
        data : {event : 'events'}
      }).then(function success(response){
        $scope.events1 = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    else{
      $scope.members1 = {};
      $scope.registration1 = {};
      $scope.eventsanimal1 = {};
      $scope.eventsmember1 = {};
      $scope.payments1 = {};
      $scope.events1 = {};
    }
  }
  $scope.selection = [];
  $scope.tables = [];
  $scope.toggleSelection = function toggleSelection(mem,table) {
      var idx = $scope.selection.indexOf(mem);
      var idx1 = $scope.tables.indexOf(table);
      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
        $scope.tables.splice(idx1, 1);
        // console.log($scope.selection)
        // console.log($scope.tables)
      }
      // is newly selected
      else {
        $scope.selection.push(mem);
        $scope.tables.push(table);
        // console.log($scope.selection)
        // console.log($scope.tables);
        $scope.nextarray = $scope.selection
      }
    };
    $scope.AdhocNext = function(nextarray,tables){
      // console.log(nextarray)
      $scope.showadhoc= true;
      $scope.adhocnext = false;
      $scope.adhocnext1 = true;
      $http({
        method : 'POST',
        url : '/adhocnext',
        data : {nextarray : nextarray, tables : tables}
      }).then(function success(response){
        $scope.col = response.data.col;
        // console.log($scope.col)
        $scope.tbl = response.data.tbl;
        // console.log($scope.tbl)
        $scope.stmt = response.data.stmt
        // console.log($scope.stmt)
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
  $scope.ExitAdhoc = function(){
    $scope.showadhoc= false;
    $scope.adhocnext = false;
    $scope.adhocnext2 = false;
  }
  $scope.AddSort = function(col){
    // console.log(col)
    $http({
        method : 'POST',
        url : '/addsort',
        data : {col : col}
      }).then(function success(response){
        $scope.sortdata = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.AddFilter = function(tbl){
    // console.log(tables)
    $http({
        method : 'POST',
        url : '/addfilter',
        data : {tbl : tbl}
      }).then(function success(response){
        $scope.filterdata = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
   $scope.SaveSort = function(sorts){
    // console.log(tables)
    $http({
        method : 'POST',
        url : '/savesort',
        data : sorts
      }).then(function success(response){
        $scope.sss = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
   $scope.SaveFilter = function(filters){
    // console.log(tables)
    $http({
        method : 'POST',
        url : '/savefilter',
        data : filters
      }).then(function success(response){
        $scope.sfs = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.LoadAdhoc = function(Qname){
    $scope.showadhoc= true;
    $scope.adhocnext = false;
    $scope.adhocnext1 = false;
    $scope.adhocnext2 = true;
    $http({
        method : 'POST',
        url : '/loadadhoc',
        data : Qname
      }).then(function success(response){
        $scope.sorts1 = response.data.sort;
        $scope.filters1 = response.data.filter;
        $scope.sss = response.data.sor;
        $scope.sfs = response.data.fil;
        $scope.head = response.data.head;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.GetRecords = function(stmt){
    // console.log(tables)
    $http({
        method : 'POST',
        url : '/getrecords',
        data : {stmt : stmt}
      }).then(function success(response){
        $scope.grs = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.GetCount = function(stmt){
    // console.log(tables)
    $http({
        method : 'POST',
        url : '/getcount',
        data : {stmt : stmt}
      }).then(function success(response){
        $scope.gcs = response.data[0];
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.GetRecords1 = function(Qname){
    // console.log(tables)
    $http({
        method : 'POST',
        url : '/getrecords1',
        data : {stmt : Qname}
      }).then(function success(response){
        $scope.grs1 = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.GetCount1 = function(Qname){
    // console.log(tables)
    $http({
        method : 'POST',
        url : '/getcount1',
        data : {stmt : Qname}
      }).then(function success(response){
        $scope.gcs1 = response.data[0];
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.TruncateSF = function(){
    // console.log(tables)
    $http({
        method : 'GET',
        url : '/trunsf'
      }).then(function success(response){
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.SelectAdhoc = function(){
    // console.log(tables)
    $http({
        method : 'GET',
        url : '/selectadhoc'
      }).then(function success(response){
        $scope.seladhocs = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.SaveAdhoc = function(stmt,query,selection,tables){
      $scope.showadhoc= false;
      $scope.adhocnext = false;
      $scope.adhocnext1 = false;
      $scope.showadhoc = false;
    $http({
        method : 'POST',
        url : '/saveadhoc',
        data : {stmt : stmt, query : query, selection : selection, tables:tables}
      }).then(function success(response){
        $scope.seladhocs = response.data;
        $scope.stmt = {};
        $scope.query = {};
        $scope.col = {};
        $scope.tbl = {};
        $scope.checkvalue = {};
        $scope.selection = {};
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
  $scope.DeleteSort = function(ss){
    // console.log(tables)
    $http({
        method : 'POST',
        url : '/deletesort',
        data : ss
      }).then(function success(response){
        var index = $scope.sss.indexOf(ss);
        $scope.sss.splice(index, 1);
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.DeleteAdhoc = function(Qname){
    $http({
        method : 'POST',
        url : '/deleteadhoc',
        data : Qname
      }).then(function success(response){
         $scope.seladhocs = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.DeleteFilter = function(sf){
    // console.log(tables)
    $http({
        method : 'POST',
        url : '/deletefilter',
        data : sf
      }).then(function success(response){
        var index = $scope.sfs.indexOf(sf);
        $scope.sfs.splice(index, 1);
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.ResetAdhoc = function(){
    $scope.showadhoc= false;
    $scope.adhocnext = false;
    $scope.adhocnext1 = false;
    $scope.members1 = {};
    $scope.registration1 = {};
    $scope.eventsanimal1 = {};
    $scope.eventsmember1 = {};
    $scope.payments1 = {};
    $scope.events1 = {};
  }
  $scope.ExitAdhoc1 = function(){
    $scope.showadhoc= false;
    $scope.adhocnext = true;
    $scope.adhocnext1 = false;
  }
});
//--------------------------------------------------------Geno Research--------------------------------------------------------------------
app.controller('GenoResearchController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.GenoData = function(){
    $http({
        method : 'GET',
        url : '/genodata'
      }).then(function success(response){
        $scope.gds = response.data[0];
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.GenoRecords = function(gds){
    $http({
        method : 'POST',
        url : '/genorecords',
        data : gds
      }).then(function success(response){
        $scope.grs = response.data;
        // console.log($scope.grs)
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.GenoCount = function(gds){
    $http({
        method : 'POST',
        url : '/genocount',
        data : gds
      }).then(function success(response){
        $scope.gcs = response.data[0];
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.EditGenoData = function(gr){
    $http({
        method : 'POST',
        url : '/editgenodata',
        data : gr
      }).then(function success(response){
        alert('Updated Successfully');
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
  });
//-------------------------------------------------------------------Member Profile Update--------------------------------------
app.controller('MemberDetProfController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  ;
  $scope.SearchMemProf = function(memrep){
    $http({
        method : 'POST',
        url : '/searchmemproupd',
        data : memrep
      }).then(function success(response){
        $scope.smps = response.data;
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
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
    });
//-------------------------------------------------------------------Animal Approval--------------------------------------
app.controller('AnimalApprovalController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  $scope.AnimalApprovalButton = function(aad){
    $http({
        method : 'POST',
        url : '/animalapprovalbutton',
        data : aad
      }).then(function success(response){
        alert('Image Approved')
        var index = $scope.aads.indexOf(aad);
        $scope.aads.splice(index, 1);
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.AnimalDenyButton = function(aad){
    $http({
        method : 'POST',
        url : '/animaldenybutton',
        data : aad
      }).then(function success(response){
        alert('Image Not Approved')
        var index = $scope.aads.indexOf(aad);
        $scope.aads.splice(index, 1);
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.AnimalApprovalData = function(){
      $http({
        method : 'GET',
        url : '/animalapprovaldata'
      }).then(function success(response){
        $scope.aads = response.data
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
  });
//-------------------------------------------------------------------Member Approval--------------------------------------
app.controller('MemberApprovalController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  {
    extend:    'excel',
    text:      '<i class="fa fa-file-excel-o"></i> Excel',
    titleAttr: 'Excel'
  },
  ]
  )
  $scope.MemberApprovalButton = function(mad){
    $http({
        method : 'POST',
        url : '/memberapprovalbutton',
        data : mad
      }).then(function success(response){
        alert('Image Approved')
        var index = $scope.mads.indexOf(mad);
        $scope.mads.splice(index, 1);
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.MemberDenyButton = function(mad){
    $http({
        method : 'POST',
        url : '/memberdenydata',
        data : mad
      }).then(function success(response){
        alert('Image Not Approved')
        var index = $scope.mads.indexOf(mad);
        $scope.mads.splice(index, 1);
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.MemberApprovalData = function(){
      $http({
        method : 'GET',
        url : '/memberapprovaldata'
      }).then(function success(response){
        $scope.mads = response.data
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
        url : '/transferedanimaldataadmin',
      }).then(function success(response){
        $scope.transfered = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.TransferDataAdmin = function(transfer){
      $scope.animaldata = transfer;
    }
    $scope.calcTransAnimal = function(){
      $scope.bills.amount1 = 30 * 0.02;
      if($scope.PaymentType?.Payment == 'eCheck'){
        $scope.bills.handling = 30 * 0.02;
        $scope.bills.amount = 30 + 0;
      }
      else{
        $scope.bills.handling = 0;
        $scope.bills.amount = 30 + $scope.bills.amount1 + 0;
      }
    }
    $scope.BillDetails = function(transfer){
      $http({
        method : 'POST',
        url : '/getbilldetailsadmin',
        data : transfer
      }).then(function success(response){
        $scope.bills=response.data[0];
        $scope.bills = {...$scope.bills,amount1:30}
        $scope.calcTransAnimal();
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    $scope.TransferAnimalPayAdmin = function(pay,bills,animaldata){
      $http({
        method : 'POST',
        url : '/transferedanimalPayadmin',
        data : {pay:pay,bills:bills,animaldata:animaldata}
      }).then(function success(response){
        $scope.msg = response.data;
      console.log(response.data)
      $scope.paymentid = response.data.paymentid;
      $scope.type = response.data.paymentType;
      $scope.date = response.data.date;
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
  //-------------------------------------------------------------------Event Without EID------------------------------------------
  app.controller('EventWithoutEIDController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('paging', true)
    .withOption('searching', true)
    .withOption('info', true)
    .withOption('order', [0])
    $scope.AnimalWoEid = function(){
      $http({
        method : 'GET',
        url : '/animalwoeid',
      }).then(function success(response){
        $scope.awes = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  });
  //------------------------------------------------ABBI REG-----------------------------------------
  app.controller('PastController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withButtons([
      {
      extend:    'copy',
      text:      '<i class="fa fa-files-o"></i> Copy',
      titleAttr: 'Copy'
      },
      {
      extend:    'print',
      text:      '<i class="fa fa-print"></i> Print',
      titleAttr: 'Print'
      },
      {
      extend:    'csvHtml5',
      text:      '<i class="fa fa-file-excel-o"></i> csv',
      titleAttr: 'csv'
      },
      {
      extend:    'pdfHtml5',
      text:      '<i class="fa fa-file-pdf-o"></i> pdf',
      titleAttr: 'print'
      },
      {
      extend:    'excel',
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
      },
      ]
      )
      ;
  $scope.PastData = function(){
    $http({
      method : "GET",
      url : "/pastevents"
    }).then(function success(response){
      $scope.pes = response.data;
    }, function error(response){
    })
  }
  $scope.PastScreen = false;
  $scope.PastScreen1 = false;
  $scope.ShowEntries = false;
  $scope.ShowHandler = false;
  $scope.ShowHip = false;
  $scope.ShowDraw = false;
  $scope.ShowCheckIn = false;
  $scope.ShowPayment = false;
  $scope.ShowLetter = false;
  $scope.showcomadmin = false;
  $scope.addeditjudges = false;
  $scope.addevent1 = false;
  $scope.addclass = false;
  $scope.addentry = false;
  $scope.viewentry = false;
  $scope.switchanimal = false;
  $scope.editevent = false;
  $scope.animaldet = false;
  $scope.outstand = false;
  $scope.editanimal = false;
  $scope.daysheetexport = false;
  $scope.showcrp = false;
  $scope.EventInfo = function(pe){
    $scope.PastScreen = true;
    $scope.PastScreen1 = true;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.editevent = false;
    $http({
      method : "POST",
      url : "/pasteventsinfo",
      data : pe
    }).then(function success(response){
      $scope.eis = response.data.data[0];
      $scope.teis = response.data.table;
      $scope. jud = response.data.judges;
      $scope.msg = response.data.msg;
    }, function error(response){
    })
  }
  $scope.EditClass = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.editclass = true;
    $http({
      method : "POST",
      url : "/editclass",
      data : sca
    }).then(function success(response){
      $scope.ecs = response.data[0];
    }, function error(response){
    })
  }
  $scope.UpdateClass = function(ecs){
    $http({
      method : "POST",
      url : "/updateclass",
      data : ecs
    }).then(function success(response){
      $scope.alerta = true;
    }, function error(response){
      $scope.alerta = false;
    })
  }
  $scope.CompetitionAdmin = function(tei){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = true;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/editclass",
      data : tei
    }).then(function success(response){
      $scope.sca = response.data[0];
    }, function error(response){
    })
  }
  $scope.EditClass = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.editclass = true;
    $http({
      method : "POST",
      url : "/editclass",
      data : tei
    }).then(function success(response){
      $scope.sca = response.data[0];
    }, function error(response){
    })
  }
  $scope.UpdateEvent = function(ede){
    $http({
      method : "POST",
      url : "/updateevent",
      data : ede
    }).then(function success(response){
      $scope.alertb = true;
    }, function error(response){
      $scope.alertb = false;
    })
  }
  $scope.EditEvent = function(eis){
    // alert(eis)
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.editevent = true;
    $http({
      method : "POST",
      url : "/editeventreg",
      data : eis
    }).then(function success(response){
      $scope.ede = response.data[0];
    }, function error(response){
    })
  }
  $scope.AddClass = function(acs,eis){
    // alert(sca)
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addclass = true;
    $http({
      method : "POST",
      url : "/addclass",
      data : {acs:acs, eis:eis}
    }).then(function success(response){
      
      $scope.acs = {};
      $scope.teis = response.data;
    }, function error(response){

    })
  }
  $scope.AddEditJudge = function(eis){
    // alert(sca)
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.editevent = false;
    $scope.addeditjudges = true;
    $http({
      method : "POST",
      url : "/judgedata",
      data : eis
    }).then(function success(response){
      $scope.judge = response.data;
    }, function error(response){
    })
  }
  $scope.UpdateJudge = function(judge,eis){
    $http({
      method : "POST",
      url : "/updatejudge",
      data : {judge : judge, eis : eis}
    }).then(function success(response){
      $scope.alertc = true;
      $scope.jud = response.data;
    }, function error(response){
      $scope.alertc = false;
    })
  }
  $scope.AddEntries = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addclass = false;
    $scope.addentry = true;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.editevent = false;
    $scope.addevent1 = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/addentry",
      data : sca
    }).then(function success(response){
      $scope.aes = response.data;
    }, function error(response){
    })
  }
  $scope.ViewEntry = function(ae,eis,sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.switchanimal = false;
    $scope.showcomadmin = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = true;
    $scope.showgroup = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/viewentry",
      data : {ae:ae,eis:eis,sca:sca}
    }).then(function success(response){
      $scope.ves = response.data.data[0];
      $scope.ves1 = response.data.data1[0];
      $scope.ves2 = response.data.data2;
    }, function error(response){
    })
  }
  $scope.SwitchAnimal = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = true;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
  }
  $scope.DrawThis = function(sg,max){
    $http({
      method : "POST",
      url : "/drawthis",
      data : {sg:sg[0], max:max}
    }).then(function success(response){
      alert("Successfull")
    }, function error(response){
    })
  }
  $scope.EvaluateDraw = function(sg,maxside){
    $http({
      method : "POST",
      url : "/evaluatedraw",
      data : {sg:sg[0], maxside:maxside}
    }).then(function success(response){
      // alert("Successfull")
      $scope.eds = response.data[0];
    }, function error(response){
    })
  }
  $scope.DaySheet = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.showcomadmin = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = true;
  }
  $scope.ResultsExports = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.resultview = false;
    $scope.resultsexport = true;
  }
  $scope.ResultsView = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.editevent = false;
    $scope.daysheetexport = false;
    $scope.resultview = true;
  }
  $scope.AnimalDetails = function(ves1){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.editevent = false;
    $scope.switchanimal = false;
    $scope.animaldet = true;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/animaldetails",
      data : ves1
    }).then(function success(response){
      $scope.ands = response.data[0];
    }, function error(response){
    })
  }
  $scope.OutsStandings = function(ves1){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.editevent = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.outstand = true;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/outstand",
      data : ves1
    }).then(function success(response){
      $scope.outs = response.data.data;
      $scope.outs1 = response.data.data1;
      $scope.outs2 = response.data.data2;
    }, function error(response){
    })
  }
  $scope.EditAnimal = function(ves1){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.outstand = false;
    $scope.editanimal = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/editanimal",
      data : ves1
    }).then(function success(response){
      $scope.eas = response.data[0];
    }, function error(response){
    })
  }
  $scope.UpdateAnimal = function(eas){
    $http({
      method : "POST",
      url : "/updateanimal",
      data : eas
    }).then(function success(response){
      $scope.alertd = true;
    }, function error(response){
      $scope.alertd = false;
    })
  }
  $scope.RemoveClass = function(ves1){
    $http({
      method : "POST",
      url : "/removeclass",
      data : ves1
    }).then(function success(response){
      alert('Removed Successfully');
    }, function error(response){
    })
  }
  $scope.SwitchDelivery = function(ves1){
    $http({
      method : "POST",
      url : "/switchdelivery",
      data : ves1
    }).then(function success(response){
      alert('Successfull');
    }, function error(response){
    })
  }
  $scope.MarkPaid = function(ves1){
    $http({
      method : "POST",
      url : "/markpaid",
      data : ves1
    }).then(function success(response){
      alert('Successfull');
    }, function error(response){
    })
  }
  $scope.DeleteEntry = function(ves1){
    $http({
      method : "POST",
      url : "/deleteentry",
      data : ves1
    }).then(function success(response){
      alert('Successfull');
    }, function error(response){
    })
  }
  $scope.SwitchAnimal1 = function(ves1,switch1){
    $http({
      method : "POST",
      url : "/switchanimal1",
      data : {ves1:ves1,switch1:switch1}
    }).then(function success(response){
    }, function error(response){
    })
  }
  $scope.EntriesExports = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.entriesexport = true;
    $scope.daysheetexport = false;
    $scope.editevent = false;
  }
  $scope.EntriesExports = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.entriesexport = true;
    $scope.daysheetexport = false;
    $scope.editevent = false;
  }
  $scope.AllEntries = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = true;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showallentries",
      data : eis
    }).then(function success(response){
      $scope.saes = response.data
    }, function error(response){
    })
  }
  $scope.Handlers = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = true;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showhandler",
      data : eis
    }).then(function success(response){
      $scope.shs = response.data
    }, function error(response){
    })
  }
  $scope.Hip = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = true;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showhip",
      data : eis
    }).then(function success(response){
      $scope.ships = response.data
      $scope.hiplength = response.data.length;
    }, function error(response){
    })
  }
  $scope.GenerateHip = function(eis){
    $http({
      method : "POST",
      url : "/generatehip",
      data : eis
    }).then(function success(response){
      $scope.ships = response.data
      $scope.hiplength = response.data.length;
    }, function error(response){
    })
  }
  $scope.AddClasss = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.addclass = true;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
  }
  $scope.Draw = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = true;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showdraw",
      data : eis
    }).then(function success(response){
      $scope.drs = response.data.data
      $scope.drs1 = response.data.data1[0];
    }, function error(response){
    })
  }
  $scope.Group = function(draw){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $scope.showgroup = true;
    $scope.showdaysheet = false;
    $http({
      method : "POST",
      url : "/showgroup",
      data : draw
    }).then(function success(response){
      $scope.sg = response.data.data;
      $scope.sgt = response.data.data1;
    }, function error(response){
    })
  }
  $scope.WipeDraw = function(sg){
    $http({
      method : "POST",
      url : "/wipedraw",
      data : sg
    }).then(function success(response){
      alert("Data Wiped")
    }, function error(response){
    })
  }
  $scope.Daysheet = function(draw){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $scope.showgroup = false;
    $scope.showdaysheet = true;
    $http({
      method : "POST",
      url : "/showdaysheet",
      data : draw
    }).then(function success(response){
      $scope.sds = response.data
    }, function error(response){
    })
  }
  $scope.CheckIn = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = true;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showcheckin",
      data : eis
    }).then(function success(response){
      $scope.chis = response.data
    }, function error(response){
    })
  }
  $scope.PaymentReport = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = true;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showpayreport",
      data : eis
    }).then(function success(response){
      $scope.prs = response.data
    }, function error(response){
    })
  }
  $scope.ParticipationLetter = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showletter",
      data : eis
    }).then(function success(response){
      $scope.pls = response.data[0];
    }, function error(response){
    })
  }
  $scope.HipTagList = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/hiptaglist",
      data : eis
    }).then(function success(response){
      $scope.htls = response.data;
    }, function error(response){
    })
  }
  $scope.HipTagListHandler = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/hiptaghandler",
      data : eis
    }).then(function success(response){
      $scope.hths = response.data;
    }, function error(response){
    })
  }
  $scope.PdfHipTed = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfhipted",
      data : eis
    }).then(function success(response){
      $scope.phts = response.data;
    }, function error(response){
    })
  }
  $scope.PdfTedHandler = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdftedhandler",
      data : eis
    }).then(function success(response){
      $scope.pths = response.data;
    }, function error(response){
    })
  }
  $scope.PdfJudgeHip = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfjudgehip",
      data : eis
    }).then(function success(response){
      $scope.pjhs = response.data;
    }, function error(response){
    })
  }
  $scope.BcHipTag = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/bchiptag",
      data : eis
    }).then(function success(response){
      $scope.bhts = response.data;
    }, function error(response){
    })
  }
  $scope.BcHipHandler = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/bchiphandler",
      data : eis
    }).then(function success(response){
      $scope.bhhs = response.data;
    }, function error(response){
    })
  }
  $scope.WipeHipTag = function(eis){
    $http({
      method : "POST",
      url : "/wipehiptag",
      data : eis
    }).then(function success(response){
      alert('Data Wiped')
    }, function error(response){
    })
  }
  $scope.ParentageDaysheet = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/parentagedaysheet",
      data : eis
    }).then(function success(response){
      $scope.pdss = response.data;
    }, function error(response){
    })
  }
  $scope.TOE = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = true;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/toe",
      data : sca
    }).then(function success(response){
      $scope.toe = response.data;
    }, function error(response){
    })
  }
  $scope.RCE = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = true;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/rce",
      data : sca
    }).then(function success(response){
      $scope.rce = response.data;
    }, function error(response){
    })
  }
  $scope.AEL = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = true;
    $scope.showlel = false;
    $scope.showrce = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/ael",
      data : sca
    }).then(function success(response){
      $scope.ael = response.data;
    }, function error(response){
    })
  }
  $scope.AEP = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showlel = false;
    $scope.showrce = false;
    $scope.showaep = true;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/aep",
      data : sca
    }).then(function success(response){
      $scope.aep = response.data;
    }, function error(response){
    })
  }
    $scope.LEL = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showaep = false;
    $scope.showlel = true;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/lel",
      data : sca
    }).then(function success(response){
      $scope.lel = response.data;
    }, function error(response){
    })
  }
  $scope.TOS = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = true;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/tos",
      data : sca
    }).then(function success(response){
      $scope.tos = response.data;
    }, function error(response){
    })
  }
  $scope.PDFD = function(sca){
    alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = true;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfd",
      data : sca
    }).then(function success(response){
      $scope.pdfd = response.data;
    }, function error(response){
    })
  }
  $scope.PDFP = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = true;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfp",
      data : sca
    }).then(function success(response){
      $scope.pdfp = response.data;
    }, function error(response){
    })
  }
  $scope.TBLP = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = true;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfp",
      data : sca
    }).then(function success(response){
      $scope.tblp = response.data;
    }, function error(response){
    })
  }
  $scope.TBLD = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfp",
      data : sca
    }).then(function success(response){
      $scope.tbld = response.data;
    }, function error(response){
    })
  }
  $scope.CR = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = true;
    $scope.showcrp = false;
    $http({
      method : "POST",
      url : "/cr",
      data : sca
    }).then(function success(response){
      $scope.cr1 = response.data.data[0];
      $scope.cr = response.data.data1;
    }, function error(response){
    })
  }
  $scope.CRP = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrp = true;
    $http({
      method : "POST",
      url : "/onloadpayout",
      data : sca
    }).then(function success(response){
      $scope.pos = response.data[0];
    }, function error(response){
    })
  }
  $scope.PayOut = function(cal,sca){
    $http({
      method : "POST",
      url : "/payout",
      data : {cal : cal, sca : sca}
    }).then(function success(response){
      $scope.pos = response.data[0];
    }, function error(response){
    })
  }
  $scope.CRT = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrt = true;
    $scope.showlrt = false;
    $scope.showjst = false;
    $scope.showjer = false;
    $scope.showbjr = false;
    $http({
      method : "POST",
      url : "/crt",
      data : sca
    }).then(function success(response){
      $scope.crt = response.data;
    }, function error(response){
    })
  }
  $scope.LRT = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrt = false;
    $scope.showlrt = true;
    $scope.showjst = false;
    $scope.showjer = false;
    $scope.showbjr = false;
    $http({
      method : "POST",
      url : "/lrt",
      data : sca
    }).then(function success(response){
      $scope.lrt = response.data;
    }, function error(response){
    })
  }
  $scope.JST = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrt = false;
    $scope.showlrt = false;
    $scope.showjst = true;
    $scope.showjer = false;
    $scope.showbjr = false;
    $http({
      method : "POST",
      url : "/jst",
      data : sca
    }).then(function success(response){
      $scope.jst = response.data;
    }, function error(response){
    })
  }
  $scope.JER = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrt = false;
    $scope.showlrt = false;
    $scope.showjst = false;
    $scope.showjer = true;
    $scope.showbjr = false;
    $http({
      method : "POST",
      url : "/jer",
      data : sca
    }).then(function success(response){
      $scope.jer = response.data;
    }, function error(response){
    })
  }
  $scope.BJR = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrt = false;
    $scope.showlrt = false;
    $scope.showjst = false;
    $scope.showjer = false;
    $scope.showbjr = true;
    $http({
      method : "POST",
      url : "/bjr",
      data : sca
    }).then(function success(response){
      $scope.bjr = response.data;
    }, function error(response){
    })
  }
  $scope.ExitPastScrrenInfo = function(){
    $scope.PastScreen = false;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.showgroup = false;
    $scope.showdaysheet = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showaep = false;
    $scope.showlel = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $scope.animaldet = false;
    $scope.showcr = false;
    $scope.showcrt = false;
    $scope.showlrt = false;
    $scope.showjst = false;
    $scope.editevent = true;
    $scope.showjer = false;
    $scope.showbjr = false;
    $scope.resultview = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.resultsexport = false;
    $scope.showcrp = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addevent = false;
    $scope.addclass = false;
    $scope.editclass = false;
    $scope.editevent = false;
  }
  $scope.ExitShowEntries = function(){
    $scope.addeditjudges = false;
    $scope.editevent = false;
    $scope.addevent1 = false;
    $scope.addevent = false;
    $scope.showgroup = false;
    $scope.showdaysheet = false;
    $scope.addclass = false;
    $scope.editclass = false;
    $scope.PastScreen = true;
    $scope.PastScreen1 = true;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.editevent = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.animaldet = false;
    $scope.showcrt = false;
    $scope.showlrt = false;
    $scope.showjst = false;
    $scope.showjer = false;
    $scope.showbjr = false;
    $scope.resultview = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.resultsexport = false;
    $scope.showcrp = false;
    $scope.editevent = false;
  }
});
  app.controller('AddEventController', function($scope,$http){
    $scope.AddEvent = function(adde){
      $http({
        method : "POST",
        url : "/addevent",
        data : adde
      }).then(function success(response){
        $scope.alert = true;
        window.location.href = '/admin/home#!/regevents';
      }, function error(response){
        $scope.alert = false;
      })
    }
  });
  //----------------------Link to Classes-------------------------------
  app.controller('LinkController', function($scope,$http){
    $scope.Class1Data = function(){
      $http({
        method : "GET",
        url : "/class1data",
      }).then(function success(response){
        $scope.cds1 = response.data;
      }, function error(response){
      })
    }
    $scope.LinkThese = function(link){
      $http({
        method : "POST",
        url : "/linkdata",
        data : link
      }).then(function success(response){
        $scope.alert = true;
        $scope.link = {};
      }, function error(response){
        $scope.alert = false;
      })
    }
    $scope.Class2Data = function(){
      $http({
        method : "GET",
        url : "/class2data",
      }).then(function success(response){
        $scope.cds2 = response.data;
      }, function error(response){
      })
    }
    $scope.SwapPerf = function(val){
      $scope.classdata = true;
      $scope.classdata1 = false;
      $scope.classtable = false;
      $scope.swapperf = true;
      $http({
        method : "POST",
        url : "/swapperf",
        data : val
      }).then(function success(response){
        $scope.sps = response.data;
      }, function error(response){
      })
    }
    $scope.LinkedList = function(){
      $scope.classdata = true;
      $scope.classdata1 = true;
      $scope.classtable = false;
      $http({
        method : "GET",
        url : "/linktable",
      }).then(function success(response){
        $scope.lts = response.data;
        // alert("Success")
      }, function error(response){
      })
    }
    $scope.LinkedTable = function(){
      $scope.classdata = true;
      $scope.classdata1 = true;
      $scope.classtable = false;
      $http({
        method : "GET",
        url : "/linktable1",
      }).then(function success(response){
        $scope.lts1 = response.data;
        // alert("Success")
      }, function error(response){
      })
    }
    $scope.DeletePerf = function(lt1,lt){
      $http({
        method : "POST",
        url : "/deleteperf",
        data : lt1
      }).then(function success(response){
        $scope.alert1 = true;
        var index = $scope.lts1.indexOf(lt1);
        $scope.lts1.splice(index, 1);
        var index = $scope.lts.indexOf(lt);
        $scope.lts.splice(index, 1);
      }, function error(response){
        $scope.alert1 = false;
      })
    }
    $scope.PerfSwap = function(lt){
      // alert('hi')
      $scope.classdata = true;
      $scope.classdata1 = false;
      $scope.classtable = true;
      $http({
        method : "POST",
        url : "/perfswap",
        data : lt
      }).then(function success(response){
        $scope.pss1 = response.data.data;
        $scope.pss2 = response.data.data1;
        // alert("Success")
      }, function error(response){
      })
    }
    $scope.ExitClassList = function(){
      $scope.classdata = false;
      $scope.classdata1 = false;
      $scope.classtable = false;
    }
    $scope.ExitClassTable = function(){
      $scope.classdata = true;
      $scope.classdata1 = true;
      $scope.classtable = false;
    }
    $scope.ExitClassPerf = function(){
      $scope.classdata = true;
      $scope.classdata1 = false;
      $scope.classtable = true;
      $scope.swapperf = false;
    }
  });
  app.controller('HandlerController', function($scope,$http){
    $scope.handlerdata = function(){
      $http({
        method : "GET",
        url : "/handlerdata",
      }).then(function success(response){
        $scope.hds = response.data;
      }, function error(response){
      })
    }
    $scope.NewHandler = function(hand){
      $scope.addnew = true;
      $scope.addnew1 = true;
      $scope.addnew2 = false;
    }
    $scope.AddNewHandler = function(hand){
      $http({
        method : "POST",
        url : "/addnewhandler",
        data : hand
      }).then(function success(response){
        alert('Added Successfully')
        $scope.hds = response.data;
      }, function error(response){
      })
    }
    $scope.EditHandler = function(hd){
      $scope.addnew = true;
      $scope.addnew1 = false;
      $scope.addnew2 = true;
      $http({
        method : "POST",
        url : "/edithandler",
        data : hd
      }).then(function success(response){
        $scope.eh = response.data[0];
      }, function error(response){
      })
    }
    $scope.UpdateHandler = function(eh){
      $http({
        method : "POST",
        url : "/updatehandler",
        data : eh
      }).then(function success(response){
        alert('Updated Successfully')
      }, function error(response){
      })
    }
    $scope.DeleteHandler = function(eh){
      $http({
        method : "POST",
        url : "/deletehandler",
        data : eh
      }).then(function success(response){
        alert('Removed Successfully')
      }, function error(response){
      })
    }
    $scope.BacktoHandler = function(){
      $scope.addnew = false;
      $scope.addnew1 = false;
      $scope.addnew2 = false;
    }
  });
  //------------------------------------Animal Controller----------------
  app.controller('AddAnimalRegController', function($scope,$http){
    $scope.AnimalCount = function(){
      $http({
        method : "GET",
        url : "/anicount"
      }).then(function success(response){
        $scope.ac = response.data[0];
      }, function error(response){
      })
    }
    $scope.AddnewAnimal = function(){
      $scope.searchanimal = true;
      $scope.addani = true;
      $scope.editanim = false;
    }
    $scope.EditsAnimal = function(sa){
      $scope.searchanimal = true;
      $scope.addani = false;
      $scope.editanim = true;
      $http({
        method : "POST",
        url : "/animaldetails",
        data : sa
      }).then(function success(response){
        $scope.ands = response.data[0];
      }, function error(response){
      })
    }
    $scope.EditAnimal = function(ves1){
    $scope.searchanimal = true;
    $scope.addani = false;
    $scope.editanim = false
    $scope.editanimal = true;
    $http({
      method : "POST",
      url : "/editanimal",
      data : ves1
    }).then(function success(response){
      $scope.eas = response.data[0];
    }, function error(response){
    })
  }
  $scope.UpdateAnimal = function(eas){
    $http({
      method : "POST",
      url : "/updateanimal",
      data : eas
    }).then(function success(response){
      $scope.alertd = true;
    }, function error(response){
      $scope.alertd = false;
    })
  }
    $scope.OutsStandings = function(ves1){
    $scope.searchanimal = true;
    $scope.addani = false;
    $scope.editanim = false;
    $scope.outstand = true;
    $http({
      method : "POST",
      url : "/outstand",
      data : ves1
    }).then(function success(response){
      $scope.outs = response.data.data;
      $scope.outs1 = response.data.data1;
      $scope.outs2 = response.data.data2;
    }, function error(response){
    })
  }
    $scope.ExitAnimal = function(){
      $scope.searchanimal = false;
      $scope.addani = false;
      $scope.editanim = false
    }
    $scope.ExitEditAnimal = function(){
      $scope.searchanimal = false;
      $scope.addani = true;
      $scope.editanim = false;
    }
    $scope.AddAnimal = function(addanimal){
      $http({
        method : "POST",
        url : "/addanimalreg",
        data : addanimal
      }).then(function success(response){
        alert("Added Successfully")
      }, function error(response){
      })
    }
    $scope.SearchAnimals = function(searchani){
      $http({
        method : "POST",
        url : "/searchani",
        data : searchani
      }).then(function success(response){
        $scope.sas = response.data;
      }, function error(response){
      })
    }
  });
  app.controller('ProgramController', function($scope,$http){
    $scope.TBL1 = function(){
      $scope.tab1 = true;
      $scope.subtab1 = true;
      $scope.subtab2 = false;
      $scope.subtab3 = false;
      $http({
        method : "GET",
        url : "/tbl1"
      }).then(function success(response){
        $scope.tbl1 = response.data;
      }, function error(response){
      })
    }
    $scope.TBL2 = function(){
      $scope.tab1 = true;
      $scope.subtab1 = false;
      $scope.subtab2 = true;
      $scope.subtab3 = false;
      $http({
        method : "GET",
        url : "/tbl2"
      }).then(function success(response){
        $scope.tbl2 = response.data;
      }, function error(response){
      })
    }
    $scope.DeleteMY = function(my){
      $http({
        method : "POST",
        url : "/deletemys",
        data : my
      }).then(function success(response){
        alert('Removed Successfully')
        var index = $scope.mys.indexOf(my);
        $scope.mys.splice(index, 1);
      }, function error(response){
      })
    }
    $scope.MYS = function(){
      $scope.tab1 = true;
      $scope.subtab1 = false;
      $scope.subtab2 = false;
      $scope.subtab3 = true;
      $http({
        method : "GET",
        url : "/mys"
      }).then(function success(response){
        $scope.mys = response.data.data;
        $scope.mys1 = response.data.data1;
      }, function error(response){
      })
    }
    $scope.ExitTBL = function(){
      $scope.tab1 = false;
      $scope.subtab1 = false;
      $scope.subtab2 = false;
      $scope.subtab3 = false;
    }
  });
app.controller('EventsRegController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$window){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withButtons([
      {
      extend:    'copy',
      text:      '<i class="fa fa-files-o"></i> Copy',
      titleAttr: 'Copy'
      },
      {
      extend:    'print',
      text:      '<i class="fa fa-print"></i> Print',
      titleAttr: 'Print'
      },
      {
      extend:    'csvHtml5',
      text:      '<i class="fa fa-file-excel-o"></i> csv',
      titleAttr: 'csv'
      },
      {
      extend:    'pdfHtml5',
      text:      '<i class="fa fa-file-pdf-o"></i> pdf',
      titleAttr: 'print'
      },
      {
      extend:    'excel',
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
      },
      ]
      )
      ;
$scope.addEvent = function(){
  console.log('ooooooooooo')
  // window.open('/admin/home#!/addevent/');
  $window.location.href= '/admin/home#!/addevent';
}

  $scope.EventData = function(){
    $http({
      method : "GET",
      url : "/eventsreg"
    }).then(function success(response){
      $scope.ems = response.data;
    }, function error(response){
    })
  }
  $scope.PastScreen = false;
  $scope.PastScreen1 = false;
  $scope.ShowEntries = false;
  $scope.ShowHandler = false;
  $scope.ShowHip = false;
  $scope.ShowDraw = false;
  $scope.ShowCheckIn = false;
  $scope.ShowPayment = false;
  $scope.ShowLetter = false;
  $scope.showcomadmin = false;
  $scope.addeditjudges = false;
  $scope.addevent1 = false;
  $scope.addclass = false;
  $scope.addentry = false;
  $scope.viewentry = false;
  $scope.switchanimal = false;
  $scope.editevent = false;
  $scope.animaldet = false;
  $scope.outstand = false;
  $scope.editanimal = false;
  $scope.daysheetexport = false;
  $scope.showcrp = false;
  $scope.EventInfo = function(pe){
    $scope.PastScreen = true;
    $scope.PastScreen1 = true;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pasteventsinfo",
      data : pe
    }).then(function success(response){
      $scope.eis = response.data.data[0];
      $scope.teis = response.data.table;
      $scope. jud = response.data.judges;
      $scope.msg = response.data.msg;
    }, function error(response){
    })
  }
  $scope.OpenClass = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.openclass = true;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
  }
  $scope.OpenClass = function(tei){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.openclass = false;
    $scope.addopennewentry = true;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.tei1 = tei;
  }
  $scope.LoadAnimalData = function(sa,tei1){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.openclass = false;
    $scope.addopennewentry = false;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.loadanimal = true;
    $http({
      method : "POST",
      url : "/loadanimal",
      data : {a:sa, b:tei1}
    }).then(function success(response){
      $scope.load = response.data[0];
    }, function error(response){
    })
  }
  $scope.AddNewEntry =  function(seanimal){
    $http({
      method : "POST",
      url : "/addnewentry",
      data : seanimal
    }).then(function success(response){
      $scope.seanimal = {};
      $scope.sas1 = response.data;
    }, function error(response){
    })
  }
  $scope.EnterAnimalReg =  function(load){
    $http({
      method : "POST",
      url : "/enteranireg",
      data : load
    }).then(function success(response){
      alert('Success')
    }, function error(response){
    })
  }
  $scope.CompetitionAdmin = function(tei){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = true;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/editclass",
      data : tei
    }).then(function success(response){
      $scope.sca = response.data[0];
    }, function error(response){
    })
  }
  $scope.EditClass = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.editclass = true;
    $http({
      method : "POST",
      url : "/editclass",
      data : tei
    }).then(function success(response){
      $scope.sca = response.data[0];
    }, function error(response){
    })
  }
  $scope.UpdateEvent = function(ede){
    $http({
      method : "POST",
      url : "/updateevent",
      data : ede
    }).then(function success(response){
      $scope.alertb = true;
    }, function error(response){
      $scope.alertb = false;
    })
  }
  $scope.EditEvent = function(eis){
    // alert(eis)
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.editevent = true;
    $http({
      method : "POST",
      url : "/editeventreg",
      data : eis
    }).then(function success(response){
      $scope.ede = response.data[0];
    }, function error(response){
    })
  }
  $scope.AddClass = function(acs,eis){
    // alert(sca)
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addclass = true;
    $http({
      method : "POST",
      url : "/addclass",
      data : {acs:acs, eis:eis}
    }).then(function success(response){
      alert("Added Successfully")
      $scope.acs = {};
      $scope.teis = response.data;
    }, function error(response){
    })
  }
  $scope.AddEvent1 = function(eis){
    // alert(sca)
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addevent1 = true;
    $http({
        method : "POST",
        url : "/duplicate",
        data : eis
      }).then(function success(response){
        $scope.adde = response.data[0];
      }, function error(response){
      })
  }
  $scope.AddEventReg = function(eis){
    $http({
      method : "POST",
      url : "/addeventreg1",
      data : eis
    }).then(function success(response){
      alert("Added Successfully")
      $scope.eis = {};
    }, function error(response){
    })
  }
  $scope.Destroy = function(eis){
    $http({
      method : "POST",
      url : "/destroy",
      data : eis
    }).then(function success(response){
      alert("Removed Successfully")
    }, function error(response){
    })
  }
  $scope.RiderFee = function(eis){
    $http({
      method : "POST",
      url : "/riderfee",
      data : eis
    }).then(function success(response){
      $scope.note = response.data[0];
    }, function error(response){
    })
  }
  $scope.AddEditJudge = function(eis){
    // alert(sca)
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addentry = false;
    $scope.switchanimal = false;
    $scope.viewentry = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.editevent = false;
    $scope.addeditjudges = true;
    $http({
      method : "POST",
      url : "/judgedata",
      data : eis
    }).then(function success(response){
      $scope.judge = response.data;
    }, function error(response){
    })
  }
  $scope.UpdateJudge = function(judge,eis){
    $http({
      method : "POST",
      url : "/updatejudge",
      data : {judge : judge, eis : eis}
    }).then(function success(response){
      $scope.alertc = true;
      $scope.jud = response.data;
    }, function error(response){
      $scope.alertc = false;
    })
  }
  $scope.AddEntries = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = true;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.editevent = false;
    $scope.addclass = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/addentry",
      data : sca
    }).then(function success(response){
      $scope.aes = response.data;
    }, function error(response){
    })
  }
  $scope.ViewEntry = function(ae,eis,sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.switchanimal = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = true;
    $scope.animaldet = false;
    $scope.showgroup = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.editevent = false;
    $scope.addclass = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/viewentry",
      data : {ae:ae,eis:eis,sca:sca}
    }).then(function success(response){
      $scope.ves = response.data.data[0];
      $scope.ves1 = response.data.data1[0];
      $scope.ves2 = response.data.data2;
    }, function error(response){
    })
  }
  $scope.SwitchAnimal = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = true;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editevent = false;
    $scope.addclass = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
  }
  $scope.DaySheet = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.showcomadmin = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = true;
  }
  $scope.ResultsExports = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.editevent = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $scope.resultview = false;
    $scope.resultsexport = true;
  }
  $scope.ResultsView = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.editevent = false;
    $scope.addclass = false;
    $scope.daysheetexport = false;
    $scope.resultview = true;
  }
  $scope.AnimalDetails = function(ves1){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.editevent = false;
    $scope.addclass = false;
    $scope.switchanimal = false;
    $scope.animaldet = true;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/animaldetails",
      data : ves1
    }).then(function success(response){
      $scope.ands = response.data[0];
    }, function error(response){
    })
  }
  $scope.OutsStandings = function(ves1){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.editevent = false;
    $scope.addclass = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.outstand = true;
    $scope.editanimal = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/outstand",
      data : ves1
    }).then(function success(response){
      $scope.outs = response.data.data;
      $scope.outs1 = response.data.data1;
      $scope.outs2 = response.data.data2;
    }, function error(response){
    })
  }
  $scope.EditAnimal = function(ves1){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.editevent = false;
    $scope.addclass = false;
    $scope.outstand = false;
    $scope.editanimal = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/editanimal",
      data : ves1
    }).then(function success(response){
      $scope.eas = response.data[0];
    }, function error(response){
    })
  }
  $scope.UpdateAnimal = function(eas){
    $http({
      method : "POST",
      url : "/updateanimal",
      data : eas
    }).then(function success(response){
      $scope.alertd = true;
    }, function error(response){
      $scope.alertd = false;
    })
  }
  $scope.RemoveClass = function(ves1){
    $http({
      method : "POST",
      url : "/removeclass",
      data : ves1
    }).then(function success(response){
      alert('Removed Successfully');
    }, function error(response){
    })
  }
  $scope.SwitchDelivery = function(ves1){
    $http({
      method : "POST",
      url : "/switchdelivery",
      data : ves1
    }).then(function success(response){
      alert('Successfull');
    }, function error(response){
    })
  }
  $scope.MarkPaid = function(ves1){
    $http({
      method : "POST",
      url : "/markpaid",
      data : ves1
    }).then(function success(response){
      alert('Successfull');
    }, function error(response){
    })
  }
  $scope.DeleteEntry = function(ves1){
    $http({
      method : "POST",
      url : "/deleteentry",
      data : ves1
    }).then(function success(response){
      alert('Successfull');
    }, function error(response){
    })
  }
  $scope.SwitchAnimal1 = function(ves1,switch1){
    $http({
      method : "POST",
      url : "/switchanimal1",
      data : {ves1:ves1,switch1:switch1}
    }).then(function success(response){
    }, function error(response){
    })
  }
  $scope.EntriesExports = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.showcomadmin = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.animaldet = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.entriesexport = true;
    $scope.daysheetexport = false;
    $scope.editevent = false;
    $scope.addclass = false;
  }
  $scope.AllEntries = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = true;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showallentries",
      data : eis
    }).then(function success(response){
      $scope.saes = response.data
    }, function error(response){
    })
  }
  $scope.Handlers = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = true;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showhandler",
      data : eis
    }).then(function success(response){
      $scope.shs = response.data
    }, function error(response){
    })
  }
  $scope.Hip = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = true;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showhip",
      data : eis
    }).then(function success(response){
      $scope.ships = response.data
      $scope.hiplength = response.data.length;
      console.log($scope.hiplength);
    }, function error(response){
    })
  }
  $scope.GenerateHip = function(eis){
    $http({
      method : "POST",
      url : "/generatehip",
      data : eis
    }).then(function success(response){
      $scope.ships = response.data;
      $scope.hiplength = response.data.length;
    }, function error(response){
    })
  }
  $scope.AddClasss = function(){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.addclass = true;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
  }
$scope.Draw = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = true;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showdraw",
      data : eis
    }).then(function success(response){
      $scope.drs = response.data.data
      $scope.drs1 = response.data.data1[0];
    }, function error(response){
    })
  }
  $scope.Group = function(draw){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $scope.showgroup = true;
    $scope.showdaysheet = false;
    $http({
      method : "POST",
      url : "/showgroup",
      data : draw
    }).then(function success(response){
      $scope.sg = response.data.data;
      $scope.sgt = response.data.data1;
    }, function error(response){
    })
  }
  $scope.WipeDraw = function(sg){
    $http({
      method : "POST",
      url : "/wipedraw",
      data : sg
    }).then(function success(response){
      alert("Data Wiped")
    }, function error(response){
    })
  }
  $scope.DrawThis = function(sg,max){
    $http({
      method : "POST",
      url : "/drawthis",
      data : {sg:sg[0], max:max}
    }).then(function success(response){
      alert("Successfull")
    }, function error(response){
    })
  }
  $scope.EvaluateDraw = function(sg,maxside){
    $http({
      method : "POST",
      url : "/evaluatedraw",
      data : {sg:sg[0], maxside:maxside}
    }).then(function success(response){
      // alert("Successfull")
      $scope.eds = response.data[0];
    }, function error(response){
    })
  }
  $scope.Daysheet = function(draw){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $scope.showgroup = false;
    $scope.showdaysheet = true;
    $http({
      method : "POST",
      url : "/showdaysheet",
      data : draw
    }).then(function success(response){
      $scope.sds = response.data
    }, function error(response){
    })
  }
  $scope.CheckIn = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = true;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showcheckin",
      data : eis
    }).then(function success(response){
      $scope.chis = response.data
    }, function error(response){
    })
  }
  $scope.PaymentReport = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = true;
    $scope.ShowLetter = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showpayreport",
      data : eis
    }).then(function success(response){
      $scope.prs = response.data
    }, function error(response){
    })
  }
  $scope.ParticipationLetter = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/showletter",
      data : eis
    }).then(function success(response){
      $scope.pls = response.data[0];
    }, function error(response){
    })
  }
  $scope.HipTagList = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/hiptaglist",
      data : eis
    }).then(function success(response){
      $scope.htls = response.data;
    }, function error(response){
    })
  }
  $scope.HipTagListHandler = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/hiptaghandler",
      data : eis
    }).then(function success(response){
      $scope.hths = response.data;
    }, function error(response){
    })
  }
  $scope.PdfHipTed = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfhipted",
      data : eis
    }).then(function success(response){
      $scope.phts = response.data;
    }, function error(response){
    })
  }
  $scope.PdfTedHandler = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdftedhandler",
      data : eis
    }).then(function success(response){
      $scope.pths = response.data;
    }, function error(response){
    })
  }
  $scope.PdfJudgeHip = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfjudgehip",
      data : eis
    }).then(function success(response){
      $scope.pjhs = response.data;
    }, function error(response){
    })
  }
  $scope.BcHipTag = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/bchiptag",
      data : eis
    }).then(function success(response){
      $scope.bhts = response.data;
    }, function error(response){
    })
  }
  $scope.BcHipHandler = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/bchiphandler",
      data : eis
    }).then(function success(response){
      $scope.bhhs = response.data;
    }, function error(response){
    })
  }
  $scope.WipeHipTag = function(eis){
    $http({
      method : "POST",
      url : "/wipehiptag",
      data : eis
    }).then(function success(response){
      alert('Data Wiped')
      $scope.hiplength = response.data.length;
    }, function error(response){
    })
  }
  $scope.ParentageDaysheet = function(eis){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/parentagedaysheet",
      data : eis
    }).then(function success(response){
      $scope.pdss = response.data;
    }, function error(response){
    })
  }
  $scope.TOE = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = true;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/toe",
      data : sca
    }).then(function success(response){
      $scope.toe = response.data;
    }, function error(response){
    })
  }
  $scope.RCE = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = true;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/rce",
      data : sca
    }).then(function success(response){
      $scope.rce = response.data;
    }, function error(response){
    })
  }
  $scope.AEL = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = true;
    $scope.showlel = false;
    $scope.showrce = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/ael",
      data : sca
    }).then(function success(response){
      $scope.ael = response.data;
    }, function error(response){
    })
  }
  $scope.AEP = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showlel = false;
    $scope.showrce = false;
    $scope.showaep = true;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/aep",
      data : sca
    }).then(function success(response){
      $scope.aep = response.data;
    }, function error(response){
    })
  }
    $scope.LEL = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showaep = false;
    $scope.showlel = true;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/lel",
      data : sca
    }).then(function success(response){
      $scope.lel = response.data;
    }, function error(response){
    })
  }
  $scope.TOS = function(sca){
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = true;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/tos",
      data : sca
    }).then(function success(response){
      $scope.tos = response.data;
    }, function error(response){
    })
  }
  $scope.PDFD = function(sca){
    alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = true;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfd",
      data : sca
    }).then(function success(response){
      $scope.pdfd = response.data;
    }, function error(response){
    })
  }
  $scope.PDFP = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = true;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfp",
      data : sca
    }).then(function success(response){
      $scope.pdfp = response.data;
    }, function error(response){
    })
  }
  $scope.TBLP = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = true;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfp",
      data : sca
    }).then(function success(response){
      $scope.tblp = response.data;
    }, function error(response){
    })
  }
  $scope.TBLD = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = true;
    $scope.daysheetexport = false;
    $http({
      method : "POST",
      url : "/pdfp",
      data : sca
    }).then(function success(response){
      $scope.tbld = response.data;
    }, function error(response){
    })
  }
  $scope.CR = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = true;
    $scope.showcrp = false;
    $http({
      method : "POST",
      url : "/cr",
      data : sca
    }).then(function success(response){
      $scope.cr1 = response.data.data[0];
      $scope.cr = response.data.data1;
    }, function error(response){
    })
  }
  $scope.CRP = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrp = true;
    $http({
      method : "POST",
      url : "/onloadpayout",
      data : sca
    }).then(function success(response){
      $scope.pos = response.data[0];
    }, function error(response){
    })
  }
  $scope.PayOut = function(cal,sca){
    $http({
      method : "POST",
      url : "/payout",
      data : {cal : cal, sca : sca}
    }).then(function success(response){
      $scope.pos = response.data[0];
    }, function error(response){
    })
  }
  $scope.CRT = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrt = true;
    $scope.showlrt = false;
    $scope.showjst = false;
    $scope.showjer = false;
    $scope.showbjr = false;
    $http({
      method : "POST",
      url : "/crt",
      data : sca
    }).then(function success(response){
      $scope.crt = response.data;
    }, function error(response){
    })
  }
  $scope.LRT = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrt = false;
    $scope.showlrt = true;
    $scope.showjst = false;
    $scope.showjer = false;
    $scope.showbjr = false;
    $http({
      method : "POST",
      url : "/lrt",
      data : sca
    }).then(function success(response){
      $scope.lrt = response.data;
    }, function error(response){
    })
  }
  $scope.JST = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrt = false;
    $scope.showlrt = false;
    $scope.showjst = true;
    $scope.showjer = false;
    $scope.showbjr = false;
    $http({
      method : "POST",
      url : "/jst",
      data : sca
    }).then(function success(response){
      $scope.jst = response.data;
    }, function error(response){
    })
  }
  $scope.JER = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrt = false;
    $scope.showlrt = false;
    $scope.showjst = false;
    $scope.showjer = true;
    $scope.showbjr = false;
    $http({
      method : "POST",
      url : "/jer",
      data : sca
    }).then(function success(response){
      $scope.jer = response.data;
    }, function error(response){
    })
  }
  $scope.BJR = function(sca){
    // alert('hi')
    $scope.PastScreen = true;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.showcrt = false;
    $scope.showlrt = false;
    $scope.showjst = false;
    $scope.showjer = false;
    $scope.showbjr = true;
    $http({
      method : "POST",
      url : "/bjr",
      data : sca
    }).then(function success(response){
      $scope.bjr = response.data;
    }, function error(response){
    })
  }
  $scope.ExitPastScrrenInfo = function(){
    $scope.addopennewentry = false;
    $scope.loadanimal = false;
    $scope.PastScreen = false;
    $scope.PastScreen1 = false;
    $scope.ShowEntries = false;
    $scope.addevent = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showaep = false;
    $scope.showlel = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $scope.animaldet = false;
    $scope.showcr = false;
    $scope.showcrt = false;
    $scope.showlrt = false;
    $scope.showjst = false;
    $scope.editevent = true;
    $scope.showjer = false;
    $scope.showbjr = false;
    $scope.resultview = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.resultsexport = false;
    $scope.showcrp = false;
    $scope.addeditjudges = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.openclass = false;
    $scope.editevent = false;
  }
  $scope.ExitShowEntries = function(){
    $scope.loadanimal = false;
    $scope.editevent = false;
    $scope.addopennewentry = false;
    $scope.addeditjudges = false;
    $scope.openclass = false;
    $scope.addevent1 = false;
    $scope.addclass = false;
    $scope.addevent = false;
    $scope.PastScreen = true;
    $scope.PastScreen1 = true;
    $scope.ShowEntries = false;
    $scope.ShowHandler = false;
    $scope.ShowHip = false;
    $scope.ShowDraw = false;
    $scope.ShowCheckIn = false;
    $scope.ShowPayment = false;
    $scope.ShowLetter = false;
    $scope.hiptaglist = false;
    $scope.hiptaghandler = false;
    $scope.pdfhipted = false;
    $scope.pdftedhandler = false;
    $scope.pdfjudgehip = false;
    $scope.bchiptag = false;
    $scope.bchiphandler = false;
    $scope.parentagedaysheet = false;
    $scope.entriesexport = false;
    $scope.addentry = false;
    $scope.viewentry = false;
    $scope.switchanimal = false;
    $scope.outstand = false;
    $scope.editanimal = false;
    $scope.showtoe = false;
    $scope.showael = false;
    $scope.showrce = false;
    $scope.showlel = false;
    $scope.showaep = false;
    $scope.showtos = false;
    $scope.showcp = false;
    $scope.daysheetexport = false;
    $scope.showcr = false;
    $scope.animaldet = false;
    $scope.showcrt = false;
    $scope.showlrt = false;
    $scope.showjst = false;
    $scope.showjer = false;
    $scope.showbjr = false;
    $scope.resultview = false;
    $scope.showpdfd = false;
    $scope.showpdfp = false;
    $scope.showtblp = false;
    $scope.showtbld = false;
    $scope.resultsexport = false;
    $scope.showcrp = false;
    $scope.editevent = false;
  }
});
app.controller('EventResultsController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withButtons([
      {
      extend:    'copy',
      text:      '<i class="fa fa-files-o"></i> Copy',
      titleAttr: 'Copy'
      },
      {
      extend:    'print',
      text:      '<i class="fa fa-print"></i> Print',
      titleAttr: 'Print'
      },
      {
      extend:    'csvHtml5',
      text:      '<i class="fa fa-file-excel-o"></i> csv',
      titleAttr: 'csv'
      },
      {
      extend:    'pdfHtml5',
      text:      '<i class="fa fa-file-pdf-o"></i> pdf',
      titleAttr: 'print'
      },
      {
      extend:    'excel',
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
      },
      ]
      )
      ;
  $scope.EventResultsData = function(){
    $http({
      method : "GET",
      url : "/eventresults"
    }).then(function success(response){
      $scope.erm = response.data;
    }, function error(response){
    })
  }
  $scope.WipeResults = function(er){
    $http({
      method : "POST",
      url : "/wiperesults",
      data : er
    }).then(function success(response){
      alert('Removed Successfully')
      var index = $scope.erm.indexOf(er);
      $scope.erm.splice(index, 1);
    }, function error(response){
    })
  }
});
app.controller('PayController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withButtons([
      {
      extend:    'copy',
      text:      '<i class="fa fa-files-o"></i> Copy',
      titleAttr: 'Copy'
      },
      {
      extend:    'print',
      text:      '<i class="fa fa-print"></i> Print',
      titleAttr: 'Print'
      },
      {
      extend:    'csvHtml5',
      text:      '<i class="fa fa-file-excel-o"></i> csv',
      titleAttr: 'csv'
      },
      {
      extend:    'pdfHtml5',
      text:      '<i class="fa fa-file-pdf-o"></i> pdf',
      titleAttr: 'print'
      },
      {
      extend:    'excel',
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
      },
      ]
      )
      ;
  $scope.EventPay = function(){
    $http({
      method : "GET",
      url : "/eventpay"
    }).then(function success(response){
      $scope.pays = response.data;
    }, function error(response){
    })
  }
  $scope.PaymentSubTab = function(pay){
    $scope.main = true;
    $scope.subtab = true;
    $http({
      method : "POST",
      url : "/paymentsubtotal",
      data : pay
    }).then(function success(response){
      $scope.pst = response.data.data[0];
      $scope.pst1 = response.data.data1;
      $scope.pst2 = response.data.data2[0];
    }, function error(response){
    })
  }
  $scope.SaveNote = function(pst){
    $http({
      method : "POST",
      url : "/savenote",
      data : pst
    }).then(function success(response){
      alert('Notes Saved Successfully')
    }, function error(response){
    })
  }
  $scope.ExitPay = function(){
    $scope.main = false;
    $scope.subtab = false;
  }
  });
app.controller('PayOutController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.Calculate = function(cal){
    $http({
      method : "POST",
      url : "/payoutcal",
      data : cal
    }).then(function success(response){
      $scope.result = response.data[0];
    }, function error(response){
    })
  }
  $scope.Calculate1 = function(cal){
    $http({
      method : "POST",
      url : "/payoutcal1",
      data : cal
    }).then(function success(response){
      $scope.result1 = response.data;
    }, function error(response){
    })
  }
  $scope.Calculate2 = function(cal){
    $http({
      method : "POST",
      url : "/payoutcal2",
      data : cal
    }).then(function success(response){
      $scope.result2 = response.data
    }, function error(response){
    })
  }
  $scope.Calculate3 = function(cal){
    $http({
      method : "POST",
      url : "/payoutcal3",
      data : cal
    }).then(function success(response){
      $scope.result3 = response.data
    }, function error(response){
    })
  }
  $scope.Calculate4 = function(cal){
    $http({
      method : "POST",
      url : "/payoutcal4",
      data : cal
    }).then(function success(response){
      $scope.result4 = response.data
    }, function error(response){
    })
  }
  $scope.Calculate5 = function(cal){
    $http({
      method : "POST",
      url : "/payoutcal5",
      data : cal
    }).then(function success(response){
      $scope.result5 = response.data
    }, function error(response){
    })
  }
  $scope.Calculate6 = function(cal){
    $http({
      method : "POST",
      url : "/payoutcal6",
      data : cal
    }).then(function success(response){
      $scope.result6 = response.data
    }, function error(response){
    })
  }
  $scope.Calculate7 = function(cal){
    $http({
      method : "POST",
      url : "/payoutcal7",
      data : cal
    }).then(function success(response){
      $scope.result7 = response.data
    }, function error(response){
    })
  }
});
//----------------------------------------------------Bulk Contacts----------------
app.controller('BulkContactsController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  .withButtons([
      {
      extend:    'copy',
      text:      '<i class="fa fa-files-o"></i> Copy',
      titleAttr: 'Copy'
      },
      {
      extend:    'print',
      text:      '<i class="fa fa-print"></i> Print',
      titleAttr: 'Print'
      },
      {
      extend:    'csvHtml5',
      text:      '<i class="fa fa-file-excel-o"></i> csv',
      titleAttr: 'csv'
      },
      {
      extend:    'pdfHtml5',
      text:      '<i class="fa fa-file-pdf-o"></i> pdf',
      titleAttr: 'print'
      },
      {
      extend:    'excel',
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
      },
      ]
      )
      ;
  $scope.BulkContact = function(){
    $http({
      method : "GET",
      url : "/bulkcontact"
    }).then(function success(response){
      $scope.bcs = response.data;
    }, function error(response){
    })
  }
});

//--------------------------------------------------------------------------------Standings------------------------------------------------------------------------------------
  app.controller('StandingsController', function($scope,$http){
    $scope.showstand = false;
    $scope.showstand1 = false;
    $scope.showstand2 = false;
    $scope.updatestand = false;
    $scope.ShowCurrentStand = function(){
      $scope.showstand1 = false;
      $scope.showstand = true;
      $scope.current = true;
      $scope.showall = false;
      $scope.export = false
      $scope.showstand2 = false;
      $scope.updatestand = false;

    }
    $scope.ExportStanding = function(){
      $scope.showstand1 = false;
      $scope.showstand = true;
      $scope.current = false;
      $scope.showall = false;
      $scope.export = true;
      $scope.updatestand = false;
      $scope.showstand2 = false;
      $http({
        method : 'GET',
        url : '/exportstanding'
      }).then(function success(response){
        $scope.ess = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.AllStanding = function(){
      $scope.showstand1 = false;
      $scope.showstand = true;
      $scope.current = false;
      $scope.current = false;
      $scope.showall = true;
      $scope.export = false;
      $scope.showstand2 = false;
      $scope.updatestand = false;
      $http({
        method : 'GET',
        url : '/allstanding'
      }).then(function success(response){
        $scope.ass = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })

    }
    $scope.ViewStandings = function(){
      $scope.showstand1 = true;
      $scope.showstand = true;
      $scope.current = false;
      $scope.past = false;
      $scope.showstand2 = false;
      $scope.updatestand = false;
    }
    $scope.ViewDataExport = function(){
      $scope.showstand1 = false;
      $scope.showstand = true;
      $scope.current = false;
      $scope.past = false;
      $scope.showstand2 = true;
      $scope.updatestand = false;
    }
    $scope.ExitCurrent = function(){
      $scope.showstand1 = false;
      $scope.showstand = false;
      $scope.current = false;
      $scope.showstand2 = false;
      $scope.updatestand = false;
    }
    $scope.ShowPastStand = function(){
      $scope.showstand1 = false;
      $scope.showstand = true;
      $scope.past = true;
      $scope.showstand2 = false;
      $scope.updatestand = false;
    }
    $scope.ExitPast = function(){
      $scope.showstand1 = false;
      $scope.showstand = false;
      $scope.current = false;
      $scope.past = false;
      $scope.showstand2 = false;
      $scope.updatestand = false;
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
    $scope.GetMoney = function(){
      $http({
        method : 'GET',
        url : '/getmoney'
      }).then(function success(response){
        $scope.money = response.data.data;
        $scope.money1 = response.data.data1;
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
      // console.log(data)
      $scope.season = {};
      $scope.current = false;
      $scope.tablestandings = true;
      $scope.showstand2 = false;
      $scope.updatestand = false;
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
    $scope.ExitTableStand1 = function(){
      $scope.current = false;
      $scope.tablestandings = false;
      $scope.showstand2 = true;
      $scope.showall = false;
      $scope.export = false;
      $scope.updatestand = false;
    }
    $scope.AFP1 = function(data){
      $scope.current = false;
      $scope.past = false;
      $scope.tablestandings = true;
      $scope.showstand2 = false;
      $scope.updatestand = false;
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
    $scope.ExitTableStand = function(){
      $scope.current = true;
      $scope.tablestandings = false;
      $scope.showstand2 = false;
      $scope.showall = false;
      $scope.export = false
      $scope.updatestand = false;
    }
    $scope.ShowPPYear = function(){
      var year = new Date()
      year.setFullYear(year.getFullYear())
      var previousYear = new Date()
      previousYear.setFullYear(previousYear.getFullYear() - 1)
      $scope.cyear = year;
      $scope.pyear = previousYear;
    }
    $scope.GetUpdateData = function(){
      $scope.showstand1 = false;
      $scope.showstand = true;
      $scope.showstand1 = false;
      $scope.current = false;
      $scope.tablestandings = false;
      $scope.showstand2 = false;
      $scope.showall = false;
      $scope.export = false
      $scope.updatestand = true;
      $http({
        method : 'GET',
        url : '/getstandupdatedata'
      }).then(function success(response){
        $scope.gsu = response.data[0];
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.CompileSeason = function(gsu){
      $http({
        method : 'POST',
        url : '/compileseason',
        data : gsu
      }).then(function success(response){
        alert("Compiled Successfully")
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.Bucket = function(gsu){
      $http({
        method : 'POST',
        url : '/Bucket',
        data : gsu
      }).then(function success(response){
        alert("Bucket Compilation Successfull")
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.SetMoney = function(gsu){
      $http({
        method : 'POST',
        url : '/SetMoney',
        data : gsu
      }).then(function success(response){
        alert("Money Set Successfully")
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.CompileStand = function(gsu){
      $http({
        method : 'POST',
        url : '/CompileStand',
        data : gsu
      }).then(function success(response){
        alert("Compiled Successfully")
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.SetPosition = function(gsu){
      $http({
        method : 'POST',
        url : '/SetPosition',
        data : gsu
      }).then(function success(response){
        alert("Position Set Successfully")
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.AnimalEarningUpdate = function(gsu){
      $http({
        method : 'POST',
        url : '/AnimalEarningUpdate',
        data : gsu
      }).then(function success(response){
        alert("Updated Successfully")
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.LegacyDam = function(gsu){
      $http({
        method : 'POST',
        url : '/LegacyDam',
        data : gsu
      }).then(function success(response){
        alert("Updated Successfully")
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  });
//-------------------------------Jpad Controller---------------------------
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
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        console.log(fd)
        data=$http.post(uploadUrl, fd, {
       transformRequest: angular.identity,
       headers: {'Content-Type': undefined}
     })
      .then(function(success){
        console.log(success,'succes')
        // let msg = success.data.msg === 'OK' ?  'Upload Sucessfully' : success.data.msg
        alert('Upload Sucessfully!')
      },function(error){
        alert('Upload Failed!')
        console.log(error,'rrr')
      })
      // console.log('error')
    }
}]);
app.controller('JpadController', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        var uploadUrl = "/jpadimport";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
}]);
app.controller('additionEventController', ['$scope', 'fileUpload','$window','$http','$routeParams','$filter' ,function($scope, fileUpload,$window,$http,$routeParams,$filter){
  $scope.updateBtn = false;
  $scope.addevent = {};
 

  $scope.eventView = function(){
    $scope.addevent.pevid = null;
    console.log($scope.addevent,'add event')
    $http({
      method : "POST",
      url : "/events/addevent",
      data : $scope.addevent
    }).then(function success(response){
      if(response.data.length > 0){
      let id = response.data[0].pevid;
    $window.location.href= '/admin/home#!/eventview/' + id;
      }
}, function error(response){
  console.log('Error in adding events!');
    })
  }
  //---------------
$scope.checkURL = function() {
  let evid = $window.location.href
  if(evid.includes('?')) {
  let url = evid.split('=')[1];
  let value = evid.split('=')[0];
  $http({
    method : "POST",
    url : "/events/editeventreg",
    data : {pevid : url}
  }).then(function success(response){
    if(response.data.length > 0){
      $scope.addevent = response.data[0]
      $scope.addevent.startday = new Date($scope.addevent.startday)
      $scope.addevent.enddate = new Date($scope.addevent.enddate)
    }
}, function error(response){
console.log('Error in event!');
  })
if(value.includes('edit')){
  $scope.updateBtn = true;
}
else if(value.includes('duplicate')){
  $scope.updateBtn = false;
}
  }
}
//------------------
$scope.updateEvent = function(){
  $http({
    method : "POST",
    url : "/events/updateevent",
    data : $scope.addevent
  }).then(function success(response){
    if(response.data.length > 0){
    let id = response.data[0].pevid;
  $window.location.href= '/admin/home#!/eventview/' + id;
    }
}, function error(response){
console.log('Error in updating events!');
  })
}

}]);

app.controller('EventViewController', ['$scope', 'fileUpload','$routeParams','$http','$window', function($scope, fileUpload,$routeParams,$http,$window){
  $scope.eventData = {};
  $scope.classTable =[];
  $scope.judgesData = [];
  $scope.getEventData = function(){
    $http({
      method : "POST",
      url : "/events/editeventreg",
      data : {pevid : $routeParams.id}
    }).then(function success(response){
      if(response.data.length > 0){
        $scope.eventData = response.data[0]
      }
}, function error(response){
  console.log('Error in event view!');
    })
  }
  $scope.eventDetails = function(){
    $http({
      method:'POST',
      url:'/events/moreschedule',
      data:{pevid: $routeParams.id}
    }).then(function success(data){
    $scope.classTable = data.data.data3
    $scope.judgesData = data.data.data2
    },function error(err){
      console.log('Error in fetching event data!')
    })
  }
  $scope.classOpen = function(classid){
    $window.location.href= '/admin/home#!/classview/' + $routeParams.id +'?evid=' + classid;
  }
//--------------
$scope.goToEditEvent = function(){
  $window.location.href= '/admin/home#!/addevent?edit=' + $routeParams.id;
}
//------------------
$scope.duplicateEvent = function(){
  $window.location.href= '/admin/home#!/addevent?duplicate=' + $routeParams.id;

}
//---------
$scope.addClass = function() {
  $window.location.href='http://localhost/admin/home#!/addclass?previd='+$routeParams.id;
}
$scope.deleteEvent = function(){
  $http({
    method: 'POST',
    url: '/events/destroy',
    data: {pevid: $routeParams.id}
  }).then(function success(data){
    $('#destroyEvent').modal('hide');
    $window.location.href="/admin/home#!/regevents"
  },function error(err){
    console.log('Error in deleting events!')
  })
}
$scope.addJudges = function(){
  $window.location.href= '/admin/home#!/addjudges/?add=' + $routeParams.id;
}
 }]);
 app.controller('EventHomeController', ['$scope', 'fileUpload', function($scope, fileUpload){
  console.log('EventHomeController')
 }]);
 
 app.controller('ResultBossController', ['$scope', 'fileUpload', function($scope, fileUpload){
  console.log('ResultBossController')
 }]);
 
 app.controller('BullBossController', ['$scope', 'fileUpload', function($scope, fileUpload){
  console.log('BullBossController')
 }]);
 
 app.controller('ImportJpadController', ['$scope', 'fileUpload', function($scope, fileUpload){
  $scope.uploadFile = function(){
    var file = $scope.myFile;
    var uploadUrl = "/events/jpadimport";
    fileUpload.uploadFileToUrl(file, uploadUrl);
};
 }]);
 
 app.controller('PastEventController', ['$scope', 'fileUpload','$http','$window', function($scope, fileUpload,$http,$window){
  $scope.pastEvents = [];
$scope.pastEvents = function(){
    $http({
      method:'GET',
      url:"/events/pastevents"
    }).then(function success(response){
        $scope.pastEvents = response.data
    }).catch(function error(err){
      console.log('Error in past events!')
    })
}

$scope.enterPastEvent = function(obj){
  $window.location.href = '/admin/home#!/eventview/'+obj.pevid
}
 }]);

 app.controller('HandlerFormController', ['$scope', 'fileUpload','$window','$http', function($scope, fileUpload,$window,$http){
  $scope.addhandler = {};
  $scope.updatehandler = false;
  let u = $window.location.href.split('=')[1]
  let url = $window.location.href.split('=');
  if(url[0].includes('edit')){
    $scope.updatehandler = true;
  }
  if($window.location.href.split('=')[0].includes('edit')){
  $scope.getHandlerForm = function(){
    $http({
      method:'POST',
      url:"/events/edithandler",
      data: {rowid : $window.location.href.split('=')[1]}
    }).then(function success(response){
      $scope.addhandler = response.data[0];
    }).catch(function error(err){
      console.log('Error in adding handler form!',err)
    })
  }
  }

  $scope.addnewHandler = function(){
    $http({
      method:'POST',
      url:"/events/addnewhandler",
      data: $scope.addhandler
    }).then(function success(response){
  $window.location.href= '/admin/home#!/handlerlist';
    }).catch(function error(err){
      console.log('Error in adding handler form!')
    })
  }

  $scope.updateHandler = function(){
    $http({
      method:'POST',
      url:"/events/updatehandler",
      data: $scope.addhandler
    }).then(function success(response){
  $window.location.href= '/admin/home#!/handlerlist';
    }).catch(function error(err){
      console.log('Error in updating handler form!')
    })
  }


 }]);

 
 app.controller('ProgramEventsController', ['$scope', 'fileUpload', function($scope, fileUpload){
  console.log('ProgramEventsController')
 }]);
 
 app.controller('ClassLinkController', ['$scope', 'fileUpload', function($scope, fileUpload){
  console.log('ClassLinkController')
 }]);
 

app.controller('HandlerListController',['$scope','$http','$window',function($scope,$http,$window){
  $scope.handlerArray = [];
  $scope.selectedObj = {};

$scope.getHandlerList = function(){
  $http({
    method:'GET',
    url:"/events/handlerdata"
  }).then(function success(response){
    $scope.handlerArray = response.data;
  }).catch(function error(err){
    console.log('Error in edit handler form!')
  })
}

$scope.selectId = function(obj){
  $scope.selectedObj = obj.rowid
}
$scope.handlerDelete = function(){
  $http({
    method:'POST',
    url:"/events/deletehandler",
    data: {rowid : $scope.selectedObj}
  }).then(function success(response){
$('#deleteHandler').modal('hide');
$scope.getHandlerList();
  }).catch(function error(err){
    console.log('Error in deleting handler form!')
  })
}

$scope.handlerPage = function(obj){
$window.location.href = '/admin/home#!/handlerform?edit='+ obj.rowid
}
}])
app.controller('EditClassController', ['$scope', 'fileUpload', function($scope, fileUpload){
  console.log('EditClassController')
 }]);

 
 app.controller('ClassEntryListController', ['$scope', 'fileUpload', function($scope, fileUpload){
  console.log('ClassEntryListController')
 }]);


app.controller('RlistController', ['$scope', 'fileUpload','$http','$window', function($scope, fileUpload,$http,$window){
  $scope.getData = function(){
$http({
  method:'GET',
  url:'/events/eventresults'
}).then(function success(response){
  $scope.tableData = response.data;
}).catch(function error(err){
  console.log('Error in getting event results!')
})
  }

  $scope.redirect = function(id){
    console.log(id,'idididid')
$window.location.href = '/admin/home#!/eventview/'+id
  }
 }]);

 app.controller('RegisterEventsController', ['$scope', 'fileUpload','$http','$window', function($scope, fileUpload,$http,$window){
  $scope.getData = function(){
    $http({
      method:'GET',
      url:"/events/eventsreg"
    }).then(function success(response){
      $scope.eventsData = response.data;
    }).catch(function error(err){
      console.log('Error in deleting handler form!')
    })
  }

  $scope.openEvent = function(obj){
$window.location.href = '/admin/home#!/eventview/'+obj.pevid
  }
 }]);
app.controller('AddClassController', ['$scope', 'fileUpload','$http','$window', function($scope, fileUpload,$http,$window){
  $scope.addclass = {};
  $scope.addclass.pevid = $window.location.href.split('=')[1].split('&')[0]
  $scope.addclass.evid = $window.location.href.split('=')[2]
  $scope.eventInfo = {};
  $scope.editClassBtn = false;
  $scope.getClassDetails = function(){
    let u = $window.location.href.split('=')[0]
   if(u.includes('edit') || u.includes('duplicate')){
    let id = $window.location.href.split('=')[1];
    let url = $window.location.href.split('=')[0];
    $http({
      method : "POST",
      url : "/events/getsingleclass",
      data : {evid : $scope.addclass.evid, pevid : $scope.addclass.pevid}
    }).then(function success(response){
      $scope.addclass = {};
      $scope.addclass = response.data[0];
      $scope.addclass.pevid = $window.location.href.split('=')[1].split('&')[0];
}, function error(response){
  console.log('Error in Adding Class!');
    })
  if(url.includes('edit')){
    this.editClassBtn = true;
  } else if(url.includes('duplicate')){
    this.editClassBtn = false;
  }
  }
}
$scope.updateClass = function(){
  $http({
    method:'POST',
    url:"/events/updateclass",
    data: $scope.addclass
  }).then(function success(response){
$window.location.href= '/admin/home#!/classview/' + $scope.addclass.pevid +'?evid=' + $scope.addclass.evid;
  }).catch(function error(err){
    console.log('Error in updating class!')
  })
}
$scope.submitForm = function(form){
    $http({
      method : "POST",
      url : "/events/addclass",
      data : form
    }).then(function success(response){
      console.log(response,'responseeeeeeeeeeeeeeeeeeeeee')
      $window.location.href = '/admin/home#!/classview/' + $scope.addclass.pevid +'?evid=' + response.data[0].evid;
}, function error(response){
  console.log('Error in Adding Class!');
    })
  }
$scope.getInfo = function(){
  $http({
    method : "POST",
    url : "/events/geteventinfo",
    data : {eventid : $scope.addclass.pevid}
  }).then(function success(response){
    $scope.eventInfo = response.data[0];
}, function error(response){
console.log('Error ingetting event info!');
  })
}
 }]);

 app.controller('ClassViewController',['$scope','$http','$window',function($scope,$http,$window){
  $scope.eventDet = {};
  $scope.classData = {};
  $scope.classid  = $window.location.href.split('=')[1];
  let temp = $window.location.href.split('?')[0].split('/').length
  let pevid = $window.location.href.split('?')[0].split('/')[temp-1];
  $scope.eventDet['pevid'] = pevid;
  $scope.getInfo = function(){
    $http({
      method : "POST",
      url : "/events/geteventinfo",
      data : {eventid : $scope.eventDet['pevid']}
    }).then(function success(response){
      $scope.eventDet = response.data[0];
  }, function error(response){
  console.log('Error in getting event info!');
    })
  }

  $scope.classDetails = function(){
    $http({
      method : "POST",
      url : "/events/getsingleclass",
      data : {evid : $scope.classid,pevid : $scope.eventDet['pevid']}
    }).then(function success(response){
      $scope.classData = response.data[0];
  }, function error(response){
  console.log('Error in getting class info!');
    })
  }
$scope.entryList = function(){
  $window.location.href = '/admin/home#!/classentrylist';
}
$scope.editClass = function(){
  $window.location.href = '/admin/home#!/addclass?edit=' + $scope.eventDet['pevid'] + '&evid=' +$scope.classData.evid;
}
$scope.duplicateClass = function(){
  $window.location.href = '/admin/home#!/addclass?duplicate=' + $scope.eventDet['pevid']+ '&evid=' +$scope.classData.evid;
}
$scope.deleteClass = function(){
  $http({
    method : "POST",
    url : "/events/deleteclass",
    data : {evid : $scope.classData.evid}
  }).then(function success(response){
    $('#deleteClass').modal('hide');
    $window.location.href= '/admin/home#!/eventview/' + $scope.classData.pevid;
}, function error(response){
console.log('Error in getting class info!');
  })
}
 }]);

app.controller('AddJudgesController',['$scope','$http','$window',function($scope,$http,$window){
  let pevid = $window.location.href.split('=')[1]
  $scope.eventId =  $window.location.href.split('=')[1]
  $scope.addjudges= {};
$scope.eventDet = {};
$scope.judgeArray = [];
  $scope.getInfo = function(){
    $http({
      method : "POST",
      url : "/events/geteventinfo",
      data : {eventid : pevid}
    }).then(function success(response){
      $scope.eventDet = response.data[0];
      console.log($scope.eventDet,'eventDet')
  }, function error(response){
  console.log('Error in getting event info!');
    })
  }

  $scope.getJudgesDetails = function(){
    $http({
      method : "POST",
      url : "/events/judgedata",
      data : {pevid : pevid}
    }).then(function success(response){
      console.log(response,'responseeee')
      $scope.judgesData = response.data;
      // $scope.judgesData.forEach((data,index)=>{
        if($scope.judgesData[0])  $scope.addjudges.j1 = ($scope.judgesData[0].jname);
        if($scope.judgesData[1])  $scope.addjudges.j2 = ($scope.judgesData[1].jname);
        if($scope.judgesData[2])  $scope.addjudges.j3 = ($scope.judgesData[2].jname);
        if($scope.judgesData[3])  $scope.addjudges.j4 = ($scope.judgesData[3].jname);
        if($scope.judgesData[4])  $scope.addjudges.j5 = ($scope.judgesData[4].jname);
        if($scope.judgesData[5])  $scope.addjudges.j6 = ($scope.judgesData[5].jname);
      // })
  }, function error(response){
  console.log('Error in getting judges info!');
    })
  }
$scope.addJudges = function(){
  console.log($scope.addjudges,'addjudgesss')
for(let i=0;i<Object.keys($scope.addjudges).length;i++){
    $scope.judgeArray.push({jname : Object.values($scope.addjudges)[i]})
  }
  $http({
    method : "POST",
    url : "/events/updatejudge",
    data : {judge : $scope.judgeArray, pevid: $scope.eventId}
  }).then(function success(response){
    console.log(response,'responseeee')
    // $scope.judgesData = reponse.data'
    $window.location.href= '/admin/home#!/eventview/' + $scope.eventId;
}, function error(response){
console.log('Error in getting judges info!');
  })
}
}]);