// Get DOM triggers - Knockout can't bind to GM markers directly
var infoTrigger = document.getElementsByClassName('arrow')[0];
var listTrigger = document.getElementsByClassName('list-toggle')[0];

var Location = function(name, lat, lng, pid) {
	this.name = name;
	this.lat = lat;
	this.lng = lng;
	this.pid = pid;
	this.visible = true;
	this.events = [];
	this.cover;
	this.active = false;

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
		var previous = this.active;

		// Revert all markers to default state
		for (var i = 0; i < vm.locations.length; i++) {
			vm.locations[i].active = false;
			vm.locations[i].marker.setIcon(gmMarkerIcon);
			for (var j = 0; j < vm.locations[i].events.length; j++) {
				vm.locations[i].events[j].animation().show(false);
				vm.locations[i].events[j].animation().started(false);
			}
		}

		// Change active state
		this.active = !previous;

		// Update vm state if active and change color of marker
		if (this.active) {
			this.marker.setIcon(gmMarkerIcon2);
			vm.activeLocationMarker(this.marker);
			vm.activeLocationName(this.name);
			vm.activeLocationCover(this.cover);
			vm.activeLocationEvents(this.events);

			// Open info view if closed
			if (!vm.info().show()) infoTrigger.click();

			// Close list view if opened
			if (vm.list().show()) listTrigger.click();

			// Center map in remainder of screen
			var ne = map.getBounds().getNorthEast();
			var sw = map.getBounds().getSouthWest();
			var mapRange = ne.lng() - sw.lng();
			var infoWidth = document.getElementsByClassName("info-view")[0].offsetWidth;
			var screenWidth = window.innerWidth;
			var infoLng = (mapRange * infoWidth)/screenWidth;
			var absLng = (mapRange - infoLng)/2;
			var markerPos = this.marker.getPosition();
			var newLng = markerPos.lng() - mapRange/2 + absLng;
			map.setCenter(new google.maps.LatLng(markerPos.lat(), newLng));

		} else {
			// Reset active info & recenter map
			if (vm.info().show()) infoTrigger.click();
			map.setCenter(this.marker.getPosition());
		}

	}.bind(this));
};