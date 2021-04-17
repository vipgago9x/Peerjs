function openStream() {
  const config = {
    audio: true,
    video: true,
  };
  return navigator.mediaDevices.getUserMedia(config);
}

function playStream(videoId, stream) {
  const video = document.getElementById(videoId);
  video.srcObject = stream;
  video.play();
}

openStream()
  .then(stream => {
    playStream("localStream", stream);
  });

const peer = new Peer({ host: '192.168.1.10', secure: true, port: 3001 });

peer.on('open', id => {
  document.getElementById('my-peer').innerHTML += " " + id;
})

function clickHandler() {
  const id = document.getElementById('remoteId').value;
  openStream()
    .then(stream => {
      playStream('localStream', stream);
      const call = peer.call(id, stream);
      call.on('stream', remoteStream => {
        playStream('remoteStream', remoteStream);
      });
    })
}

//call
peer.on('call', call => {
  openStream()
    .then(stream => {
      call.answer(stream);
      playStream('localStream', stream);
      call.on('stream', remoteStream => {
        playStream('remoteStream', remoteStream);
      });
    })
})