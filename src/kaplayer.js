import Promise from "promise-polyfill";

// import utils from './utils';
// import Controller from './controller';
import handleOption from './options'
import List from './list'
import "./index.css"

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
        // if (this.options.lrcType) {
        //     this.container.classList.add('lyric')
        // }
        
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

    <audio id="audio"></audio>

    <div class="img-container">
        <img alt="music-cover" id="cover" />
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
        // this.audio = this.container.getElementByTagName('audio')
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
    
    get progress() {
        return this.container.getElementById('progress')
    }
    get duration() {
        return isNaN(this.audio.duration) ? 0 : this.audio.duration;
    }
    get img() {
        return this.container.getElementById('cover')
    }
    get audio() {
        return this.container.getElementByTagName('audio')
    }
    
}

export default KaPlayer