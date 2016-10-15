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