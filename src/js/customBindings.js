ko.bindingHandlers.toggleAnimation = {
	init: function(element, valueAccessor) {
		// Add click handler for trigger element
		element.addEventListener("click", function() {
			var accessor = valueAccessor();
			var value = ko.unwrap(valueAccessor());
            accessor().show(!value.show());
            accessor().started(true);
		});
	},
	update: function(element, valueAccessor, allBindings) {
		// Get bindings
		var open = allBindings.get('open');
		var close = allBindings.get('close');
		var target = allBindings.get('target');
		if (isNaN(target.charAt(0))) {
			target = document.getElementsByClassName(target)[0];
		} else {
			target = document.getElementById(target);
		}
		// Animate
		var value = ko.unwrap(valueAccessor());
        if (value.started() && target) {
	        var classes = target.classList;
	        if (value.show()) {
	        	// Open animation
	        	classes.add(open);
	        	classes.remove(close);
	        } else {
	        	// Close animation
		        classes.add(close);
		        classes.remove(open);
	        }
	    }
	}
};