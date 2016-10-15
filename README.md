# Artenings

Modern urban life can be alienating. All too often I've felt disconnected and out-of-touch with my local community. I have trouble figuring out where to go and what to do with my spare time. If you're like me, then you appreciate being kept up-to-speed on what's going on around you, especially if it involves something that you care about. I care about art, so I decided to map local events in my neighborhood. It's one small step towards being better informed and thus a better citizen. And aliens - there are reasons.

The interactive map is a single-page app. It represents a curated list of arts and community organizations in Pasadana, California -- my current home. The map itself and the markers are created with the Google Maps JavaScript API. Information and imagery about the locations and their upcoming events are dynamically loaded with the Facebook Graph API. Originally, this project also used the Knockout.js MVVM framework, Bootstrap, and things like jQuery. It was horribly slow though, so I've tasked myself with rewriting it all with Vanilla JavaScript. It's already a lot snappier.

The overall look and feel was partially guided by Material Design, with use of Roboto fonts and Google's free Material icons. The aliens were my own invention and were created with GIMP. 

Gulp is currently used for automating tasks. Mocha and Chai have recently been employed for testing duties. I've experimented with writing parts in Angular 2, Polymer, and Vanilla Dart - none of them stuck.

## To do:
* User should be able to interact with events (joining, etc)
* The search function could also work through event titles and descriptions
* Make it more general - working for any given location
