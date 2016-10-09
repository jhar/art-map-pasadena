ko.bindingHandlers.toggleAnimation = {
	init: function(element, valueAccessor, allBindings) {
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
	        var target = document.getElementsByClassName(allBindings.get('target'))[0];
	        var open = allBindings.get('open');
	        var close = allBindings.get('close');
	        var classes = target.classList;
	        var started = classes.contains(close) || classes.contains(open);
	        if (value.show()) {
	        	classes.add(open);
	        	classes.remove(close);
	        } else {
		        classes.add(close);
		        classes.remove(open);
	        }
	    }
	}
};