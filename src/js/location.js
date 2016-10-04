var Location = function(name, lat, lng, pid) {
	this.name = ko.observable(name);
	this.lat = ko.observable(lat);
	this.lng = ko.observable(lng);
	this.pid = ko.observable(pid);
	this.visible = ko.observable(true);
	this.events = ko.observableArray();
	this.cover = ko.observable();
	this.active = ko.observable(false);

	// Create marker
	this.marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat,lng),
		map: map,
		title: name,
		icon: gmMarkerIcon
	});

	// Everything that happens when a marker is clicked
	google.maps.event.addListener(this.marker, 'click', function() {

		// Save previous active state
		var previous = this.active();

		// Revert all markers to default state
		vm.anyMarkerHasBeenClicked(false);
		for (var i = 0, len = vm.locations().length; i < len; i++) {
			vm.locations()[i].active(false);
			vm.locations()[i].marker.setIcon(gmMarkerIcon);
		}

		// Change active state
		this.active(!previous);

		// Update vm state if active and change color of marker
		if (this.active()) {
			vm.anyMarkerHasBeenClicked(true);
			this.marker.setIcon(gmMarkerIcon2);
			vm.activeLocationName(this.name());
			vm.activeLocationCover(this.cover());
			vm.activeLocationEvents(this.events());
			map.setCenter(this.marker.getPosition());
		}

	}.bind(this));
};