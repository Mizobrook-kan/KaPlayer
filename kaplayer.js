import Promise from "promise-polyfill";

// import utils from './utils';
// import Controller from './controller';
import handleOption from './options'
// import Timer from './timer';
// Update progress bar
// function updateProgress(e) {
//     const { duration, currentTime } = e.srcElement;
//     const progressPercent = (currentTime / duration) * 100;
//     progress.style.width = `${progressPercent}%`;
// }

// Next song
// function nextSong() {
//     songIndex++;

//     if (songIndex > songs.length - 1) {
//         songIndex = 0;
//     }

//     loadSong(songs[songIndex]);

//     playSong();
// }

// function DurTime(e) {
//     const { duration, currentTime } = e.srcElement;
//     var sec;
//     var sec_d;

//     // define minutes currentTime
//     let min = (currentTime == null) ? 0 :
//         Math.floor(currentTime / 60);
//     min = min < 10 ? '0' + min : min;

//     // define seconds currentTime
//     function get_sec(x) {
//         if (Math.floor(x) >= 60) {

//             for (var i = 1; i <= 60; i++) {
//                 if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
//                     sec = Math.floor(x) - (60 * i);
//                     sec = sec < 10 ? '0' + sec : sec;
//                 }
//             }
//         } else {
//             sec = Math.floor(x);
//             sec = sec < 10 ? '0' + sec : sec;
//         }
//     }

//     get_sec(currentTime, sec);

//     // change currentTime DOM
//     currTime.innerHTML = min + ':' + sec;

//     // define minutes duration
//     let min_d = (isNaN(duration) === true) ? '0' :
//         Math.floor(duration / 60);
//     min_d = min_d < 10 ? '0' + min_d : min_d;


//     function get_sec_d(x) {
//         if (Math.floor(x) >= 60) {

//             for (var i = 1; i <= 60; i++) {
//                 if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
//                     sec_d = Math.floor(x) - (60 * i);
//                     sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
//                 }
//             }
//         } else {
//             sec_d = (isNaN(duration) === true) ? '0' :
//                 Math.floor(x);
//             sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
//         }
//     }

//     // define seconds duration

//     get_sec_d(duration);

//     // change duration DOM
//     durTime.innerHTML = min_d + ':' + sec_d;
// }

class KaPlayer {
    /**
     * @param {Object} object
     * @constructor
     */
    constructor(options) {
        // TODO: options seems not to deal with multiple audios
        this.options = handleOption(options);
        this.container = this.options.container;
        this.paused = true;
        this.playedPromise = Promise.resolve();
        this.mode = 'normal';

        this.container.classList.add('kaplayer');
        if (this.options.lrcType) {
            this.container.classList.add('lyric')
        }
        
        // save lyric
        
        let playerHTMLContent = `
        <div class="kaplayer-body" id="kaplayer-body">
    <div class="music-info">
        <h4 id="title"></h4>
        <span class="time-inner">
            <span class="ptime">00:00</span> / <span class="dtime">00:00</span>
        </span>
        <div class="progress-container" id="progress-container">
            <div class="progress" id="progress"></div>
        </div>
    </div>

    <audio src="music/The Hardest Mistakes.mp3" id="audio"></audio>

    <div class="img-container">
        <img src="images/The Hardest Mistakes.jpg" alt="music-cover" id="cover" />
    </div>
    <div class="navigation">
        <button id="prev" class="action-btn">
            <i class="fas fa-backward"></i>
        </button>
        <button id="play" class="action-btn action-btn-big">
            <i class="fas fa-play"></i>
        </button>
        <button id="next" class="action-btn">
            <i class="fas fa-forward"></i>
        </button>
    </div>
</div>`

this.container.innerHTML = playerHTMLContent
        // this.list = options.audios;
        // TODO: multiple audios management array
        this.list = new List(this)
        this.audio = this.container.getElementByTagName('audio')
        // this.progress = this.container.getElementById('progress')
        // this.events = new Events()
        // this.controller = new Controller(this)
        // this.playBtn = this.container.getElementById('play')
        // this.prevBtn = this.container.getElementById('prev')
        // this.nextBtn = this.container.getElementById('next')

        this.controller = new Controller(this, this.list)
        
        // this.initAudio()
        this.bindEvents()
    }

    bindEvents() {
        

        this.audio.addEventListener('timeupdate', (e) => {
            const { duration, currentTime } = e.srcElement
            const progressPercent = (currentTime / duration) * 100
            this.progress.style.width = `${progressPercent}%`
        })
        // this.audio.addEventListener('ended', nextSong)
        this.audio.addEventListener('ended', () => {
            if(this.list.index < this.list.audios.length -1){
                this.list.switch((this.list.index+1) %this.list.audios.length)
                this.audio.play()
            } else {
                this.list.switch((this.list.index+1)%this.list.audios.length)
                this.audio.pause()
            }
        })
        // this.audio.addEventListener('timeupdate', DurTime)
        this.audio.addEventListener('timeupdate', () => {
            const currentTime = utils.secondToTime(this.audio.currentTime)
            let ptime = this.container.getElementByClassName('ptime')
            if(ptime.innerHTML !== currentTime) {
                ptime.innerHTML = currentTime
            }
        })
        this.audio.addEventListener('durationchange', () => {
            let dtime = this.container.getElementByClassName('dtime')
            dtime.innerHTML = utils.secondToTime(this.duration)
            
        })

    }

    setAudio(audio) {
        this.audio.src = audio.url
    }
    // function pauseSong() {
    //     this.container.getElementById('kaplayer-body').classList.remove('play')
    //     this.playBtn.querySelector('i.fas').classList.add('fa-play')
    //     this.playBtn.querySelector('i.fas').classList.remove('fa-pause')

    //     this.audio.pause()
    // }

    // btnEvents() {
    //     this.playBtn.addEventListener('click', () => {
    //         let player_body = this.container.getElementById('kaplayer-body')
    //         const isPlaying = player_body.classList.contains('play')

    //         if(isPlaying) {
    //             pauseSong()
    //         } else {
    //             playSong()
    //         }
    //     })
    // }
    get progress() {
        return this.container.getElementById('progress')
    }
    get duration() {
        return isNaN(this.audio.duration) ? 0 : this.audio.duration;
    }
    // initAudio() {
    //     this.audio = document.createElement('audio')
        
    //     for(let i = 0;i<this.events.audioEvents.length; i++) {
    //         this.audio.addEventListener(this.events.audioEvents[i], (e) => {
    //             this.events.trigger(this.events.audioEvents[i], e)
    //         })
    //     }
    // }
}

export default KaPlayer