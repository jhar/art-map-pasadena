ko.bindingHandlers.toggleAnimation = {
	init: function(element, valueAccessor, allBindings) {
		// Pre-define open, and close
		var accessor = valueAccessor();
		accessor().open = allBindings.get('open');
		accessor().close = allBindings.get('close');

		// Add click handler for trigger element
		element.addEventListener("click", function() {
			var accessor = valueAccessor();
			var value = ko.unwrap(valueAccessor());
            accessor().show(!value.show());
            accessor().started(true);
		});
	},
	update: function(element, valueAccessor, allBindings) {
		// Define target (necessary to be in update because of foreach elements)
		var accessor = valueAccessor();
        var target = allBindings.get('target');
		if (isNaN(target.charAt(0))) {
			console.log("here");
			accessor().target = document.getElementsByClassName(target)[0];
		} else {
			console.log(document.getElementById(target));
			accessor().target = document.getElementById(target);
		}

		// Animate
		var value = ko.unwrap(valueAccessor());
        if (value.started()) {
	        var classes = value.target.classList;
	        if (value.show()) {
	        	// Open animation
	        	classes.add(value.open);
	        	classes.remove(value.close);
	        } else {
	        	// Close animation
		        classes.add(value.close);
		        classes.remove(value.open);
	        }
	    }
	}
};