function initMap() {
    // Localização do Edifício José Viana
    var location = { lat: -1.4557549, lng: -48.4901791 };

    // Criação do mapa
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location
    });

    // Adicionar um marcador
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
