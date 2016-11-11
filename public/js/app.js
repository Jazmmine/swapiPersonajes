var template = '<option class= "opciones" value="{{val}}">{{name}}</option>';

var respuesta =null;
var selectEspecies = function(response){
 //console.log(response);
 	$("#total").text(response.count);
   var especies = "";
  respuesta = response;
   $.each(response.results, function(i,especie){
      var valor = "";
    // console.log(especie);
          $.each(especie.people, function(j,url){
           // console.log(url);
             valor = valor + url.substring(27, 29) + ",";
                //console.log(valor);  
          });
     especies += template
          .replace("{{name}}", especie.name)
          .replace("{{val}}",valor);    

   });
   $("#species").append(especies);
 };

  $(document).ready(function() {
   // $('select').material_select();
    $.getJSON("http://swapi.co/api/species/",selectEspecies);
    $(".personajes").hide();
        var templateChange  = '<li class="items">"{{url}}"</li>'

    $("#species").change(function(){
        var idPersonaje = $(this).val().split(",");
        var urlHeader = "http://swapi.co/api/people/"; 
        var personajes = "";      
     //   console.log(idPersonaje);
        $.each(idPersonaje,function(i,personaje){
          var url = "";
         // console.log(personaje);
          if(personaje != ""){
            url =  urlHeader + personaje + "/";
         //   console.log(url);
          personajes += templateChange.replace("{{url}}", url);
          console.log(personajes);
          }
        });
          $(".personajes").show();
          $("#lista").html(personajes);
    });
  });
