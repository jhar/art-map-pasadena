// Global variables
var map, infowindow, vm, mapStyle;
var redPin = "http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png";
var greenPin = "http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png";

function site(name, lat, lng, pid) {
	this.name = ko.observable(name);
	this.lat = ko.observable(lat);
	this.lng = ko.observable(lng);
	this.pid = ko.observable(pid);
	this.visible = ko.observable(true);
	this.events = ko.observableArray();
	this.cover = ko.observable();

	// Create marker
	this.marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat,lng),
		map: map,
		title: name,
		animation: google.maps.Animation.DROP,
		icon: redPin
	});

	// Animate marker when clicked and change color
	google.maps.event.addListener(this.marker, 'click', function () {
		if (this.marker.getAnimation() != null) {
			this.marker.setAnimation(null);
		} else {
			// Revert all markers to default state (redPin, no animation)
			for (var i in vm.sites()) {
				vm.sites()[i].marker.setAnimation(null);
				vm.sites()[i].marker.setIcon(redPin);
			}
			this.marker.setAnimation(google.maps.Animation.BOUNCE);
			console.log(greenPin);
			this.marker.setIcon(greenPin);
		}
	}.bind(this));

	// Add infowindow to marker when clicked
	google.maps.event.addListener(this.marker, 'click', function openWindow() {

		vm.anyMarkerHasBeenClicked(true);

		// Change marker color

		// Call view model's functions to set active site
		vm.activeSiteCover(this.cover());
		vm.activeSiteEvents(this.events());

		// Recenter map to clicked marker
		map.setCenter(this.marker.getPosition());

		// Set the content of the infowindow
		infowindow.setContent('<div class="info-window">' +
							  '<h5 class="info-name">' +
							  		name +
							  	'</h5>' +
							  '</div>');

		// Open the infowindow
		infowindow.open(map,this.marker);

	}.bind(this));
}

function ViewModel() {
	var self = this;
	self.loggedIn = ko.observable(false);
	self.sites = ko.observableArray();
	self.neighborhood = ko.observable();
	self.showList = ko.observable(true);
	self.anyMarkerHasBeenClicked = ko.observable(false);
	self.activeSiteCover = ko.observable('pasadena_cover.jpg');
	self.activeSiteEvents = ko.observableArray();
	self.fbErr = ko.observable(false);
	self.gmErr = ko.observable(false);

	// Load JSON location data
	self.loadData = function() {
		$.getJSON("../pasadena.json", function(data) {
			self.neighborhood(data.neighborhood);

			// Clear entities array so that it isn't populated twice
			self.sites.removeAll();

			// Load JSON data into sites array
			for (i = 0; i < data.locations.length; i++) {
				self.sites.push(new site(
					data.locations[i].name,
					data.locations[i].lat,
					data.locations[i].lng,
					data.locations[i].pid
				));
			}

			var timeStamp = Math.floor(Date.now() / 1000);

			for (var i in self.sites()) {

				// Get cover photo for each site
				(function(index) {
					window.getCoverPhoto(self.sites()[index].pid(), function(response) {
						self.sites()[index].cover(response);
					}, this);
				})(i);

				// Get events list for each site
				(function(index) {
					window.getEvents(self.sites()[index].pid(), timeStamp, function(response) {
						self.sites()[index].events(response.data);
						// Attach event cover photos to events
						for (var j in self.sites()[index].events()) {
							(function(jindex) {
								window.getCoverPhoto(self.sites()[index].events()[jindex].id, function(coverURL) {
									self.sites()[index].events()[jindex].cover = coverURL;
								}, this);
							})(j);
						}
					}, this);
				})(i);
			}
		});
	}

	// Clicks markers when list item is clicked
	self.clickedListItem = function() {
		google.maps.event.trigger(this.marker, 'click');
	}

	// Begins Facebook login process
	self.login = function() {
		window.loginFlow();
	}

	// Begins Facebook logout process
	self.logout = function() {
		window.logoutFlow();
	}

	// Live search function
	self.liveSearch = function(model, obj) {
		var pattern = new RegExp(obj.currentTarget.value.toLowerCase());
		for (i = 0; i < self.sites().length; i++) {
			if (pattern.test(self.sites()[i].name().toLowerCase())) {
				self.sites()[i].marker.setVisible(true);
				self.sites()[i].visible(true);
			} else {
				self.sites()[i].marker.setVisible(false);
				self.sites()[i].visible(false);
			}
		}
	}

}

// Here's a custom Knockout binding that makes elements shown/hidden via jQuery's fadeIn()/fadeOut() methods
// Found at: http://knockoutjs.com/examples/animatedTransitions.html
ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function(element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
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









