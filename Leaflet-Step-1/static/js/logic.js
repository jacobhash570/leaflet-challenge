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

    // Styling for circles
    function mapStyle(feature) {
        return {
          opacity: 2,
          fillOpacity: 2,
          fillColor: mapColor(feature.properties.mag),
          radius: mapRadius(feature.properties.mag),
          weight: .75
        };
      }

      // Stying for circles based on magnitude
      function mapColor(mag) {
        switch (true) {
          case mag > 5:
            return "#ea2c2c";
          case mag > 4:
            return "#eaa92c";
          case mag > 3:
            return "#d5ea2c";
          case mag > 2:
            return "#92ea2c";
          case mag > 1:
            return "#2ceabf";
          default:
            return "#2c99ea";
        }
      }
      
      // Stying for circle radius
      function mapRadius(mag) {
        if (mag === 0) {
          return 1;
        }
    
        return mag * 5;
      }
    
    // Add to map
    L.geoJson(data, {

        pointToLayer: function(feature, lat_lng) {
            return L.circleMarker(lat_lng);
        },
      
        style: mapStyle,
  
        onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  
      }
    }).addTo(myMap);

    // Legend 
    var legend = L.control({
        position: "bottomright"
      });
    
      legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
    
        var grades = [0, 1, 2, 3, 4, 5];
        var colors = ["#2c99ea", "#2ceabf", "#92ea2c", "#d5ea2c","#eaa92c", "#ea2c2c"];
    
    
        // Loop for colors
        for (var i = 0; i<grades.length; i++) {
          div.innerHTML +=
          "<i style='background: " + colors[i] + "'></i> " +
          grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
    
      };
    
      legend.addTo(myMap)

})