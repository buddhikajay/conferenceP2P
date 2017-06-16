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
   webrtc.joinRoom('buddhikajay');
});

socket.on('message', function(message){
    console.log(message);
});


// a peer video has been added
webrtc.on('videoAdded', function (video, peer) {
    console.log('video added', peer);
    var remotes = document.getElementById('remotes');
    if (remotes) {
        var container = document.createElement('div');
        container.className = 'videoContainer col-lg-6 col-md-6 col-sm-6 col-xs-6';
        container.id = 'container_' + webrtc.getDomId(peer);
        container.appendChild(video);

        // suppress contextmenu
        video.oncontextmenu = function () { return false; };

        remotes.appendChild(container);
        arrange();
    }
});


// a peer video was removed
webrtc.on('videoRemoved', function (video, peer) {
    console.log('video removed ', peer);
    var remotes = document.getElementById('remotes');
    var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'locallocal_video_containerScreenContainer');
    if (remotes && el) {
        remotes.removeChild(el);
        arrange();
    }
});

function arrange(){

    var remotes = document.getElementById('remotes');
    var videoCount = remotes.childElementCount;
    if (remotes) {
        switch (videoCount){
          case 1:
            console.log("Only One");
            $('.videoContainer').css('width', '90vw');
            $('.videoContainer').css('height', '90vh');
            break;

          case 2:
            console.log("Two");
            $('.videoContainer').css('width', '40vw');
            $('.videoContainer').css('height', '50vh');
            break;
          case 3:
            console.log("Three");
            $('.videoContainer').css('width', '28vw');
            $('.videoContainer').css('height', '50vh');
            break;
          case 4:
            console.log("Three");
            $('.videoContainer').css('width', '28vw');
            $('.videoContainer').css('height', '30vh');
            break;
        }
    }
}

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
