var template = '<option class= "opciones" value="{{val}}">{{name}}</option>';
var templateChange  = '<div class="col s12" id="lista">' +
                      '<div class="card">' +
                        '<div class="card amber white-text waves-effect waves-block waves-light">' +
                          '<p class="center-align  items">Hola, mi personaje es : <strong>{{url}}</strong></p>' +
                        '</div>' +
                        '<div class="card-content">' +
                          '<a href= "#" data-show-url = "{{link}}" class="about card-title activator grey-text text-darken-4">Ver más sobre mí<i class="material-icons right">more_vert</i></a>' +
                        '</div>' +
                        '<div class="card-reveal">' +
                          '<span class="card-title grey-text text-darken-4 nombre">{{nombre-personaje}}<i class="material-icons right">close</i></span>' +
                          '<p>Here is some more information about this product that is only revealed once clicked on.</p>' +
                        '</div>' +
                      '</div>' +
                  '</div>';

var respuesta =null;
var caracteristicas = "";
var selectEspecies = function(response){
 //console.log(response);
  respuesta = response;
 	$("#total").text(response.results.length);
   var especies = "";
  
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
var caracteristicasResponse = function(response){
  console.log(response);
  caracteristicas += templateChange
        .replace("{{nombre-personaje}}",response.name);
   console.log(caracteristicas);
        $("#lista").html(caracteristicas);
};


  $(document).ready(function() {
   // $('select').material_select();
    
    $.getJSON("http://swapi.co/api/species/",selectEspecies);
    $(".personajes").hide();
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
            personajes += templateChange
                          .replace("{{url}}", url)
                          .replace("{{link}}", url);
          // console.log(personajes);
            }
          });
          $(".personajes").show();
          $("#lista").html(personajes);
      });     
	$(".personajes").on("click", ".about",function(e){
		e.preventDefault();    
		 var links = $(".about").attr("data-show-url");
     console.log(links);
     $.getJSON(links, caracteristicasResponse);

	});

   
  });
