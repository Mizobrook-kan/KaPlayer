import utils from './utils';
import * as selector from './selector'

class KaPlayer {
    /**
     * @param {Object} object
     * @constructor
     */
    constructor(options) {
        var musicConf = options.music,
         target = selector.$(options.container),
            playerHTMLContent = `<figure class="kaplayer-body" id="kaplayer-body">
                                           <div class="music-info">
                                               <span class="music-title">${musicConf.name}</span>
                                               <span class="playback-duration">
                                                   <time class="playback-time">00:00</time> / <time class="duration">00:00</time>
                                               </span>
                                               <div class="progress-container" id="progress-container">
                                                   <div class="progress" id="progress"></div>
                                               </div>
                                           </div>
                                           <audio id="audio" src="${musicConf.url}" preload="auto"></audio>
                                           <div class="img-container">
                                               <img alt="music-cover" id="cover" src="${musicConf.cover}" class="music-cover"/>
                                           </div>
                                           <div class="navigation">
                                               <button id="prev" class="action-btn">
                                                   <i class="fas fa-backward"></i>
                                               </button>
                                               <button id="playpause" class="action-btn action-btn-big">
                                                   <i class="fas fa-play"></i>
                                               </button>
                                               <button id="next" class="action-btn">
                                                   <i class="fas fa-forward"></i>
                                               </button>
                                           </div>
                                </figure>`
        target.innerHTML = playerHTMLContent                              
        

        let kaplayerContainer = target.querySelector('.kaplayer-body')
        this.audio = kaplayerContainer.querySelector('audio')
        this.playBtn = kaplayerContainer.querySelector('#playpause')
        this.prevBtn = kaplayerContainer.querySelector('#prev')
        this.nextBtn = kaplayerContainer.querySelector('#next')
        this.progress = kaplayerContainer.querySelector('#progress')
        
        this.kaplayerContainer = kaplayerContainer
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
            
        })
        // this.audio.addEventListener('timeupdate', DurTime)
        this.audio.addEventListener('timeupdate', () => {
            const currentTime = utils.secondToTime(this.audio.currentTime)
            let playBackTime = this.kaplayerContainer.querySelector('.playback-time')
            if (playBackTime.innerHTML !== currentTime) {
                playBackTime.innerHTML = currentTime
            }
        })
        this.audio.addEventListener('durationchange', () => {
            let dtime = this.kaplayerContainer.querySelector('.duration')
            
            dtime.innerHTML = utils.secondToTime(isNaN(this.audio.duration) ? 0 : this.audio.duration)
            
        })
        this.playBtn.addEventListener('click', () => {

            if (this.audio.paused) {
                this.kaplayerContainer.classList.add('playing')

                this.playBtn.querySelector('i.fas').classList.remove('fa-play')
                this.playBtn.querySelector('i.fas').classList.add('fa-pause')
                this.audio.play()

            } else {
                this.kaplayerContainer.classList.remove('playing')
                this.playBtn.querySelector('i.fas').classList.add('fa-play')
                this.playBtn.querySelector('i.fas').classList.remove('fa-pause')
                this.audio.pause()
            }
        })
    }
}

export default KaPlayer