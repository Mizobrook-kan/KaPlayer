class Controller {
    constructor(player, list) {
        // console.log(player)
        this.playBtn = player.container.querySelector('#play')
        this.prevBtn = player.container.querySelector('#prev')
        this.nextBtn = player.container.querySelector('#next')
        this.player_body = player.container.querySelector('#kaplayer-body')
        this.audio = player.container.querySelector('#audio')
        this.progressContainer = player.container.querySelector('#progress-container')
        this.list = list

        this.btnEvents()
    }

    
    playSong() {
        this.player_body.classList.add('play')
        this.playBtn.querySelector('i.fas').classList.remove('fa-play')
        this.playBtn.querySelector('i.fas').classList.add('fa-pause')

        this.audio.play()
    }

    pauseSong() {
        this.player_body.classList.remove('play')
        this.playBtn.querySelector('i.fas').classList.add('fa-play')
        this.playBtn.querySelector('i.fas').classList.remove('fa-pause')

        this.audio.pause()
    }

    btnEvents() {
        this.playBtn.addEventListener('click', () => {
            
            const isPlaying = this.player_body.classList.contains('play')

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