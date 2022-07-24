var app = angular.module('RegApp',['ui.directives', 'ui.filters','datatables', 'datatables.buttons','AngularPrint','ngRoute']);
//-------------------------------------------------------Past Events--------------------------------------------------------
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider
      .when('/', { template: 
        `<div>
            <h2 class="text-center" style="background-color:#503219; color:#fff; padding:5px; min-width:100px;">Home</h2>
          </div>
          <div class="container border" style="height:100%;width:90%;padding: 10px;">
            <h3 class="text-danger text-center">Welcome to ABBI Reg</h3>
          </div>`
      })
      .when('/regevents', { templateUrl: 'regevents', controller:'EventsController' })
      .when('/regpastevents', { templateUrl: 'regpastevents', controller:'PastController' })
      .when('/regeventresults', { templateUrl: 'regeventresults', controller:'EventResultsController' })
      .when('/reglink2classes', { templateUrl: 'reglink2classes', controller:'LinkController' })
      .when('/reganimals', { templateUrl: 'reganimals', controller:'AddAnimalController' })
      .when('/reghandlers', { templateUrl: 'reghandlers', controller:'HandlerController' })
      .when('/regprograms', { templateUrl: 'regprograms', controller:'ProgramController' })
      .when('/regaddevent', { templateUrl: 'regaddevent', controller:'AddEventController' })
      .when('/regstandings', { templateUrl: 'regstandings', controller:'StandingsController' })
      .when('/regpayoutcal', { templateUrl: 'regpayoutcal', controller:'PayOutController' })
      .when('/regimportjpad', { templateUrl: 'regimportjpad', controller:'JpadController' })
      .when('/regeventpay', { templateUrl: 'regeventpay', controller:'PayController' })
      .when('/regbulkcontact', { templateUrl: 'regbulkcontact', controller:'BulkContactsController' })
      .otherwise({ redirectTo: '/' });
}]);
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
        window.location.href = '/reghome';
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
  app.controller('AddAnimalController', function($scope,$http){
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
app.controller('EventsController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
        // alert("Uploded Successfully")
        // console.log(success.data)
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