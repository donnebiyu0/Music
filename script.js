let music = document.querySelector('.music')
let prev = document.querySelector('.previous')
let random = document.querySelector('.random')
let play = document.querySelector('.play-stop')
let next = document.querySelector('.next')
let volume = document.querySelector('.volume')
let albumArt = document.querySelector('.album-art')
let playIcon = document.querySelector('.play-stop i')
let singerName = document.querySelector('.artist-name')
let songName = document.querySelector('.music-title')
let progressBar = document.querySelector('.progress-bar')


let isplaying = false
let songIndex = 0;
let index = 1;
let songs = [
    {
        name: 'Yohana',
        title: 'Helm',
        art: 'yohana' 
    },
    {
        name: 'Yohana',
        title: 'Berta',
        art: 'yohana' 
    },
    {
        name: 'Rophnan',
        title: 'Essey',
        art: 'rophnan' 
    },
    {
        name: 'Rophnan',
        title: 'Hamet',
        art: 'rophnan' 
    },
    {
        name: 'Yohana',
        title: 'May Kaja',
        art: 'yohana' 
    },
    {
        name: 'Yohana',
        title: 'Nabloda',
        art: 'yohana' 
    },
    {
        name: 'Rophnan',
        title: 'Senaye',
        art: 'rophnan' 
    },
    {
        name: 'Rophnan',
        title: 'yeamangu Quine',
        art: 'rophnan' 
    },
]
// numbers to choose songs randomly
let min = 0
let max = songs.length - 1;
let shuffle = false
random.addEventListener('click', ()=>{
    if(shuffle){
        shuffle = false
    }
    else{
        shuffle = true
    }
})
function loadSong(songIndex){
    music.src = `musics/${songs[songIndex].title}.mp3`
    singerName.textContent = `${songs[songIndex].name}`
    songName.textContent = `${songs[songIndex].title}`
    albumArt.src = `images/${songs[songIndex].art}.jpg`
}
function loadSongs(songIndex){
    music.src = `musics/${songs[songIndex].title}.mp3`
    singerName.textContent = `${songs[songIndex].name}`
    songName.textContent = `${songs[songIndex].title}`
    albumArt.src = `images/${songs[songIndex].art}.jpg`
    if(isplaying){
        music.play()
    }
}
function playMusic(e) {
    isplaying = true
    music.play()
    playIcon.classList.replace('fa-play', 'fa-pause')
    albumArt.classList.add('change')
    albumArt.style.animationPlayState = 'running';
}
function pauseMusic(e){
    isplaying = false
    music.pause()
    playIcon.classList.replace('fa-pause', 'fa-play')
    albumArt.style.animationPlayState = 'paused';
}
random.addEventListener('click', () =>{
    random.classList.toggle('change')
})
play.addEventListener('click', ()=>(isplaying ? pauseMusic() : playMusic()))
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    event.preventDefault(); // Prevent scrolling on space bar press
    play.click();
  }
});
next.addEventListener('click', () =>{
    if(songIndex == songs.length - 1){
        if(shuffle){
            songIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        else{
            songIndex = 0
        }
        loadSongs(songIndex)
    }
    else{
        if(shuffle){
            songIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        else{
            songIndex++
        }
        loadSongs(songIndex)
    }
})
prev.addEventListener('click', () =>{
    if(songIndex == 0){
        songIndex = songs.length - 1
        loadSongs(songIndex)
    }
    else{
        songIndex--
        loadSongs(songIndex)
    }
})

let length = document.querySelector('.duration')
let time = document.querySelector('.current-time')
music.addEventListener('timeupdate', (e) =>{
    const { duration, currentTime } = e.srcElement;
    let progressWidth = (currentTime/duration)*100
    progressBar.style.width = `${progressWidth}%`
    let len
    if(duration >= 60){
        let mint = Math.floor(duration/60)
        let sec = Math.floor(duration % 60)
        len = `${mint}:${sec}`
    }
    let t = currentTime
    let tt;
    if (t < 60){
        tt = t.toFixed(0)
        tt = `00:${tt}`

    }
    else {
        // console.log('t', t)
        // tt = (t/60).toFixed(2)
        const minutes = Math.floor(t / 60);
        const seconds = Math.floor(t % 60);
        tt = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    length.innerHTML = len
    time.innerHTML = tt
})
music.addEventListener('ended', ()=>{
    next.click()
})
// changing music current time using progress bar
let progressWrapper = document.querySelector('.progress-wrapper')
let barWidth = progressWrapper.offsetWidth

progressWrapper.addEventListener('click', (e)=>{
    let totalTime = music.duration
    let position = e.pageX - progressWrapper.offsetLeft
    let percentage = (position / barWidth) * 100
    progressBar.style.width = `${percentage}%`
    let newTime = (percentage/100)*totalTime
    music.currentTime = newTime
})
progressBar.addEventListener('drag', (e) =>{
    console.log('graged')
})
// volume button
let sliderWrapper = document.querySelector('.slider-wrapper')
let volumeInput = document.querySelector('.slider input')
let sliderValue = document.querySelector('.slider-value')
volume.addEventListener('click', (e)=>{
    sliderWrapper.classList.toggle('change')
})
volumeInput.addEventListener('input', (e)=>{
    sliderValue.innerText = volumeInput.value
    let = volumeCurrentAmount = (volumeInput.value/100).toFixed(1)
    music.volume = volumeCurrentAmount
})
// end of volume button
loadSong(songIndex)