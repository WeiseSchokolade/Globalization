const videos = [
    document.getElementById("videoA"),
    document.getElementById("videoB"),
    document.getElementById("videoC")
];
const ratio = 9.0 / 16.0;

function setSize(video, width) {
    video.width = width;
    video.height = width * ratio;
}

function resize() {
    for (let i = 0; i < videos.length; i++) {
        let video = videos[i];
        setSize(video, video.parentElement.clientWidth)
    }
}
resize();

window.onresize = resize;