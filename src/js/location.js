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
			if (vm.showInfo()) {
				var ne = map.getBounds().getNorthEast();
				var sw = map.getBounds().getSouthWest();
				var mapRange = ne.lng() - sw.lng();
				var infoWidth = document.getElementsByClassName("info-view")[0].offsetWidth;
				var screenWidth = window.innerWidth;
				var infoLng = (mapRange * infoWidth)/screenWidth;
				var markerPos = this.marker.getPosition();
				var absLng = (mapRange - infoLng)/2;
				var newLng = markerPos.lng() - mapRange/2 + absLng;
				map.setCenter(new google.maps.LatLng(markerPos.lat(), newLng));
			} else {
				map.setCenter(this.marker.getPosition());
			}

		}

	}.bind(this));
};