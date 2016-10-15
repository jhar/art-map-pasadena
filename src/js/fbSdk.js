// Load the Facebook Graph API (670403756436443)
window.fbAsyncInit = function() {
	FB.init({
		appId      : '695503930593092',
		xfbml      : false,
		version    : 'v2.8'
	});

	jsIsReady('facebook');
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));