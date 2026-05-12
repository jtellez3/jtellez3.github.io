/* Map and weather script for Soft Shore Suites
   This shows the Hawaii resort location and the current weather.
*/

// Coordinates for Four Seasons Resort Lanai, Hawaii
var lat = 20.74167;
var lon = -156.89630;

// Create the map
var map = L.map("map").setView([lat, lon], 12);

// Add map tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Add marker
var marker = L.marker([lat, lon]).addTo(map);

// First popup message
marker.bindPopup("<b>Soft Shore Suites</b><br>Loading weather...").openPopup();

// Weather Fetch for U.S. location
fetch("https://api.weather.gov/points/" + lat + "," + lon)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    return fetch(data.properties.forecast);
  })
  .then(function(res) {
    return res.json();
  })
  .then(function(weather) {
    var current = weather.properties.periods[0];

    marker.setPopupContent(
      "<b>Soft Shore Suites</b><br>" +
      "Lanai, Hawaii<br>" +
      current.temperature + "°F and " + current.shortForecast
    );
  })
  .catch(function(err) {
    marker.setPopupContent(
      "<b>Soft Shore Suites</b><br>" +
      "Lanai, Hawaii<br>" +
      "Weather unavailable"
    );
  });