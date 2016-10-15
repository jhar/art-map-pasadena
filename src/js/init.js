var fbl, uit, vm;

var appInit = function() {
	fbl = new FBLogin();
	uit = new UITransitions();
	vm = new ViewModel();
	lr = new LoopRender();
	ko.applyBindings(vm);
	fbl.checkIfLoggedIn();
};

// App is loaded
jsIsReady('app');