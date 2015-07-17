  window.fbAsyncInit = function() {
    FB.init({
      appId      : '670403756436443',
      xfbml      : true,
      version    : 'v2.4'
    });
  };

  (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

  function Login() {
    FB.login(function(response) {
     if (response.authResponse)
     {
                  vm.loadData();
                  getName(); // Get User Information.

                } else
                {
                 console.log('Authorization failed.');
               }
             },{scope: 'email'});
  }

  function getName() {
   FB.api('/me', function(response) {
    vm.fullName(response.name);
  });
 }

 function getEvents(pageID) {
   var query = "/" + pageID + "/events";
   FB.api(query, function (response) {
    console.log(pageID);
    if (response && !response.error) {
      /* handle the result */
    }
  });
 }

 function getCoverPhoto(pid, callback, object) {
   var query = "/" + pid + "?fields=cover{source}";
   FB.api(query, function (response) {
    if (response && !response.error) {
      /* handle the result */
      callback.call(object, response.cover.source);
    }
  });
 }