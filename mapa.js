
// Creamos el mapa y lo centramos... 
let map = L.map('map').setView([23.466302332191862, -102.1152141635831],5) //nos permite ver el mapa

// Seleccionamos el mapa base...
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' //mapa  url extraida
}). addTo(map);

var drawPluginOptions = {
    position: 'topright',
    draw: {
      polyline: false,
      polygon: false,
      circle: false, // Turns off this drawing tool
      rectangle: {
        shapeOptions: {
          clickable: false
        }
      },
      marker: false,
      circlemarker: false
    },
    edit: false
  };
    
  // Initialise the draw control and pass it the FeatureGroup of editable layers
  var drawControl = new L.Control.Draw(drawPluginOptions);
  map.addControl(drawControl);

  var editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);

$("#boton").click(function(){ $.ajax({url: "http://localhost//0.1.php", success: function(result ){ console.log(result);  var bicitura = L.geoJson.ajax("newfile.txt", {style: function(feature){return{color: "#FF0000", weight: 5.0, opacity: 1.0};}}).addTo(map);  }}); });


// Aqui faltaría validar que si ya hay un cuadro lo borre primero...


map.on('draw:created', function(e) { 
    editableLayers.addLayer(e.layer);    
    var Lat1 = e.layer.getBounds().getNorth();
    var Lat2 = e.layer.getBounds().getSouth();
    var Lon1 = e.layer.getBounds().getWest();
    var Lon2 = e.layer.getBounds().getEast();
    
//     if(drawPluginOptions= draw){
//    drawPluginOptions = false;
// }

    $.post("http://localhost//0.1.php",
        {"Lat1": Lat2, "Lat2": Lat1, "Lon1": Lon1, "Lon2": Lon2}).done(
            function(response){
                L.geoJson.ajax("newfile.txt", {style: function(feature){return{color: "#FF0000", weight: 5.0, opacity: 1.0};}}).addTo(map);
                console.log(response);
            }
        );
    
  });


