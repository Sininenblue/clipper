const youtubedl = require('yt-dlp-exec');

const urlField = document.getElementById('urlField');
const qualityField = document.getElementById('qualityField');
const extensionField = document.getElementById('extensionField');
const startTimeField = document.getElementById('startTimeField');
const endTimeField = document.getElementById('endTimeField');
const isDownloading = document.getElementById('isDownloading');

const downloadButton = document.getElementById('downloadButton');
downloadButton.onclick = download;


function download() {
    isDownloading.textContent = 'currently downloading'

    let videoUrl = urlField.value;
    let videoQuality = qualityField.value;
    let videoExtention = extensionField.value;
    let videoStartTime = startTimeField.value;
    let videoEndTime = endTimeField.value;

    youtubedl(videoUrl, {
        o: `~/Downloads/%(title)s - by %(uploader)s.%(ext)s`,
        format: `bestvideo[height <=? ${videoQuality}]+bestaudio[ext=m4a]/bestvideo+bestaudio/best"`,
        mergeOutputFormat: videoExtention,
        externalDownloader: "ffmpeg",
        externalDownloaderArgs: `ffmpeg_i:-ss ${videoStartTime} -to ${videoEndTime}`,
    })
        .then(output => {
            console.log(output)
            isDownloading.textContent = String(output)
        });
}