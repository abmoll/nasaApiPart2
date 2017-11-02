//server.js
var express = require('express')
var app = express()

// for every file inside this folder, it makes an app.get route for you
app.use(express.static('./public'))

//  {sD:"12-20-12",eD:12-22-12",}

var nasaUrl= "https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-10-30&end_date=2017-10-31&api_key=nxDNl3KDNp3hoakhRWDKErj3kIbrw8SS5Y7UsCQi";
const request = require('request');
//request('https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.sD}&end_date=${req.query.eD}',
request(nasaUrl, function(err, res, body){
    console.log("started");
    //console.log(body)
    console.log(request)
    //console.log("hazard: " + body.near_earth_objects[day][1].is_potentially_hazardous_asteroid)
    //console.log("length: " + body.near_earth_objects[2017-10-19][1].length)
});


app.get('/api', function(request,response){
  response.send(request.query)
})

app.get('/', function(request, response){
  response.sendFile('./public/index.html', {root: './'})
  console.log("Welcome to the internet!")
})
// app.get('/main.js', function(request, response){
// response.sendFile('.public/js/main.js', {root: './'})
// })
// app.get('/main.css', function(request, response){
// response.sendFile('./public/css/main.css', {root: './'})
// })
// commented out
// app.get('/', function(request, response){
// response.send("Hello World")
// })

app.use(express.static('public'))

app.get('/hello', function(request, response){
  response.send("Hello World")
// response.send("Web page made by Alex")
})
app.get('/about', function(request, response){
  response.sendFile('./public/about.html', {root: './'})
// response.send("Web page made by Alex")
})

app.get('/Home', function(request, response){
  response.sendFile('./public/index.html', {root: './'})
// response.send("Web page made by Alex")
})

app.get('/foo/bar', function(request, response){
  response.sendFile('./public/main.css', {root: './'})
// response.send("Web page made by Alex")
})

app.post('/form-submit', function(request, response){
  console.log("received post request!")
  //response.send("received the post request!")
  response.redirect('/about')
})

app.listen(8080, function() {
	console.log('The app is running on 8080')
})
