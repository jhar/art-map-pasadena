// Google Map functionality
var mapOptions = {
  center: { lat: 34.150596, lng: -118.137817},
  zoom: 14
};
var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
var infowindow = new google.maps.InfoWindow({
			content: "holding..."
		});


function ViewModel() {
	var self = this;
	self.neighborhood = ko.observable();
	self.markers = ko.observableArray();

	$.getJSON("../pasadena.json", function(data) {
		self.neighborhood(data.neighborhood);

		// Load model location data into markers array
		for (i = 0; i < data.locations.length; i++) {
			self.markers.push(
				new google.maps.Marker({
					position: new google.maps.LatLng(data.locations[i].lat,data.locations[i].lng),
					map: map,
					title: data.locations[i].name,
				})
			);
		}

		// Add infoWindows to markers
		for (i = 0; i < self.markers().length; i++) {
			var marker = self.markers()[i];
			google.maps.event.addListener(marker, 'click', self.openWindow);
			/*
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(this.title);
				infowindow.open(map, this);
			})
			*/
		}
	});

	self.openWindow = function() {
		infowindow.setContent(this.title);
		infowindow.open(map,this);
	}

	self.clickedListItem = function(marker) {
		console.log(marker.title + " " + marker.position);
		self.openWindow.call(marker);
	}
}

var vm = new ViewModel();
ko.applyBindings(vm);


