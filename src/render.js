const youtubedl = require('yt-dlp-exec');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const urlField = document.getElementById('urlField');
const confirmField = document.getElementById('confirmField');
const paddingCheckBox = document.getElementById('paddingCheckBox');
const qualityField = document.getElementById('qualityField');
const extensionField = document.getElementById('extensionField');
const startTimeField = document.getElementById('startTimeField');
const endTimeField = document.getElementById('endTimeField');
const isDownloading = document.getElementById('isDownloading');

const downloadButton = document.getElementById('downloadButton');
downloadButton.onclick = download;

// have a thing where if you place a complete youtube url youtube dl checks if it's valid
// think about jquery
function simulateDownload() {
    youtubedl(urlField.value), {
        getUrl: true,
    }
        .then(output => {
            if (output.includes('ERROR')) {
                console.log('ERROR');
                confirmField.textContent = 'highlight_off';
            } else confirmField.textContent = 'check_circle_outline';
        })
}


function download() {
    isDownloading.textContent = 'currently downloading'

    //calculates start time and adds padding
    let padding = 0
    if (paddingCheckBox.checked) padding = 5;
    let startTime = String(startTimeField.value).split(":");
    let hours = parseInt(startTime[0])
    let minutes = parseInt(startTime[1])
    let seconds = parseInt(startTime[2])
    let finalStartTime = (hours * 3600) + (minutes * 60) + (seconds) - padding
    Math.max(finalStartTime, 0)

    
    let videoQuality = `[height <=? ${qualityField.value}]`;
    if (qualityField.value === 'best') videoQuality = '';
    let videoFormat = `bestvideo${videoQuality}+bestaudio[ext=m4a]/bestvideo+bestaudio/best"`;

    youtubedl(urlField.value, {
        o: `~/Downloads/%(title)s.%(ext)s`,
        format: videoFormat,
        ffmpegLocation: ffmpeg.path,
        mergeOutputFormat: extensionField.value,
        noPlaylist: true,

        externalDownloader: "ffmpeg",
        externalDownloaderArgs: `ffmpeg_i:-ss ${finalStartTime} -to ${endTimeField.value}`,
    })
        .then(output => {
            console.log(output)
            isDownloading.textContent = 'download success, you can find the video on your downloads folder'
        });
}