// Global variables
var map, mapStyle, gmMarkerIcon, gmMarkerIcon2, gmReset;

var mapInit = function() {

	// Pre-load map markers
	gmMarkerIcon = {
		url: "../images/alien-markers/a1s.png",
		scaledSize: new google.maps.Size(67, 67),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(0, 0)
	};
	gmMarkerIcon2 = {
		url: "../images/alien-markers/a2s.png",
		scaledSize: new google.maps.Size(67, 67),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(0, 0)
	};

	// Create Google Map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 34.151389, lng: -118.150281},
		mapTypeControl: false,
		zoom: 14
	});

	// Style the map
	mapStyle = [
	  {
	    "featureType": "poi",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  }
	];

	map.setOptions({styles: mapStyle});

	gmReset = function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center); 
	};
	
	google.maps.event.addDomListener(window, "resize", gmReset);
};

