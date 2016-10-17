

	self.getCoverPhoto = function(id, loc, event) {
	  	var query = "/" + id + "?fields=cover{source, offset_x, offset_y}";
	    FB.api(query, function (response) {
			if (response && !response.error) {
				if (event === undefined) { 
					self.locations[loc].cover = response.cover;
				} else {
					self.locations[loc].events[event].cover = response.cover;
				}
			} else if (!response || response.error) {
				vm.fbErr(true);
			}
	    });
	};

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
	// TODO: recalculate offset_y on screen resizes when screen is < 520px
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

	self.liveSearch = function(model, obj) {
		var pattern = new RegExp(obj.currentTarget.value.toLowerCase());
		for (var i = 0, len = self.locations.length; i < len; i++) {
			var name = self.locations[i].name;
			var lower = name.toLowerCase();
			if (pattern.test(lower)) {
				self.locations[i].marker.setVisible(true);
				lr.updateItem(i, name);
			} else {
				self.locations[i].marker.setVisible(false);
				lr.updateItem(i, null);
			}
		}
	};

	self.loadData = function(data) {

		// Clear locations array so that it isn't populated twice
		self.locations.length = 0;

		// Load JSON data into locations array
		for (var i = 0, len = data.locations.length; i < len; i++) {
			self.locations.push(new Location(
				data.locations[i].name,
				data.locations[i].lat,
				data.locations[i].lng,
				data.locations[i].pid
			));
			lr.names.push(data.locations[i].name);
		}
		lr.listItems();

		for (var i = 0, len = self.locations.length; i < len; i++) {
			// Get cover photo for each location
			(function(index) {
				self.getCoverPhoto(self.locations[index].pid, index);
			})(i);

			// Get events list for each location
			(function(index) {
				self.getEvents(self.locations[index].pid, timeStamp, function(response) {
					self.locations[index].events = response.data;
					// Attach event cover photos
					for (var j = 0, len = self.locations[index].events.length; j < len; j++) {
						(function(jindex) {
							self.getCoverPhoto(self.locations[index].events[jindex].id, index, jindex);
						})(j);
					}
				}, this);
			})(i);
		}
	};
};