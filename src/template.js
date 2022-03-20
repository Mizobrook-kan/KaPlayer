class Template {
    constructor(options) {
        this.container = options.container
        // this.options = options
        // this.playlist = 
        this.init()
    }

    init() {
        let cover = '';
        // this.options.playlist
       
        if (this.options.playlist.length) {
            cover = this.options.playlist[0].cover
        }



        this.container.innerHTML = `<figure class="kaplayer-body" id="kaplayer-body">
                                       <audio id="audio"></audio>
                                       <div id="audio-controls" class="controls">
                                           <div class="music-info">
                                               <span class="music-title"></span>
                                               <span class="playback-duration">
                                                   <time class="playback-time">00:00</time> / <time class="duration">00:00</time>
                                               </span>
                                               <div class="progress-container" id="progress-container">
                                                   <div class="progress" id="progress"></div>
                                               </div>
                                           </div>
                                           <div class="img-container">
                                               <img alt="music-cover" id="cover" src=${cover}/>
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
                                       </div>
                                    </figure>`
                                    
        // this.player.music = {
        //     img: this.container.querySelector('#cover'),
        //     audio: this.container.querySelector('#audio'),
        //     title: this.container.querySelector('#title'),

        // }                            
        // this.template.img = this.container.querySelector('#cover')
        // this.template.audio = 
        // const prevBtn = this.container.querySelector('#prev')
        // const nextBtn = this.container.querySelector('#next')
        // prevBtn.addEventListener('click', (event) => {

        // })
        // nextBtn.addEventListener('click', (event) => {

        // })
        // this.playPauseBtn = this.container.querySelector('')
    }

    getElement(className) {
        return this.container.querySelector(className)
    }
}

export default Template