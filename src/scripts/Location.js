var Location = function(name, lat, lng, pid) {
	var self = this;
	self.name = name;
	self.lat = lat;
	self.lng = lng;
	self.pid = pid;
	self.visible = true;
	self.events = [];
	self.cover;
	self.active = false;

	// Create marker
	self.marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat,lng),
		map: map,
		title: name,
		icon: gmMarkerIcon
	});

	google.maps.event.addListener(self.marker, 'click', function() {
		self.revertStates();

		// Update vm state if active and change color of marker
		if (self.active) {
			self.updateMarkerToActive();
			if (!uit.infoShow) uit.arrow.click();
			if (uit.listShow) uit.listTgl.click();
			self.offCenterMap();
		} else {
			// Recenter map if not active & close info window
			if (uit.infoShow) uit.arrow.click();
			map.setCenter(self.marker.getPosition());
		}

	}.bind(self));

	// Center map on location marker when map isn't full screen
	self.offCenterMap = function() {
		var ne = map.getBounds().getNorthEast();
		var sw = map.getBounds().getSouthWest();
		var mapRange = ne.lng() - sw.lng();
		var infoWidth = uit.info.offsetWidth;
		var screenWidth = window.innerWidth;
		var infoLng = (mapRange * infoWidth)/screenWidth;
		var absLng = (mapRange - infoLng)/2;
		var markerPos = self.marker.getPosition();
		var newLng = markerPos.lng() - mapRange/2 + absLng;
		map.setCenter(new google.maps.LatLng(markerPos.lat(), newLng));
	};

	// Revert all other location markers to default animation state
	self.revertStates = function() {
		// Save previous active state
		var previous = self.active;

		// Revert all markers & events to default state
		for (var i = 0; i < vm.locations.length; i++) {
			vm.locations[i].active = false;
			vm.locations[i].marker.setIcon(gmMarkerIcon);
			for (var j = 0; j < vm.locations[i].events.length; j++) {
				vm.locations[i].events[j].show = false;
				vm.locations[i].events[j].started = false;
			}
		}

		// Change active state
		self.active = !previous;
	};

	self.updateMarkerToActive = function() {
		self.marker.setIcon(gmMarkerIcon2);
		vm.activeLocationMarker(self.marker);
		vm.activeLocationName(self.name);
		vm.activeLocationCover(self.cover);
		vm.activeLocationEvents(self.events);
	};
};