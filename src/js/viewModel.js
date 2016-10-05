var ViewModel = function() {
	var self = this;

	self.activeLocationName = ko.observable();
	self.activeLocationCover = ko.observable();
	self.activeLocationEvents = ko.observableArray();
	self.anyMarkerHasBeenClicked = ko.observable(false);
	self.authorized = ko.observable(false);
	self.loggedIn = ko.observable(false);
	self.showInfo = ko.observable(false);
	self.fbErr = ko.observable(false);
	self.locations = ko.observableArray();
	self.neighborhood = ko.observable();
	self.showList = ko.observable();
	self.gmErr = ko.observable(false);
	self.wantsToSeeApp = ko.observable(false);

	self.infoView = document.getElementById("info-view");

	// Check users login & authorization state
	self.checkIfLoggedIn = function() {
		FB.getLoginStatus(function(response) {
	    	if (response.status === 'connected') {
	      		// the user is already logged in and has authenticated your app
	      		vm.loggedIn(true);
	      		vm.authorized(true);
		    } else if (response.status === 'not_authorized') {
		    	// the user is logged in to Facebook,
		      	// but has not authenticated your app
		      	vm.loggedIn(true);
		      	vm.authorized(false);
		    } else if (!response || response.error) {
		      	vm.fbErr(true);
		    } else {
		      	// the user isn't logged in to Facebook.
		      	vm.loggedIn(false);
		    }
		});
	};

	// Clicks markers when list item is clicked
	self.clickedListItem = function() {
		google.maps.event.trigger(this.marker, 'click');
		self.toggleList();
	};

	// Get cover photo
	self.getCoverPhoto = function(id, callback, object) {
	  var query = "/" + id + "?fields=cover{source}";
	    FB.api(query, function (response) {
	      if (response && !response.error) {
	        /* handle the result */
	        callback.call(object, response.cover.source);
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
				self.getCoverPhoto(self.locations()[index].pid(), function(response) {
					self.locations()[index].cover(response);
				}, this);
			})(i);

			// Get events list for each location
			(function(index) {
				self.getEvents(self.locations()[index].pid(), timeStamp, function(response) {
					self.locations()[index].events(response.data);
					// Attach event cover photos to events
					for (var j = 0, len = self.locations()[index].events().length; j < len; j++) {
						(function(jindex) {
							self.getCoverPhoto(self.locations()[index].events()[jindex].id, function(coverURL) {
								self.locations()[index].events()[jindex].cover = coverURL;
							}, this);
						})(j);
					}
				}, this);
			})(i);
		}
	};

	// Begins Facebook login process
	self.login = function() {
     	FB.login(function(response) {
	    	if (response.authResponse) {
	      		self.loggedIn(true);
	      		self.authorized(true);
	      		self.wantsToSeeApp(true);
				self.loadData(pasadena);
	    	} else if (!response || response.error) {
	      		vm.fbErr(true);
	    	} else {
	      		self.loggedIn(false);
	    	}
	  	},{scope: 'email'});
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
    		self.wantsToSeeApp(false);
    		// Refresh the page to prevent bugs with Google Maps
    		//location.reload();
  		});
	};

	// Show app or not
	self.showApp = function() {
		return (self.loggedIn() && self.authorized() && self.wantsToSeeApp());
	};

	// Toggle list view
	self.toggleList = function() {
		self.showList(!self.showList());
	};

	// Animate info window up
	self.infoUp = function() {
		self.showInfo(true);
        ko.utils.toggleDomNodeCssClass(self.infoView, 'info-animate-up', true);
        ko.utils.toggleDomNodeCssClass(self.infoView, 'info-animate-down', false);
	};

	// Animate info window down
	self.infoDown = function() {
		self.showInfo(false);
		ko.utils.toggleDomNodeCssClass(self.infoView, 'info-animate-down', true);
        ko.utils.toggleDomNodeCssClass(self.infoView, 'info-animate-up', false);
	}

}