var ViewModel = function() {
	var self = this;

	// Facebook login
	self.authorized = ko.observable(false);
	self.loggedIn = ko.observable(false);

	// Data
	self.locations = ko.observableArray();
	self.activeLocationMarker = ko.observable();
	self.activeLocationName = ko.observable();
	self.activeLocationCover = ko.observable({
		source: '',
		offset_x: '',
		offset_y: ''
	});
	self.activeLocationEvents = ko.observableArray().extend({ rateLimit: 100 });

	// UI state
	self.app = ko.observable(false);
	self.info = ko.observable({
		show: ko.observable(false),
		started: ko.observable(false)
	});
	self.list = ko.observable({
		show: ko.observable(false),
		started: ko.observable(false)
	});
	self.search = ko.observable({
		show: ko.observable(false),
		started: ko.observable(false)
	});

	// Errors
	self.fbErr = ko.observable(false);
	self.gmErr = ko.observable(false);

	// Check users login & authorization state
	self.checkIfLoggedIn = function() {
		FB.getLoginStatus(function(response) {
	    	if (response.status === 'connected') {
	      		// Already logged in and authenticated
	      		vm.loggedIn(true);
	      		vm.authorized(true);
		    } else if (response.status === 'not_authorized') {
		    	// Logged in but not authenticated
		      	vm.loggedIn(true);
		      	vm.authorized(false);
		    } else if (!response || response.error) {
		      	vm.fbErr(true);
		    } else {
		      	// Not logged in
		      	vm.loggedIn(false);
		    }
		});
	};

	// Clicks markers when list item is clicked
	self.clickedListItem = function() {
		google.maps.event.trigger(this.marker, 'click');
	};

	// Get cover photo
	self.getCoverPhoto = function(id, loc, event) {
	  	var query = "/" + id + "?fields=cover{source, offset_x, offset_y}";
	    FB.api(query, function (response) {
			if (response && !response.error) {
				if (event === undefined) { 
					self.locations()[loc].cover(response.cover);
				} else {
					self.locations()[loc].events()[event].cover = response.cover;
				}
			} else if (!response || response.error) {
				vm.fbErr(true);
			}
	    });
	};

	// Get events for a location
	self.getEvents = function(pid, timeStamp, callback, object) {
  		var query = "/" + pid + "/events?since=" + timeStamp;
  		FB.api(query, function (response) {
    		if (response && !response.error) {
      			/* handle the result */
     		 	callback.call(object, response);
    		} else if (!response || response.error) {
      			vm.fbErr(true);
    		}
  		});
	};

	// Reposition cover photos based on offset_y
	self.changeOffsetY = function(element, eventCover) {
		if (eventCover === true) {
			var fw = 826;
			var fh = 294;
		} else {
			var fw = 828;
			var fh = 315;
		}
		var nw = element.naturalWidth;
		var nh = element.naturalHeight;
		var ow = element.offsetWidth;
		var oy = element.dataset.offsety;
		var top = (oy * ow / 100) * ((nh / nw) - (fh / fw));
		element.style.top = -top + 'px';
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

	// Load JSON location data
	self.loadData = function(data) {

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
				self.getCoverPhoto(self.locations()[index].pid(), index);
			})(i);

			// Get events list for each location
			(function(index) {
				self.getEvents(self.locations()[index].pid(), timeStamp, function(response) {
					self.locations()[index].events(response.data);
					// Attach event cover photos and animation handlers to events
					for (var j = 0, len = self.locations()[index].events().length; j < len; j++) {
						(function(jindex) {
							self.locations()[index].events()[jindex].animation = ko.observable({
								show: ko.observable(false),
								started: ko.observable(false)
							});
							self.getCoverPhoto(self.locations()[index].events()[jindex].id, index, jindex);
						})(j);
					}
				}, this);
			})(i);
		}
	};

	// Begins Facebook login process
	self.login = function() {
		if (self.loggedIn() && self.authorized()) {
			self.app(true);
			self.loadData(pasadena);
			gmReset();
		} else {
			FB.login(function(response) {
		    	if (response.authResponse) {
		      		self.loggedIn(true);
		      		self.authorized(true);
		      		self.app(true);
					self.loadData(pasadena);
					gmReset();
		    	} else if (!response || response.error) {
		      		vm.fbErr(true);
		    	} else {
		      		self.loggedIn(false);
		    	}
		  	},{scope: 'email'});
		}
	};

	// Begins Facebook logout process
	self.logout = function() {
		FB.getLoginStatus(function(response) {
    		if (response.authResponse) {
      			FB.logout(function(response) {
        			self.loggedIn(false);
      			});
    		} else if (!response || response.error) {
      			vm.fbErr(true);
    		}
    		// Regardless of success of logout, user wants to return to title screen
    		self.app(false);
    		self.resetUI();
  		});
	};

	// Reset UI
	self.resetUI = function() {
		self.list().show(false);
		self.list().started(false);
		ko.utils.toggleDomNodeCssClass(self.list().target, self.list().open, false);
    	ko.utils.toggleDomNodeCssClass(self.list().target, self.list().close, false);

    	self.info().show(false);
		self.info().started(false);
		ko.utils.toggleDomNodeCssClass(self.info().target, self.info().open, false);
    	ko.utils.toggleDomNodeCssClass(self.info().target, self.info().close, false);

    	self.search().show(false);
		self.search().started(false);
		ko.utils.toggleDomNodeCssClass(self.search().target, self.search().open, false);
    	ko.utils.toggleDomNodeCssClass(self.search().target, self.search().close, false);
	};

};