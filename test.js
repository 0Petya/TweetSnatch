// This example adds a user-editable rectangle to the map.

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(44.5452, -78.5389),
    zoom: 9
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(44.490, -78.649),
      new google.maps.LatLng(44.599, -78.443)
  );

  // Define a rectangle and set its editable property to true.
  var rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: true
  });

  rectangle.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);