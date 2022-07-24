$(document).ready(function(){
$("#ACEvalue").text(0);
$("#ACETvalue").text(0);
$("#AECvalue").text(0);
$("#THUBvalue").text(0);
$("#BMvalue").text(0);
$("#POLYvalue").text(0);
$("#PHARMAvalue").text(0);
setInterval(function(){ 

$.post("/currentcount").done(function(data, textStatus, jqXHR){
	if(data.success){
		
		
$("#ACEvalue").text(data.acecount);
$("#ACETvalue").text(data.acetcount);
$("#AECvalue").text(data.aeccount);
$("#THUBvalue").text(data.thubcount);
$("#BMvalue").text(data.bmcount);
$("#POLYvalue").text(data.polycount);
$("#PHARMAvalue").text(data.pharmacount);

	}
});

},2000);
});