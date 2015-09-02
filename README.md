# pasadena-arts-events-map

Utilizes Google Maps and Facebook Graph API to create a local map of events at selected arts organizations.


To use locally, clone or download a zip, CD into the folder and launch a server with:

```
python -m SimpleHTTPServer 8000
```

You can then open a browser and navigate to

```
http://localhost:8000
```

and from there you should be able to login to Facebook to provide the necessary credentials for the app to work. At this point, the port number must be 8000.


## Improvements:
* Incorporate a build process, separate src & dist folders
* User should be able to interact with events (joining, etc)
* The UI and visual effects could always be improved
* The search function could also work through event titles and descriptions

## References:
* http://hayageek.com/facebook-javascript-sdk/
* http://knockoutjs.com/examples/animatedTransitions.html