# The front end test

This is a http service and set of instructions for a little pre-interview test for front
end developers...


## Discography web service

a json webservice can be found:

/api/v1/artists.json

The service supports jsonp by making a request to any endpoint with a callback query string parameter:

/api/v1/artists.json?callback=MyCallback

Artist resources can be updated by putting a json payload to any artist endpoint:

        PUT: /api/v1/artists/1.json

A successful PUT will result in a 200 response. (The service does not actually
persist... Just provides an endpoint to interact with.)


## Test instructions

Write a test-driven Discography JQuery plugin

<ol>
<li>Use the data published here: http://pcampbellem-test.nodejitsu.com/api/v1/artists.json</li>
<li>When loaded, the plugin should render a clickable list of artist names</li>
<li>A user should be able edit the list by adding wikipedia URLs for each artist.
(The service will not persist the update immediately, but the app should be capable of making PUT update requests)</li>
<li>When an artist name link is clicked then the list of albums for that artist should be displayed</li>
</ol>

## Getting the service up and running

To run it locally go to the command line and type `node app.js`

You probably also want to `npm install` all the things first

When that fails, you probably want to `sudo npm install` all the things.

Here's a handy alias for next time that happens:

  alias ffs=sudo !!


To run the tests, go the command line and type `mocha`


Deploy it to Nodejitsu if you want.  It's currently up here:

http://pcampbellem-test.nodejitsu.com/

