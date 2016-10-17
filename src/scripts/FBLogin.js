var FBLogin = function() {
	var self = this;
	self.authorized = false;
	self.loggedIn = false;
	self.loginView = document.getElementsByClassName('login-view')[0];
	self.loginBtn = document.getElementsByClassName('fb-auth')[0];
	self.logoutBtn = document.getElementsByClassName('fb-auth-out')[0];
	self.fbErr = false;

	// Attach event listeners
	self.loginBtn.addEventListener('click', function() {fbl.login();});
	self.logoutBtn.addEventListener('click', function() {fbl.logout();});

	self.toggleLogin = function () {
		uit.resetUI();
		self.loginView.classList.toggle('display-none');
		gmReset();
	};


	self.login = function() {
		if (self.loggedIn && self.authorized) {
			self.toggleLogin();
			vm.loadData(pasadena);
			gmReset();
		} else {
			FB.login(function(response) {
				if (response.authResponse) {
					self.loggedIn = true;
					self.authorized = true;
					self.toggleLogin();
					vm.loadData(pasadena);
					gmReset();
				} else if (!response || response.error) {
					self.fbErr = true; // TODO: Move elsewhere?
				} else {
					self.loggedIn = false;
				}
			},{scope: 'email'});
		}
	};

	self.logout = function() {
		FB.getLoginStatus(function(response) {
			if (response.authResponse) {
				FB.logout(function(response) {
					self.loggedIn = false;
				});
			} else if (!response || response.error) {
				self.fbErr = true;
			}
			self.toggleLogin();
			uit.resetUI();
		});
	};
};