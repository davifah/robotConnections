window.onload = () => {
    var videoID = [];

    navigator.mediaDevices.enumerateDevices().then( devices => {
        devices.forEach(device => {
            if (device.kind == "videoinput"){
                videoID.push(device.deviceId);
            }
        });
        console.log(videoID.length);
        buildVideo(videoID);
    });

}

function buildVideo(videoID){
    if(videoID.length){
        videoID.forEach(id => {
            let videoTag = document.createElement('VIDEO');
            videoTag.setAttribute('id',id);
            document.getElementById('videos').appendChild(videoTag);

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
    $('#warn-webcam').text(videoID.length+" Webcams conectadas");
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