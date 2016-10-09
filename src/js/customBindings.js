ko.bindingHandlers.toggleAnimation = {
	init: function(element, valueAccessor, allBindings) {
		var accessor = valueAccessor();
		accessor().target = document.getElementsByClassName(allBindings.get('target'))[0];
		accessor().open = allBindings.get('open');
		accessor().close = allBindings.get('close');
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
	        	classes.add(value.open);
	        	classes.remove(value.close);
	        } else {
		        classes.add(value.close);
		        classes.remove(value.open);
	        }
	    }
	}
};