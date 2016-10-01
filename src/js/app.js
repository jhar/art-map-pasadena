// Global variables
var map, infowindow, vm, mapStyle;

function site(name, lat, lng, pid, icon, icon2) {
	this.name = ko.observable(name);
	this.lat = ko.observable(lat);
	this.lng = ko.observable(lng);
	this.pid = ko.observable(pid);
	this.visible = ko.observable(true);
	this.events = ko.observableArray();
	this.cover = ko.observable();
	this.active = ko.observable(false);
	this.icon = ko.observable(icon);
	this.icon2 = ko.observable(icon2);

	// Create marker
	this.marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat,lng),
		map: map,
		title: name,
		icon: icon
	});

	// Everything that happens when a marker is clicked
	google.maps.event.addListener(this.marker, 'click', function openWindow() {

		// Save previous active state
		var previous = this.active();

		// Revert all markers to default state
		vm.anyMarkerHasBeenClicked(false);
		for (var i = 0, len = vm.sites().length; i < len; i++) {
			vm.sites()[i].active(false);
			vm.sites()[i].marker.setIcon(vm.sites()[i].icon());
		}

		// Change active state
		this.active(!previous);

		// Update vm state if active and change color of marker
		if (this.active()) {
			vm.anyMarkerHasBeenClicked(true);
			this.marker.setIcon(this.icon2());
			vm.activeSiteName(this.name());
			vm.activeSiteCover(this.cover());
			vm.activeSiteEvents(this.events());
			map.setCenter(this.marker.getPosition());
		}

	}.bind(this));
}

function ViewModel() {
	var self = this;
	self.loggedIn = ko.observable(false);
	self.sites = ko.observableArray();
	self.neighborhood = ko.observable();
	self.showList = ko.observable(false);
	self.showInfo = ko.observable(false);
	self.anyMarkerHasBeenClicked = ko.observable(false);
	self.activeSiteName = ko.observable();
	self.activeSiteCover = ko.observable();
	self.activeSiteEvents = ko.observableArray();
	self.fbErr = ko.observable(false);
	self.gmErr = ko.observable(false);

	// Load JSON location data
	self.loadData = function(data) {
		self.neighborhood(data.neighborhood);

		// Clear sites array so that it isn't populated twice
		self.sites.removeAll();

		// Load JSON data into sites array
		for (var i = 0, len = data.locations.length; i < len; i++) {
			self.sites.push(new site(
				data.locations[i].name,
				data.locations[i].lat,
				data.locations[i].lng,
				data.locations[i].pid
			));
		}

		var timeStamp = Math.floor(Date.now() / 1000);

		for (var i = 0, len = self.sites().length; i < len; i++) {

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
					for (var j = 0, len = self.sites()[index].events().length; j < len; j++) {
						(function(jindex) {
							window.getCoverPhoto(self.sites()[index].events()[jindex].id, function(coverURL) {
								self.sites()[index].events()[jindex].cover = coverURL;
							}, this);
						})(j);
					}
				}, this);
			})(i);
		}
	};

	// Clicks markers when list item is clicked
	self.clickedListItem = function() {
		google.maps.event.trigger(this.marker, 'click');
		self.toggleList();
	};

	// Begins Facebook login process
	self.login = function() {
		window.loginFlow();
	};

	// Begins Facebook logout process
	self.logout = function() {
		window.logoutFlow();
	};

	// Live search function
	self.liveSearch = function(model, obj) {
		var pattern = new RegExp(obj.currentTarget.value.toLowerCase());
		for (var i = 0, len = self.sites().length; i < len; i++) {
			if (pattern.test(self.sites()[i].name().toLowerCase())) {
				self.sites()[i].marker.setVisible(true);
				self.sites()[i].visible(true);
			} else {
				self.sites()[i].marker.setVisible(false);
				self.sites()[i].visible(false);
			}
		}
	};

	// Toggle list view
	self.toggleList = function() {
		self.showList(!self.showList());
	};

	// Toggle info view
	self.toggleInfo = function() {
		self.showInfo(!self.showInfo());
	}

}

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
		zoom: 13
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
};

var appInit = function() {
	// Create view model object and apply bindings
	vm = new ViewModel();
	ko.applyBindings(vm);
};