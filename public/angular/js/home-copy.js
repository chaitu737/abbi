var app = angular.module('HomeApp',['ui.directives', 'ui.filters','datatables', 'datatables.buttons']);
//--------------------------------------------------------Home Controller------------------------------------------------------
app.controller('HomeController', function($scope,$http){
  $scope.SearchAnimalProfile = function(animal){
    $http({
      method : 'POST',
      url : '/searchanimalprofile',
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
      $scope.notes = response.data.notes[0];
    },function error(response){
    })
  }
  $scope.SearchAnimalSireProfile = function(animal){
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
  $scope.SearchAnimalSirePedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/searchanimalsiredampedigree',
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
      $scope.pedigree = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
      $scope.offspring = response.data.offspring;
    },function error(response){
    })
  }
  $scope.SearchAnimalDamPedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/searchanimaldampedigree',
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
      $scope.pedigree = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
      $scope.offspring = response.data.offspring;
    },function error(response){
    })
  }
  $scope.SearchAnimalGSirePedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/searchanimalgsirepedigree',
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
      $scope.pedigree = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
      $scope.offspring = response.data.offspring;
    },function error(response){
    })
  }
  $scope.SearchAnimalGDamPedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/searchanimalgdampedigree',
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
      $scope.pedigree = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
      $scope.offspring = response.data.offspring;
    },function error(response){
    })
  }
  $scope.SearchAnimalGrandSirePedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/searchanimalgrandsirepedigree',
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
      $scope.pedigree = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
      $scope.offspring = response.data.offspring;
    },function error(response){
    })
  }
  $scope.SearchAnimalGrandDamPedigree = function(pedigree){
    $http({
      method : 'POST',
      url : '/searchanimalgranddampedigree',
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
      $scope.pedigree = response.data.pedigree[0];
      $scope.previousowner = response.data.previousowner;
      $scope.offspring = response.data.offspring;
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
    },function error(response){
    })
  }
});
//--------------------------------------------------------Inventory Data--------------------------------------------------------
//--------------------------------------------------------Current Data----------------------------------------------------------
app.controller('currentController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-print" aria-hidden="true"></i> Print',
    titleAttr: 'Print'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
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
    text:      '<i class="fa fa-file-text-o"></i> csv',
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
    text:      '<i class="fa fa-file-text-o"></i> csv',
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
    text:      '<i class="fa fa-file-text-o"></i> csv',
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
    if(change.password == change.cpassword){
      $http({
        method : 'POST',
        url : '/changeuserpassword',
        data : change
      }).then(function success(response){
        alert('Password Updated Successfully');
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
    }
    else{
      alert("Password and Confirm Password didn't match")
    }
  }
});
//-------------------------------------------------------------------Search Animal------------------------------------------
app.controller('searchAnimalController', function($scope,$http, DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
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
    text:      '<i class="fa fa-print" aria-hidden="true"></i> Print',
    titleAttr: 'Print'
  },
  {
    extend:    'csvHtml5',
    text:      '<i class="fa fa-file-text-o"></i> csv',
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
  $scope.addPartners = function(addpartner){
    // console.log($scope.addpartner)
    $http({
      method : 'POST',
      url : '/addpartnerdata',
      data : addpartner
    }).then(function success(response){
      alert('Updated Successfully');
      $scope.addpartner = {};
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

//-------------------------------------------------------------------register Animal------------------------------------------
app.controller('registerAnimalController', function($scope, $http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder) {
  $scope.showtable = function(){
    $scope.tablehide = true;
  }
  $scope.ResetAddAnimal = function(reganimal){
    $scope.reganimal = {};
  }
  $scope.CheckAnimal = function(reganimal){
    var a = reganimal.AnimalName.includes('breeding');
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
          // console.log($scope.animalname)
          $scope.message = "Animal Name Already Exists";
        }
        else if($scope.animalname == 0 && $scope.animalname == 0){
          // console.log($scope.animalname)
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
  $scope.tempAnimalRegister = function (reganimal) {
    $http({
      method : 'POST',
      url : '/tempanimaldata',
      data : reganimal
    }).then(function success(response){
      $scope.reganimal = {};
      window.location.href = '/home';
      alert('To Complete full registration, you may add Animal Sire and Dam Details by Editing in Holding Pen ')
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  };
});
//-------------------------------------------------------------------Holding Pen------------------------------------------
app.controller('HoldingPenController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
  $scope.vm = {};
  $scope.vm.dtInstance = {};
  $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
  $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
  .withOption('paging', true)
  .withOption('searching', true)
  .withOption('info', true)
  $scope.regno = true;
  $scope.sire = true;
  $scope.someone = true;
  $scope.showpen = false;
  $scope.stage = "";
  $scope.showpenClick = function(){
    $scope.showpen = true;
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
    $http({
      method : 'POST',
      url : '/updateanimaldetails',
      data : reganimal
    }).then(function success(response){
      alert('Updated Successfully');
    },function error(response){
        // alert('Error occured. Please try again later!');
      })
  }
  $scope.currentSireClick = function () {
    $http({
      method : 'GET',
      url : '/currentdatasire',
    }).then(function success(response){
      $scope.css = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.ShowNextPanel = function () {
    $http({
      method : 'GET',
      url : '/shownextpanel',
    }).then(function success(response){
      $scope.andetails = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.previousSireClick = function () {
    $http({
      method : 'GET',
      url : '/previousdatasire',
    }).then(function success(response){
      $scope.pss = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.deceasedSireClick = function () {
    $http({
      method : 'GET',
      url : '/deceaseddatasire',
    }).then(function success(response){
      $scope.dss = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.currentbreedingSireClick = function () {
    $http({
      method : 'GET',
      url : '/currentbreedingdatasire',
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
      // console.log($scope.reganimal);
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.addRegNoSire = function(reganimal){
    $http({
      method : 'POST',
      url : '/addregnosire',
      data : reganimal
    }).then(function success(response){
      $scope.ssrs = response.data;
      $scope.reganimal.txtreg = "";
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.RemoveSSR = function(ssr,reganimal){
    $http({
      method : 'POST',
      url : '/removesirefromlist/'+reganimal.RegnoID,
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
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/addcurrentsiretolist/'+reganimal.RegnoID,
      data : cs
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddPreviousSireToList = function(ps,reganimal){
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/addprevioussiretolist/'+reganimal.RegnoID,
      data : ps
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddDeceasedSireToList = function(ds,reganimal){
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/adddeceasedsiretolist/'+reganimal.RegnoID,
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
      url : '/addcurrentsiretobreeding/'+reganimal.RegnoID,
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
      url : '/removesirefrombreedinglist/'+reganimal.RegnoID,
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
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/someoneaddcurrentsiretolist/'+reganimal.RegnoID,
      data : scurrent
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddPreviousSireToList = function(sprevious,reganimal){
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/someoneaddprevioussiretolist/'+reganimal.RegnoID,
      data : sprevious
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddDeceasedSireToList = function(sdeceased,reganimal){
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/someoneadddeceasedsiretolist/'+reganimal.RegnoID,
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
      url : '/someoneaddcurrentsiretobreeding/'+reganimal.RegnoID,
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
      url : '/someoneremovesirefrombreedinglist/'+reganimal.RegnoID,
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
      method : 'GET',
      url : '/currentdatadam',
    }).then(function success(response){
      $scope.cds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.previousDamClick = function () {
    $http({
      method : 'GET',
      url : '/previousdatadam',
    }).then(function success(response){
      $scope.pds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.deceasedDamClick = function () {
    $http({
      method : 'GET',
      url : '/deceaseddatadam',
    }).then(function success(response){
      $scope.dds = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.addRegNoDam = function(reganimal){
    $http({
      method : 'POST',
      url : '/addregnodam',
      data : reganimal
    }).then(function success(response){
      $scope.ssrs = response.data;
      $scope.reganimal.txtreg = "";
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AlertBox = function(reganimal){
    $http({
      method : 'POST',
      url : '/alertboxfordam',
      data : reganimal
    }).then(function success(response){
      $scope.counter = response.data.count[0].Cnt;
      // console.log($scope.count)
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
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddCurrentDamToList = function(cd,reganimal){
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/addcurrentdamtolist/'+reganimal.RegnoID,
      data : cd
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddPreviousDamToList = function(pd,reganimal){
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/addpreviousdamtolist/'+reganimal.RegnoID,
      data : pd
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.AddDeceasedDamToList = function(dd,reganimal){
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/adddeceaseddamtolist/'+reganimal.RegnoID,
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
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/someoneaddcurrentdamtolist/'+reganimal.RegnoID,
      data : dcurrent
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddPreviousSireToList = function(dprevious,reganimal){
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/someoneaddpreviousdamtolist/'+reganimal.RegnoID,
      data : dprevious
    }).then(function success(response){ 
      $scope.ssrs = response.data;
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
  }
  $scope.SomeoneAddDeceasedSireToList = function(ddeceased,reganimal){
    // console.log(reganimal.RegnoID)
    $http({
      method : 'POST',
      url : '/someoneadddeceaseddamtolist/'+reganimal.RegnoID,
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
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
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
  $scope.InfoData = function(events){
    $http({
      method : 'POST',
      url : '/eventinformation',
      data : events
    }).then(function success(response){
      $scope.html = $sce.trustAsHtml(response.data.data[0].Description);
      $scope.eventinfo = response.data.data;
        // console.log($scope.eventinfo);
        $scope.eventtable = response.data.table;
        // console.log($scope.eventtable);
      },function error(response){
        // alert('Error occured. Please try again later!');
      })
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
  //-------------------------------------------------------------------Online Store------------------------------------------
  app.controller('OnlineStoreController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder){
    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('paging', true)
    .withOption('searching', true)
    .withOption('info', true)
    $scope.OnlineStore = function(){
      $http({
        method : 'GET',
        url : '/onlinestoredata',
      }).then(function success(response){
        $scope.items = response.data;
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
    $scope.ShowCartTable = function(){
      $http({
        method : 'GET',
        url : '/showcartproducts',
      }).then(function success(response){
        $scope.products = response.data;
      // console.log($scope.products)
    },function error(response){
      // alert('Error occured. Please try again later!');
    })
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
    $scope.AddToCart = function(item){
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
      },function error(response){
      // alert('Error occured. Please try again later!');
    })
    }
  });
  //-------------------------------------------------------------------Contact Us------------------------------------------
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