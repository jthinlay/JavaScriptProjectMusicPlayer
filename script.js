const image = document.getElementById('image');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Check if Playing
let isPlaying = false; 

// Play Song
function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
// Pause Song
function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()));

//Load Songs
function loadSongs(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`; 
}

// On Load - Select First Song
loadSongs(songs[0]);

// Current Song 
let i = 0; 

// Previous Song
function prevSong(){
    i--;
    if(i < 0){ 
        i = Songs.length -1;
    }
    loadSongs(songs[i])
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
}
// Next Song
function nextSong(){
    i++;
    if(i > songs.length - 1){ 
         i = 0;
    }
    loadSongs(songs[i])
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
}
// Update Progress Bar & Time
function updateProgressBar(event){
    
    if(isPlaying){
        const {duration, currentTime } = event.srcElement;
        //Update progress bar width
        const progressPercent = ( currentTime / duration ) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration 
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60 );

        // Deley switch duration Element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}: ${durationSeconds}`;
        }

        // Calculate display for current 
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60 );
       
        if(currentSeconds <10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`;
    }
}
// Set Progress Bar
function setProgressBar(event){
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
