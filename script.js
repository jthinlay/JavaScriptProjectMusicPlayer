const music = document.querySelector('audio');
const image = document.getElementById('image');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const voluBtn = document.getElementById('volumeIcon');

function loadSongs(song){
    image.src = `img/${song.name}.jpg`;
    music.src = `music/${song.name}.mp3`;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
}
loadSongs(songs[0]);

let isPlaying = false;

function playSong(){
    isPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    voluBtn.classList.replace('fa-volume-down', 'fa-volume-up');
}
function pauseSong(){
    isPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    voluBtn.classList.replace('fa-volume-up', 'fa-volume-down');
}
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

let i = 0;
function nextSong(){
    playBtn.classList.replace('fa-play', 'fa-pause');
    isPlaying = true;
    i++;
    if(i > songs.length - 1){
        i = 0;
    }
    loadSongs(songs[i]);
    playSong();  
}
function prevSong(){
    playBtn.classList.replace('fa-play', 'fa-pause' );
    isPlaying = true;
    i--;
    if(i < 1){
        i = songs.length - 1;
    }
    loadSongs(songs[i]);
    playSong();
    
}
function updateProgressBar(event){
    const {currentTime, duration } = event.srcElement; 
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds){
        durationEl.textContent = `${durationMinutes}: ${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10){
        currentSeconds = `0${currentSeconds}`
    }
    currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`
}

function setProgressBar(event){
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

function setVolume(value) {
    music.volume = value;
  }

progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);