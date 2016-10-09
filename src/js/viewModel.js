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
	self.activeLocationEvents = ko.observableArray();

	// UI state
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

	// DOM Elements
	self.loginView = document.getElementsByClassName("login-view")[0];
	self.appView = document.getElementsByClassName("app")[0];

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
		self.toggleList();
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
					// Attach event cover photos to events
					for (var j = 0, len = self.locations()[index].events().length; j < len; j++) {
						(function(jindex) {
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
			self.showApp();
			self.loadData(pasadena);
		} else {
			FB.login(function(response) {
		    	if (response.authResponse) {
		      		self.loggedIn(true);
		      		self.authorized(true);
		      		self.showApp();
					self.loadData(pasadena);
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
    		self.showLogin();
  		});
	};

	// Reset UI
	self.resetUI = function() {
		self.showList(false);
		ko.utils.toggleDomNodeCssClass(self.listView, 'list-animate-open', false);
    	ko.utils.toggleDomNodeCssClass(self.listView, 'list-animate-close', false);
		
		self.showInfo(false);
		ko.utils.toggleDomNodeCssClass(self.infoView, 'info-animate-right', false);
    	ko.utils.toggleDomNodeCssClass(self.infoView, 'info-animate-left', false);
    	
    	self.showSearch(false);
    	ko.utils.toggleDomNodeCssClass(self.searchBar, 'search-open-animation', false);
    	ko.utils.toggleDomNodeCssClass(self.searchBar, 'search-close-animation', false);
	};

	// Show main app view
	self.showApp = function() {
		ko.utils.toggleDomNodeCssClass(self.loginView, 'display-none', true);
        ko.utils.toggleDomNodeCssClass(self.appView, 'display-none', false);
        gmReset();
	};

	// Show login screen
	self.showLogin = function() {
		self.resetUI();
        ko.utils.toggleDomNodeCssClass(self.appView, 'display-none', true);
        ko.utils.toggleDomNodeCssClass(self.loginView, 'display-none', false);
	};

};