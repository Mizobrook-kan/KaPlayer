import utils from './utils'

class List {
    constructor(player) {
        this.player = player
        this.index = 0
        this.audios = player.options.audio;

        // this.bindEvents()
    }

    // bindEvents() {
// 
    // }
    switch(index) {
        if(typeof index !== 'undefined' && this.audios[index]) {
            this.index = index

            const audio = this.audios[this.index];
            // let cover = this.player.container.getElementById('cover')
            // let title = this.player.container.getElementById('title')
            // this.player.container.getElementById('audio').src = `music/${audio.name}`
            // this.player.container.getElementById('cover').src = `images/${audio.cover}`
            this.player.img.hasAttribute("src") ? this.player.img.src = `${audio.cover}` : this.player.img.setAttribute("src", audio.cover)
            this.player.audio.hasAttribute("src") ? this.player.audio.src = `${audio.url}` : this.player.audio.setAttribute("src", audio.url)
            this.player.container.querySelector('#title').innerText = audio.name

            this.player.setAudio(audio)

            this.player.container.querySelector('.dtime').innerHTML = utils.secondToTime(this.player.duration)
            
        }
    }

    get index() {
        return this.index
    }
}

export default List