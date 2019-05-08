window.onload = () => {
    let videoID = [];

    navigator.mediaDevices.enumerateDevices().then( devices => {
        devices.forEach(device => {
//            if (device.kind == "videoinput"){
            if (device.kind == "videoinput" && device.deviceId != 'c35c8512ff65c068ae63551b952daaab176e5396a95f597a43f1108842f6ce53' ){
                videoID.push(device.deviceId);
                console.log(device.deviceId);
            }
        });
        buildVideo(videoID);
    });

}

function buildVideo(videoID){
    if(videoID.length){
        videoID.forEach(id => {
            let videoTag = document.createElement('VIDEO');
            videoTag.setAttribute('id',id);
            document.getElementById('video-container').appendChild(videoTag);

            navigator.getUserMedia({
                video: {
                    deviceId: id
                },
                audio: false,
            }, stream => {
                videoTag.srcObject = stream;
                videoTag.play();
            }, error => {
                console.log(error);
            })
        });
    }
    $('#webcam').text(`Cameras: ${videoID.length}`);
}