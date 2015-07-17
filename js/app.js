// Google Maps functionality
var map = new google.maps.Map(document.getElementById('map-canvas'), {
	center: {lat: 34.150596, lng: -118.137817},
	zoom: 14
	});

var infowindow = new google.maps.InfoWindow({
	content: "holding..."
});


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
			infowindow.setContent('<img src=\"' +
								  response +
								  '\">');
			infowindow.open(map,this.marker);
		}, this);
	}.bind(this));
}

function ViewModel() {
	var self = this;
	self.neighborhood = ko.observable();
	self.entities = ko.observableArray();
	self.fullName = ko.observable();

	// Load JSON location data
	self.loadData = function() {
		$.getJSON("../pasadena.json", function(data) {
			self.neighborhood(data.neighborhood);

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

	self.Login = function() {
		window.Login();
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

var vm = new ViewModel();
ko.applyBindings(vm);






