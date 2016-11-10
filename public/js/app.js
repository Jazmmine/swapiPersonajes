 var template = '<option class= "opciones" value="{{val}}">{{name}}</option>';

 var selectEspecies = function(response){
 	console.log(response);
 	$("#total").text(response.count);
 };

  $(document).ready(function() {
  //  $('select').material_select();
    $.getJSON("http://swapi.co/api/species/",selectEspecies);


/*    $("#species").change(function(){

    });*/
  });
