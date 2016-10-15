// TODO: data-bind="event: {keyup: liveSearch}"
// TODO: Alternate list/close icons

var fbLogin = function() {
	var self = this;
	self.login = document.getElementsByClassName('login-view')[0];
	self.loginBtn = document.getElementsByClassName('fb-auth')[0];
	self.logoutBtn = document.getElementsByClassName('fb-auth-out')[0];

	// Attach event listeners
	self.loginBtn.addEventListener('click', function() {vm.login();});
	self.logoutBtn.addEventListener('click', function() {vm.logout();});

	self.toggleLogin = function () {
		vm.resetUI();
		self.login.classList.toggle('display-none');
		gmReset();
	};
};