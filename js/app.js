// Global variables
var map, infowindow, vm, mapStyle;

function entity(name, lat, lng, pid) {
	this.name = ko.observable(name);
	this.lat = ko.observable(lat);
	this.lng = ko.observable(lng);
	this.pid = ko.observable(pid);
	this.visible = ko.observable(true);

	// Create marker
	this.marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat,lng),
		map: map,
		title: name,
		animation: google.maps.Animation.DROP,
	});

	// Add infowindow to marker when clicked
	google.maps.event.addListener(this.marker, 'click', function openWindow() {
		window.getCoverPhoto(pid, function(response) {
			infowindow.setContent('<img class="cover-photo" src=\"' +
								  response +
								  '\">');
			infowindow.open(map,this.marker);
		}, this);
	}.bind(this));
}

function ViewModel(fbStatus) {
	var self = this;
	self.neighborhood = ko.observable();
	self.entities = ko.observableArray();
	self.loggedIn = ko.observable();

	// Load JSON location data
	self.loadData = function() {
		$.getJSON("../pasadena.json", function(data) {
			self.neighborhood(data.neighborhood);

			// Clear entities array so that it isn't populated twice
			self.entities.removeAll();

			// Load location data into entities array
			for (i = 0; i < data.locations.length; i++) {
				self.entities.push(new entity(
					data.locations[i].name,
					data.locations[i].lat,
					data.locations[i].lng,
					data.locations[i].pid
				));
			}
		});
	}

	self.clickedListItem = function() {
		google.maps.event.trigger(this.marker, 'click');
	}

	self.login = function() {
		console.log("Login function was called.");
		window.loginFlow();
	}

	self.logout = function() {
		console.log("Logout function was called.");
		window.logoutFlow();
	}

	self.liveSearch = function(model, obj) {
		var pattern = new RegExp(obj.currentTarget.value.toLowerCase());
		for (i = 0; i < self.entities().length; i++) {
			if (pattern.test(self.entities()[i].name().toLowerCase())) {
				self.entities()[i].marker.setVisible(true);
				self.entities()[i].visible(true);
			} else {
				self.entities()[i].marker.setVisible(false);
				self.entities()[i].visible(false);
			}
		}
	}
}

var mapInit = function() {
	// Create Google Map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 34.150596, lng: -118.137817},
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


	// Create infowindow to attach to markers
	infowindow = new google.maps.InfoWindow({
		content: "No content loaded"
	});
}

var appInit = function() {
	// Create view model object and apply bindings
	vm = new ViewModel();
	ko.applyBindings(vm);

	// Initialize material (should this go here?)
	$.material.init();
}









