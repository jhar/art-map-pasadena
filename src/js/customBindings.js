ko.bindingHandlers.toggleAnimation = {
	init: function(element, valueAccessor, allBindings) {
		// Pre-define target, open, and close
		var accessor = valueAccessor();
		accessor().target = document.getElementsByClassName(allBindings.get('target'))[0];
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