// Global variables
var map, infowindow, vm, mapStyle;
var icon = {
	url: "../images/alien-markers/a1s.png",
	scaledSize: new google.maps.Size(67, 67),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(0, 0)
};
var icon2 = {
	url: "../images/alien-markers/a2s.png",
	scaledSize: new google.maps.Size(67, 67),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(0, 0)
};

var mapInit = function() {

	// Check if Google Map has loaded
	if (typeof(google) === 'undefined' ||
		typeof(google.maps) === 'undefined' ||
		typeof(google.maps.Map) === 'undefined') {
		vm.gmErr(true);
	} else {
		vm.gmErr(false);
	}

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
};

var appInit = function() {
	// Create view model object and apply bindings
	vm = new ViewModel();
	ko.applyBindings(vm);
};