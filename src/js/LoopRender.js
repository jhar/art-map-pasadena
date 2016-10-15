// visible: $data, click: $parent.clickedListItem"

var LoopRender = function() {
	var self = this;
	self.listParent = document.getElementsByClassName('list-container')[0];
	self.names = [];

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

	// // Clicks markers when list item is clicked
	// self.clickedListItem = function(name) {
	// 	google.maps.event.trigger(self.locations[self.names.indexOf(name)].marker, 'click');
	// };
};