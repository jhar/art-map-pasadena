var fbl, uit, vm;

var appInit = function() {
	fbl = new FBLogin();
	uit = new UITransitions();
	vm = new ViewModel();
	lr = new ListRender();
	ko.applyBindings(vm);
	fbl.checkIfLoggedIn();
};

// App is loaded
jsIsReady('app');