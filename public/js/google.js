function onSignIn(response) {
    // Conseguindo as Eventormações do seu usuário:
    var perfil = response.getBasicProfile();

    // Conseguindo o ID do Usuário
    var userID = perfil.getId();

    // Conseguindo o Nome do Usuário
    var userName = perfil.getName();

    // Conseguindo o E-mail do Usuário
    var userEmail = perfil.getEmail();

    // Conseguindo a URL da Foto do Perfil
    var userPicture = perfil.getImageUrl();

    // Recebendo o TOKEN que você usará nas demais requisições à API:
    var LoR = response.getAuthResponse().id_token;
    entrar(userName, userEmail, userPicture);
};



var clicarEndereco = (endereco) => {
  let enderecoSimplificado = {
      latitude:  $(endereco).children(".coordenadas").html().split(':')[0],
      longitude:  $(endereco).children(".coordenadas").html().split(':')[1],
      nome: $(endereco).children(".nome").html()
  }
  $("#longitude").val(enderecoSimplificado.longitude);
  $("#latitude").val(enderecoSimplificado.latitude);
  $("#endereco").val(enderecoSimplificado.nome);
  $("#modal-endereco").toggle();
}

var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: new google.maps.LatLng(-23.944841,-46.330376 ),
          mapTypeId: 'roadmap'
        });
               
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            let posicaoAtual = new google.maps.Marker({
              position: pos,
              icon: '/img/pontoAtual.png',
              map: map
            }); 
            infoWindow = new google.maps.InfoWindow(), posicaoAtual;
            infoWindow.setContent('Sua Posição!!');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            //handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }     
        //procurarPontoPeloNome('');
      }
var procurarEndereco = (nome) =>{
  document.getElementById("lista").innerHTML = "";
  const autocompleteService = new google.maps.places.AutocompleteService()

  const autocompleteRequest = {
      input: "Brasil "+nome,
  }

  autocompleteService.getPlacePredictions(autocompleteRequest, (results, status) => {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
      
      results.forEach((item) => {
          //console.log(item)
          var request = {
              placeId: item.place_id,
              fields: ['name','address_component']
            };
            
            service = new google.maps.places.PlacesService(map);
            service.getDetails(request, callback);
            
            function callback(place, status) {
              //console.log(place.geometry);
              try{
                let nomeEndereco = `${place.address_components[0].long_name},${place.address_components[2].short_name}`;
                console.log(nomeEndereco);
                let node = document.createElement("li");
                node.classList.add("endereco-local");
                node.value = nomeEndereco;
                node.innerText = nomeEndereco;
                
                document.getElementById("lista").appendChild(node);
                node.addEventListener("click", input=>{
                  document.getElementById("localizacao_explore").value = input.target.innerText;
                })
                //$("#localizacoes").html($("#enderecos").html() + `<div class="endereco-localizado"><p class="nome">"${place.formatted_address}"<p><p class="coordenadas">${place.geometry.location.lat()}:${place.geometry.location.lng()}</p></div>`)
              }
              catch(ex){
                //console.log(ex);
              }
            }
          
      })
      
        
        
  }
  })
}

