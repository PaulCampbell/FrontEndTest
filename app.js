var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){

})

app.get('/api/v1/artists.json', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var callbackParam = req.query.callback
    if(callbackParam) {
        res.end(callbackParam + '({"artists":[{"id":"1","name":"Radiohead","website":"http://radiohead.com/","href":"/api/v1/artists/1.json"},{"id":"2","name":"Nick Cave & The Bad Seeds","website":"http://www.nickcave.com/","href":"/api/v1/artists/2.json"},{"id":"3","name":"John Frusciante","website":"http://johnfrusciante.com/","href":"/api/v1/artists/3.json"}],"meta":{"artists":{"page":1,"page_size":10,"count":3,"includes":[],"page_count":1,"previous_page":null,"next_page":null,"previous_href":null,"next_href":null}},"links":{"artists.albums":{"href":"/api/v1/albums.json?artist_id={artists.id}","type":"albums"}}})');
    }
    res.end('{"artists":[{"id":"1","name":"Radiohead","website":"http://radiohead.com/","href":"/api/v1/artists/1.json"},{"id":"2","name":"Nick Cave & The Bad Seeds","website":"http://www.nickcave.com/","href":"/api/v1/artists/2.json"},{"id":"3","name":"John Frusciante","website":"http://johnfrusciante.com/","href":"/api/v1/artists/3.json"}],"meta":{"artists":{"page":1,"page_size":10,"count":3,"includes":[],"page_count":1,"previous_page":null,"next_page":null,"previous_href":null,"next_href":null}},"links":{"artists.albums":{"href":"/api/v1/albums.json?artist_id={artists.id}","type":"albums"}}}')
});


app.get('/api/v1/artists/:id.json', function(req, res){
    var id = req.params.id;
    switch(id){
        case '1':
            var artistJson =  {"artists":[{"id":"1","name":"Radiohead","website":"http://radiohead.com/","href":"/api/v1/artists/1.json"}],"meta":{"artists":{"page":1,"page_size":10,"count":1,"includes":[],"page_count":1,"previous_page":null,"next_page":null,"previous_href":null,"next_href":null}},"links":{"artists.albums":{"href":"/api/v1/albums.json?artist_id={artists.id}","type":"albums"}}};
            break;
        case '2':
            var artistJson = {"artists":[{"id":"2","name":"Nick Cave & The Bad Seeds","website":"http://www.nickcave.com/","href":"/api/v1/artists/2.json"}],"meta":{"artists":{"page":1,"page_size":10,"count":1,"includes":[],"page_count":1,"previous_page":null,"next_page":null,"previous_href":null,"next_href":null}},"links":{"artists.albums":{"href":"/api/v1/albums.json?artist_id={artists.id}","type":"albums"}}};
            break;
        case '3':
            var artistJson =  {"artists":[{"id":"3","name":"John Frusciante","website":"http://johnfrusciante.com/","href":"/api/v1/artists/3.json"}],"meta":{"artists":{"page":1,"page_size":10,"count":1,"includes":[],"page_count":1,"previous_page":null,"next_page":null,"previous_href":null,"next_href":null}},"links":{"artists.albums":{"href":"/api/v1/albums.json?artist_id={artists.id}","type":"albums"}}};
            break;
    }
   if(artistJson) {
       res.setHeader('Content-Type', 'application/json');
       var callbackParam = req.query.callback
       if(callbackParam) {
           res.end(callbackParam + '(' + JSON.stringify(artistJson) + ')');
       }
       res.end(JSON.stringify(artistJson));
   }
    else {
       res.send(404)
   }
});


app.put('/api/v1/artists/:id.json', function(req, res){
    var id = req.params.id;
    res.send(200)
});


app.get('/api/v1/albums.json', function(req,res) {
    var callbackParam = req.query.callback
    var artist_id = req.query.artist_id
    var albumJson = '';
    if(artist_id == 1) {
        albumJson = {"albums":[
            {"id":"1","title":"Kid A","year":2000,"href":"/api/v1/albums/1.json","links":{"artist":"1"}},
            {"id":"2","title":"Amnesiac","year":2001,"href":"/api/v1/albums/2.json","links":{"artist":"1"}}
            ],
            "meta":{"albums":{"page":1,"page_size":10,"count":2,"includes":[],"page_count":1,"previous_page":null,"next_page":null,"previous_href":null,"next_href":null}},
            "links":{"albums.artist":{"href":"/api/v1/artists/{albums.artist}.json","type":"artists"}}}
    }
    if(artist_id == 2) {
        albumJson = {"albums":[
            {"id":"3","title":"Murder Ballads","year":1996,"href":"/api/v1/albums/3.json","links":{"artist":"2"}}
        ],
            "meta":{"albums":{"page":1,"page_size":10,"count":1,"includes":[],"page_count":1,"previous_page":null,"next_page":null,"previous_href":null,"next_href":null}},
            "links":{"albums.artist":{"href":"/api/v1/artists/{albums.artist}.json","type":"artists"}}};
    }
    if(artist_id ==3) {
        albumJson = {"albums":[{"id":"4","title":"Curtains","year":2005,"href":"/api/v1/albums/4.json","links":{"artist":"3"}}],
            "meta":{"albums":{"page":1,"page_size":10,"count":1,"includes":[],"page_count":1,"previous_page":null,"next_page":null,"previous_href":null,"next_href":null}},
            "links":{"albums.artist":{"href":"/api/v1/artists/{albums.artist}.json","type":"artists"}}};
    }

    res.setHeader('Content-Type', 'application/json');
    if(callbackParam) {
        res.end(callbackParam + '(' + JSON.stringify(albumJson) + ')');
    }
    res.end(JSON.stringify(albumJson));
})



app.listen(process.env.PORT || 3000);

