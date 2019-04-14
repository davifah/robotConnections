window.onload = () => {
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
};