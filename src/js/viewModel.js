var ViewModel = function() {
	var self = this;
	self.loggedIn = ko.observable(false);
	self.locations = ko.observableArray();
	self.neighborhood = ko.observable();
	self.showList = ko.observable(false);
	self.showInfo = ko.observable(false);
	self.anyMarkerHasBeenClicked = ko.observable(false);
	self.activeLocationName = ko.observable();
	self.activeLocationCover = ko.observable();
	self.activeLocationEvents = ko.observableArray();
	self.fbErr = ko.observable(false);
	self.gmErr = ko.observable(false);

	// Load JSON location data
	self.loadData = function(data) {
		self.neighborhood(data.neighborhood);

		// Clear locations array so that it isn't populated twice
		self.locations.removeAll();

		// Load JSON data into locations array
		for (var i = 0, len = data.locations.length; i < len; i++) {
			self.locations.push(new Location(
				data.locations[i].name,
				data.locations[i].lat,
				data.locations[i].lng,
				data.locations[i].pid
			));
		}

		var timeStamp = Math.floor(Date.now() / 1000);

		for (var i = 0, len = self.locations().length; i < len; i++) {

			// Get cover photo for each location
			(function(index) {
				window.getCoverPhoto(self.locations()[index].pid(), function(response) {
					self.locations()[index].cover(response);
				}, this);
			})(i);

			// Get events list for each location
			(function(index) {
				window.getEvents(self.locations()[index].pid(), timeStamp, function(response) {
					self.locations()[index].events(response.data);
					// Attach event cover photos to events
					for (var j = 0, len = self.locations()[index].events().length; j < len; j++) {
						(function(jindex) {
							window.getCoverPhoto(self.locations()[index].events()[jindex].id, function(coverURL) {
								self.locations()[index].events()[jindex].cover = coverURL;
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
		for (var i = 0, len = self.locations().length; i < len; i++) {
			if (pattern.test(self.locations()[i].name().toLowerCase())) {
				self.locations()[i].marker.setVisible(true);
				self.locations()[i].visible(true);
			} else {
				self.locations()[i].marker.setVisible(false);
				self.locations()[i].visible(false);
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