const youtubedl = require('yt-dlp-exec');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const ffmpegVersion = document.getElementById('ffmpegVersion');
const ffmpegPath = document.getElementById('ffmpegPath');
ffmpegVersion.textContent = `ffmpeg version ${ffmpeg.version}`;
ffmpegPath.textContent = `ffmpeg path ${ffmpeg.path}`

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
    let videoQuality = `[height <=? ${qualityField.value}]`;
    let videoExtention = extensionField.value;
    let videoStartTime = startTimeField.value;
    let videoEndTime = endTimeField.value;
    
    if (qualityField.value == 'best') videoQuality = ''
    let videoFormat = `bestvideo${videoQuality}+bestaudio[ext=m4a]/bestvideo+bestaudio/best"`

    youtubedl(videoUrl, {
        o: `~/Downloads/%(title)s.%(ext)s`,
        format: videoFormat,
        ffmpegLocation: ffmpeg.path,
        mergeOutputFormat: videoExtention,
        noPlaylist: true,

        externalDownloader: "ffmpeg",
        externalDownloaderArgs: `ffmpeg_i:-ss ${videoStartTime} -to ${videoEndTime}`,
    })
        .then(output => {
            console.log(output)
            isDownloading.textContent = 'download success, you can find the video on your downloads folder'
        });
}