var state, vm;

var appInit = function() {
	fbl = new fbLogin();
	uit = new uiTransitions();
	vm = new ViewModel();
	ko.applyBindings(vm);
	vm.checkIfLoggedIn();
};

// App is loaded
jsIsReady('app');