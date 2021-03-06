class Controller {
    constructor(template, playlist) {
        
        // console.log(player)
        // this.playpauseBtn = player.container.querySelector('#playpause')
        // this.prevBtn = player.container.querySelector('#prev')
        // this.nextBtn = player.container.querySelector('#next')
        // this.player_body = player.container.querySelector('#kaplayer-body')
        // this.audio = player.container.querySelector('#audio')
        // this.progressContainer = player.container.querySelector('#progress-container')
        this.playpauseBtn = template.getElement('#playpause')
        this.player_body = template.getElement('#kaplayer-body')
        this.playlist = playlist

        this.btnEvents()
    }

    switch(index) {

    }
    // playSong() {
    //     this.player_body.classList.add('playing')
    //     this.playpauseBtn.querySelector('i.fas').classList.remove('fa-play')
    //     this.playpauseBtn.querySelector('i.fas').classList.add('fa-pause')

    //     this.audio.play()
    // }

    // pauseSong() {
    //     this.player_body.classList.remove('playing')
    //     this.playpauseBtn.querySelector('i.fas').classList.add('fa-play')
    //     this.playpauseBtn.querySelector('i.fas').classList.remove('fa-pause')

    //     this.audio.pause()
    // }

    btnEvents() {
        this.playpauseBtn.addEventListener('click', () => {
            
            const isPlaying = this.player_body.classList.contains('playing')

            if (isPlaying) {
                this.pauseSong()
            } else {
                this.playSong()
            }
        })

        this.prevBtn.addEventListener('click', () => {
            let nextIndex = this.list.index - 1
            let index = nextIndex < 0 ? this.list.audios.length - 1 : nextIndex
            this.list.switch(index)
            this.playSong()
        })

        this.nextBtn.addEventListener('click', () => {
            let nextIndex = this.list.index + 1
            let index = nextIndex > this.list.audios.length - 1 ? 0 : nextIndex
            this.list.switch(index)
            this.playSong()
        })

        this.progressContainer.addEventListener('click', (e) => {
            const width = this.progressContainer.clientWidth
            const clickX = e.offsetX
            const duration = this.audio.duration

            this.audio.currentTime = (clickX / width ) * duration
        })
    }
}

export default Controller