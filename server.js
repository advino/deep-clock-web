//Setting up server using Express, setting up sockets using socket.io, importing Twitter module
const twitMod = require('./public/Scripts/twitMod.js');
const express = require('express');
const app = express();
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Listening intently on port ${port}`);
});
const io = require('socket.io')(server);
const fs = require('fs');

//Serve all files in /public
app.use(express.static(__dirname + '/public'));

let database = fs.readFile('database.txt', () => {
  console.log("Database loaded");
});

//Twitter variables from twitMod module
const T = twitMod.T;
const params = twitMod.params;
let mediaURL;
let pastURL;
console.log('Deep Clock Server Init');

//Twitter Stream Function
let stream = T.stream('statuses/filter', params);
stream.on('tweet', getURL);

// Twitter get URL function
function getURL(tweet) {
  let post = tweet.entities;
  if(post.hasOwnProperty('media')) {
    mediaURL = post.media[0].media_url;
    
    fs.appendFile('database.txt', mediaURL + "\n", (err) => {
      if(err) throw err;
      console.log(mediaURL);
    })

    io.emit('image message', mediaURL);
  }
}

//Setting up socket connections
io.on('connection', newConnection);

//Connection Event Function
function newConnection(socket) {
  console.log('A user connected');
  socket.emit('image message', mediaURL);
}
