// Async JS handler
var fbLoaded, gmLoaded, appLoaded = false;
var jsIsReady = function(service) {
	if (service === 'facebook') fbLoaded = true;
	if (service === undefined) gmLoaded = true;
	if (service === 'app') appLoaded = true;
	if (gmLoaded && appLoaded) mapInit();
	if (fbLoaded && gmLoaded && appLoaded) appInit();
};