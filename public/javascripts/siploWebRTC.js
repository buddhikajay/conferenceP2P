/**
 * Created by buddhikajay on 8/5/16.
 */
var socket = io();
var webrtc = new SimpleWebRTC({
   // the id/element dom element that will hold "our" video
   localVideoEl: 'localVideo',
   // the id/element dom element that will hold remote videos
   remoteVideosEl: 'remoteVideos',
   // immediately ask for camera access
   autoRequestMedia: true,
   // url: 'https://'+location.hostname+':8888'
   url: 'https://sandbox.simplewebrtc.com:443/'
   // url: 'https://media.obmcse.xyz/'
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
   // you can name it anything
   webrtc.joinRoom('your awesome room name');
});

socket.on('message', function(message){
    console.log(message);
});

//socket.on('connect', function)



// function hasUserMedia() {
//    //check if the browser supports the WebRTC
//    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
//    navigator.mozGetUserMedia);
// }

// if (hasUserMedia()) {
//    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
//        || navigator.mozGetUserMedia;

//    //enabling video and audio channels
//    navigator.getUserMedia({ video: true, audio: true }, function (stream) {
//       var video = document.getElementById('localVideo');

//       //inserting our stream to the video tag
//       video.src = window.URL.createObjectURL(stream);
//    }, function (err) {});
// } else {
//    alert("WebRTC is not supported");
// }

// window.addEventListener('message', function (event) {
//    console.log('onMessage: '+JSON.stringify(event.data));
//    if(event.data['sourceId']){
//       streamId = event.data['sourceId'];
//       console.log(streamId);

//       //enabling video and audio channels
//       navigator.getUserMedia(
//           { video: {mandatory: {chromeMediaSource: 'desktop', chromeMediaSourceId: streamId,maxWidth: window.screen.width,maxHeight: window.screen.height}}, audio: false },
//           function (stream) {
//                var video = document.getElementById('localVideo');

//                //inserting our stream to the video tag
//                video.src = window.URL.createObjectURL(stream);
//             },
//           function (err) {});
//    }
// });
