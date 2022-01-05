const youtubedl = require('yt-dlp-exec');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

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

    let videoQuality = `[height <=? ${qualityField.value}]`;
    if (qualityField.value == 'best') videoQuality = ''
    let videoFormat = `bestvideo${videoQuality}+bestaudio[ext=m4a]/bestvideo+bestaudio/best"`

    youtubedl(urlField.value, {
        o: `~/Downloads/%(title)s.%(ext)s`,
        format: videoFormat,
        ffmpegLocation: ffmpeg.path,
        mergeOutputFormat: extensionField.value,
        noPlaylist: true,

        externalDownloader: "ffmpeg",
        externalDownloaderArgs: `ffmpeg_i:-ss ${startTimeField.value} -to ${endTimeField.value}`,
    })
        .then(output => {
            console.log(output)
            isDownloading.textContent = 'download success, you can find the video on your downloads folder'
        });
}