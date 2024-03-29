const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video')
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);
});

socket.emit('join-room', ROOM_ID, 10);

socket.on('user-connected', userId => {                                                          
    console.log('user connected: ' + userId);
});

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}
