// Inititalize Map
var myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
      
    });

//Define and Add
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 10,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

streetmap.addTo(myMap);

//GeoJSON URL
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(queryUrl, function(data) {
    
    L.geoJson(data, {
  
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<br>Location: " + feature.properties.place);
  
      }
}).addTo(myMap);

})