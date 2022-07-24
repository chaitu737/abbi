$(document).ready(function(){ 
     $('#check-address').click(function(){ 
     if ($('#check-address').is(":checked")) {
      $('#txtaddress1').val($('#txtaddress').val());
      $('#txtstate1').val($('#txtstate').val());
      $('#txtcity1').val($('#txtcity').val());
       $('#zip1').val($('#zip').val());
      var country = $('#country option:selected').val();
      $('#country1 option[value=' + country + ']').attr('selected','selected');   
      $('#country1 option[value=""]').attr('selected','selected');
     };
    });
     $("#paymentinfo").change(function () {
     if ($(this).val() == "e-check") {
        $("#echeck").show();
        $("#visa").hide();
        $("#mastercard").hide();
        $("#americanexpress").hide();
        $("#discovery").hide();
   
     } 
     else if($(this).val() == "visa") {
        $("#visa").show();
        $("#echeck").hide();
        $("#mastercard").hide();
        $("#americanexpress").hide();
        $("#discovery").hide();
     }
     else if ($(this).val() == "master-card") {
        $("#mastercard").show();

        $("#echeck").hide();
        $("#visa").hide();
        $("#americanexpress").hide();
        $("#discovery").hide();
     } 
     else if ($(this).val() == "american-express") {
        $("#americanexpress").show();
        $("#echeck").hide();
        $("#visa").hide();
        $("#mastercard").hide();
        $("#discovery").hide();
     } 
     else if ($(this).val() == "discover") {
        $("#discovery").show();
        $("#echeck").hide();
        $("#visa").hide();
        $("#mastercard").hide();
        $("#americanexpress").hide();
       
     } 
     else{
        $("#echeck").hide();
        $("#visa").hide();
        $("#mastercard").hide();
        $("#americanexpress").hide();
        $("#discovery").hide();
     }
     });
     
 });