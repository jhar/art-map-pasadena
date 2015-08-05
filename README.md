# facebook-events-map
Project 5 of Udacity's Front-End Nanodegree. Utilizes Google Maps and Facebook Graph API to create a local map of events (in this case, in Pasadena, California).

In order to use the site, you will need to download everything onto your computer and serve the folder through your localhost. For example, if I download the Zip to my desktop, unzip the folder, and then navigate into the folder through terminal. You can then run

```
python -m SimpleHTTPServer 8000
```

You can then open a browser and navigate to

```
http://localhost:8000
```

and from there you should be able to login. You'll need to login to Facebook to provide the necessary credentials for the app to work. At this point, the port number must be 8000 for the app to work.


## Improvements:
* Incorporate a build process, separate src & dist folders
* User should be able to interact with events (joining, etc)
* The UI and visual effects could always be improved
* The search function could also work through event titles and descriptions

## References:
* http://hayageek.com/facebook-javascript-sdk/
* http://knockoutjs.com/examples/animatedTransitions.html