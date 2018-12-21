//Initial message
console.log("Deep Clock Web Init");

//Setting up socket connection
let socket = io();
let message = ' ';
let currentImage = document.getElementById('Image');
//Socket function for receiving new image
socket.on('image message', newImage);

function newImage(msg) {
    message = msg;
    console.log(message);
    if(currentImage.src !== null) {
      let pastURL = currentImage.src;
      currentImage.src = message;
      console.log('Past URL: ' + pastURL);
      console.log('Current URL: ' + currentImage.src);
    } else {
      currentImage.src = message;
    }
}

async function dataQuery() {
  

}
