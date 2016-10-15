var UITransitions;
UITransitions = function () {
	var self = this;
	self.list = document.getElementsByClassName('list-view')[0];
	self.listTgl = document.getElementsByClassName('list-toggle')[0];
	self.listShow = false;
	self.listStarted = false;
	self.search = document.getElementsByClassName('search-container')[0];
	self.searchTgl = document.getElementsByClassName('search-lens')[0];
	self.searchClose = document.getElementsByClassName('search-close')[0];
	self.searchShow = false;
	self.searchStarted = false;
	self.info = document.getElementsByClassName('info-view')[0];
	self.arrow = document.getElementsByClassName('arrow')[0];
	self.infoShow = false;
	self.infoStarted = false;

	// Attach event listeners
	self.listTgl.addEventListener('click', function () {
		uit.animation('list');
	});
	self.searchTgl.addEventListener('click', function () {
		uit.animation('search');
	});
	self.searchClose.addEventListener('click', function () {
		uit.animation('search');
	});
	self.arrow.addEventListener('click', function () {
		uit.animation('info');
	});

	self.animation = function (target) {
		if (target === 'list' && self.listStarted === false) {
			self.list.classList.toggle('list-view-open');
			self.listShow = true;
			self.listStarted = true;
		} else if (target === 'list') {
			self.list.classList.toggle('list-view-close');
			self.list.classList.toggle('list-view-open');
			self.listShow = !self.listShow;
		} else if (target === 'search' && self.searchStarted === false) {
			self.search.classList.toggle('search-open-animation');
			self.searchShow = true;
			self.searchStarted = true;
		} else if (target === 'search') {
			self.search.classList.toggle('search-close-animation');
			self.search.classList.toggle('search-open-animation');
			self.searchShow = !self.searchShow;
		} else if (target === 'info' && self.infoStarted === false) {
			self.info.classList.toggle('info-animate-right');
			self.infoShow = true;
			self.infoStarted = true;
		} else if (target === 'info') {
			self.info.classList.toggle('info-animate-left');
			self.info.classList.toggle('info-animate-right');
			self.infoShow = !self.infoShow;
		}
	};

	self.resetUI = function () {
		self.listShow = false;
		self.listStarted = false;
		self.list.classList.remove('list-view-open');
		self.list.classList.remove('list-view-close');

		self.infoShow = false;
		self.infoStarted = false;
		self.info.classList.remove('search-close-animation');
		self.info.classList.remove('search-open-animation');

		self.searchShow = false;
		self.searchStarted = false;
		self.search.classList.remove('info-animate-right');
		self.search.classList.remove('info-animate-left');
	};
};