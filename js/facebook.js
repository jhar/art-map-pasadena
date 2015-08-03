window.fbAsyncInit = function() {
  FB.init({
    appId      : '670403756436443',
    xfbml      : false,
    version    : 'v2.4'
  });

  checkIfLoggedIn();
};

(function(d, s, id) {
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkIfLoggedIn() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // the user is logged in and has authenticated your app
      appInit();
      vm.loggedIn(true);
      mapInit();
      vm.loadData();
    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook,
      // but has not authenticated your app
      console.log('You have not authenticated my app.');
    } else {
      // the user isn't logged in to Facebook.
      appInit();
      vm.loggedIn(false);
    }
 });
}

function loginFlow() {
  FB.login(function(response) {
    if (response.authResponse) {
      mapInit(); // Initialize map
      vm.loggedIn(true);
      vm.loadData(); // Make request for location JSON data
    } else {
      console.log('Authorization failed.');
    }
  },{scope: 'email'});
}

function logoutFlow() {
  FB.getLoginStatus(function(response) {
    if (response.authResponse) {
      FB.logout(function(response) {
        vm.loggedIn(false);
        console.log("Logged you out");
      });
    }
    // Refresh the page to prevent bugs with Google Maps
    location.reload();
  });
}

function getEvents(pid, timeStamp, callback, object) {
  var query = "/" + pid + "/events?since=" + timeStamp;
    FB.api(query, function (response) {
      if (response && !response.error) {
        /* handle the result */
        callback.call(object, response);
      }
    });
}

function getCoverPhoto(id, callback, object) {
  var query = "/" + id + "?fields=cover{source}";
    FB.api(query, function (response) {
      if (response && !response.error) {
        /* handle the result */
        callback.call(object, response.cover.source);
      }
    });
}
