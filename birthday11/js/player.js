// player.js
var audio = document.getElementById("audio_music");
var playButtonDiv = document.getElementById("div_play_button");
var playButtonImg = document.getElementById("play_button_img");

function toggleAudio() {
    if (audio.paused) {
        audio.play();
        playButtonDiv.classList.add("playing");
        playButtonImg.src = "https://t.tutu.to/img/vPYwM";
    } else {
        audio.pause();
        playButtonDiv.classList.remove("playing");
        playButtonImg.src = "https://t.tutu.to/img/vPYwM";
    }
}

function playAudio() {
    if (audio.paused) {
        audio.play();
        playButtonDiv.classList.add("playing");
        playButtonImg.src = "https://t.tutu.to/img/vPYwM";
    }
}

window.addEventListener("DOMContentLoaded", function() {
    audio.addEventListener("play", function() {
        playButtonDiv.classList.add("playing");
        localStorage.setItem("audioPlaying", "true");
    });

    audio.addEventListener("pause", function() {
        playButtonDiv.classList.remove("playing");
        localStorage.setItem("audioPlaying", "false");
    });

    audio.addEventListener("timeupdate", function() {
        localStorage.setItem("audioCurrentTime", audio.currentTime);
    });

    audio.addEventListener("loadedmetadata", function() {
        var isPlaying = localStorage.getItem("audioPlaying") === "true";
        var currentTime = parseFloat(localStorage.getItem("audioCurrentTime")) || 0;
        var lastCloseTime = parseInt(localStorage.getItem("lastCloseTime")) || 0;
        var currentTimeMillis = new Date().getTime();

        // 判断页面关闭时间是否超过15秒
        if (currentTimeMillis - lastCloseTime > 15000) {
            audio.currentTime = 0; // 重新开始播放
        } else {
            audio.currentTime = currentTime; // 恢复播放状态
        }

        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    // Check if audio was playing before page unload
    window.addEventListener("beforeunload", function() {
        localStorage.setItem("audioCurrentTime", audio.currentTime);
        localStorage.setItem("audioPlaying", audio.paused ? "false" : "true");
        localStorage.setItem("lastCloseTime", new Date().getTime()); // 记录页面关闭时间
    });

    // Restore audio state on page load
    if (localStorage.getItem("audioPlaying") === "true") {
        audio.play();
        playButtonDiv.classList.add("playing");
    } else {
        audio.pause();
        playButtonDiv.classList.remove("playing");
    }
    audio.currentTime = parseFloat(localStorage.getItem("audioCurrentTime")) || 0;

    // Add global click event listener
    document.addEventListener("click", function(event) {
        if (!playButtonDiv.contains(event.target)) {
            if (audio.paused) {
                toggleAudio();
            }
        }
    });
});