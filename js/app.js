var map = new google.maps.Map(document.getElementById('map-canvas'), {
	center: {lat: 34.150596, lng: -118.137817},
	zoom: 14
	});

var infowindow = new google.maps.InfoWindow({
	content: "holding..."
});

function ViewModel() {
	var self = this;
	self.neighborhood = ko.observable();
	self.markers = ko.observableArray();
	self.fullName = ko.observable();


	$.getJSON("../pasadena.json", function(data) {
		self.neighborhood(data.neighborhood);

		// Load model location data into markers array
		for (i = 0; i < data.locations.length; i++) {
			var marker = new google.maps.Marker({
					position: new google.maps.LatLng(data.locations[i].lat,data.locations[i].lng),
					map: map,
					title: data.locations[i].name,
				});
			google.maps.event.addListener(marker, 'click', self.openWindow);
			self.markers.push(marker);
		}
	});

	self.openWindow = function() {
		var template = '<div>' +
						this.title +
						'</div>';
		infowindow.setContent(template);
		infowindow.open(map,this);
	}

	self.clickedListItem = function(marker) {
		console.log(marker.title + " " + marker.position);
		self.openWindow.call(marker);
	}

	self.Login = function() {
		window.Login();
	}

}

var vm = new ViewModel();
ko.applyBindings(vm);


