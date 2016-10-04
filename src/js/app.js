var vm;

var appInit = function() {
	// Create view model object and apply bindings
	vm = new ViewModel();
	ko.applyBindings(vm);
};

// App is loaded
jsIsReady('app');