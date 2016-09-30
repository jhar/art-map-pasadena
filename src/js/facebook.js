window.fbAsyncInit = function() {
  FB.init({
    appId      : '695503930593092',
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
      // the user is already logged in and has authenticated your app
      appInit();
      vm.loggedIn(true);
      mapInit();
      vm.loadData();
    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook,
      // but has not authenticated your app
      // alert('You have not authenticated my app.');
      appInit();
      loginFlow();
    } else if (!response || response.error) {
      vm.fbErr(true);
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
      vm.loggedIn(true);
      mapInit();
      vm.loadData();
      console.log('Login successful.');
    } else if (!response || response.error) {
      vm.fbErr(true);
    } else {
      vm.loggedIn(false);
      alert('Login failed.');
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
    } else if (!response || response.error) {
      vm.fbErr(true);
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
      } else if (!response || response.error) {
        vm.fbErr(true);
      }
    });
}

function getCoverPhoto(id, callback, object) {
  var query = "/" + id + "?fields=cover{source}";
    FB.api(query, function (response) {
      if (response && !response.error) {
        /* handle the result */
        callback.call(object, response.cover.source);
      } else if (!response || response.error) {
        vm.fbErr(true);
      }
    });
}
