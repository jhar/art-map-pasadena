// TODO: data-bind="event: {keyup: liveSearch}"
// TODO: data-bind="visible: gmErr()" -- search for the error message if you forget
// TODO: Add default content - information about the me & the app
// TODO: (activeLocationCover) data-bind="attr: {src: activeLocationCover().source, 'data-offsety': activeLocationCover().offset_y}" onload="vm.changeOffsetY(this, false)"
// TODO: data-bind="text: activeLocationName() || 'Art Map Pasadena'"
// TODO: data-bind="text: activeLocationEvents().length > 0 ? 'Upcoming Events' : 'No upcoming events'"
// TODO: (events-container) data-bind="foreach: activeLocationEvents.slice(0    ).reverse()"
// TODO: (event-image-container) data-bind="with: cover"
// TODO: (event-image) data-bind="attr: { src: source , 'data-offsety': offset_y }" onload="vm.changeOffsetY(this, true)"
// TODO: (event-title-container) data-bind="toggleAnimation: animation, target: id, open: 'description-open', close: 'description-close'"
// TODO: (event-title) data-bind="text: name"
// TODO: (event-description) data-bind="attr: {id: id}"
// TODO: (event-description-text) data-bind="text: description"

var ListRender = function() {
	var self = this;
	self.listParent = document.getElementsByClassName('list-container')[0];
	self.names = [];
	self.trigger = document.getElementsByClassName('nav-trigger')[0];

	// Attach event listeners for trigger elements
	self.trigger.addEventListener('click', function () {
		if (this.src === location.origin + '/images/list.png') {
			this.src = location.origin + '/images/black-x.png';
		} else {
			this.src = location.origin + '/images/list.png';
		}
	});

	self.listItems = function() {
		self.listParent.innerHTML = '';
		for (var i = 0, len = self.names.length; i < len; i++) {
			(function(index) {
				var name = self.names[index];
				var listItemTempl = '<div class="list-item" id="lr' + index + '">' +
					'<img class="list-icon" src="images/list-icon.png">' +
					'<span class="list-text">' + name + '</span></div>';
				var newDiv = document.createElement("div");
				newDiv.innerHTML = listItemTempl;
				newDiv.addEventListener('click', function() {lr.clickback(index)});
				self.listParent.appendChild(newDiv);
			})(i);
		}
	};

	self.updateItem = function(i, name) {
		self.names[i] = name;
		var elem = document.getElementById('lr' + i);
		if (name === null) {
			elem.classList.add('display-none');
		} else {
			elem.classList.remove('display-none');
		}
	};

	// Clicks markers when list item is clicked
	self.clickback = function(i) {
		google.maps.event.trigger(vm.locations[i].marker, 'click');
	};
};