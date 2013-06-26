should = require 'should'
request = require 'request'

describe 'get artists', ->
  it 'should return the json list of artists', (done) ->
    request.get 'http://localhost:3000/api/v1/artists.json', (err, res, body) ->
      JSON.parse(body).artists.length.should.equal 3
      res.statusCode.should.equal 200
      done()


  it 'should support jsonp', (done) ->
    request.get 'http://localhost:3000/api/v1/artists.json?callback=MyCallback', (err, res, body) ->
      responseObject = eval(body)
      responseObject.artists.length.should.equal 3
      done()


  describe 'follow to artist detail', ->
    firstArtist = null;
    before (done)->
      request.get 'http://localhost:3000/api/v1/artists.json', (err, res, body) ->
        firstArtist = JSON.parse(body).artists[0]
        done()


    it 'should return the artist detail', (done) ->
      request.get 'http://localhost:3000' + firstArtist.href, (err, res, body) ->
        JSON.parse(body).artists[0].name.should.equal 'Radiohead'
        done()

    it 'should support jsonp', (done) ->
      request.get 'http://localhost:3000' + firstArtist.href + '?callback=MyCallback', (err, res, body) ->
        responseObject = eval(body)
        responseObject.artists[0].name.should.equal  'Radiohead'
        done()


    describe 'follow to album detail', ->
      artist = null
      albumLink = ''
      before (done)->
        request.get 'http://localhost:3000' + firstArtist.href, (err, res, body) ->
          artist = JSON.parse(body)
          albumLink = 'http://localhost:3000' + artist.links['artists.albums'].href.replace('{artists.id}', artist.artists[0].id)
          done()

      it 'should return the album detail', (done) ->
        request.get albumLink, (err, res, body) ->
          JSON.parse(body).albums[0].title.should.equal 'Kid A'
          done()

      it 'should support jsonp', (done) ->
        request.get albumLink + '&callback=MyCallback', (err, res, body) ->
          responseObject = eval(body)
          responseObject.albums[0].title.should.equal 'Kid A'
          done()


MyCallback = (json) -> return json