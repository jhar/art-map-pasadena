# Art Map Pasadena

This single-page app is an interactive map of events at a curated list of arts organizations in my neighborhood. The map is created and populated with markers by the Google Maps JavaScript API. Information and imagery about the locations and their upcoming events are dynamically loaded with the Facebook Graph API. DOM manipulation and UI state are primarily managed by Knockout.js and an MVVM design pattern.

The overall look and feel was partially guided by Material Design, with use of Roboto fonts and Google's free Material icons. The aliens were my own invention and were created with GIMP.

No CSS framework like Bootstrap is used. All CSS is hand-coded. Animations and transitions are defined within CSS, but are guided by the logic of Knockout's system for custom bindings.

Gulp is currently used for automating tasks. A simple node server is included for deploying to services like Heroku.

## To do:
* User should be able to interact with events (joining, etc)
* The search function could also work through event titles and descriptions
* Make it more general - working for any given location
