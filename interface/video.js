window.onload = () => {
    let videoID = [];

    navigator.mediaDevices.enumerateDevices().then( devices => {
        devices.forEach(device => {
            if (device.kind == "videoinput"){
//            if (device.kind == "videoinput" && device.deviceId != 'c35c8512ff65c068ae63551b952daaab176e5396a95f597a43f1108842f6ce53' ){
                videoID.push(device.deviceId);
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
    $('#warn-webcam').text("Cameras: "+videoID.length);
}


/*window.onload = () => {
//    let canvas = document.getElementById('canvas');
//    let context = canvas.getContext('2d');
    let video = document.getElementById('video');
    let vendorUrl = window.URL || window.webkitURL;

    navigator.getMedia =    navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

    navigator.getMedia({
        video: true,
        audio: false
    }, (stream) => {
        video.srcObject = stream;
        video.play();
    }, (error) => {
        console.log(error);
    });
};*/