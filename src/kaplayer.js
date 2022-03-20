import Promise from "promise-polyfill";

import utils from './utils';
import Controller from './controller';
import handleOption from './options'
import List from './list'
import Template from './template'

import * as selector from './selector'
import { Result } from "postcss";

// const createPlayListProxy = (obj) => {
//     return new Proxy(obj, {
//         set(target, property, value) {
//             if (typeof property !== 'undefined' && target[property]) {
//                 target[property] = value
//             }
//             // target[property] = value
//             playSong()
//         },
//         // apply: function(target, thisArg, argumentsList) {
//         //     console.log(target);
//         //     target(argumentsList[0])
//         // }
//     })
// }



// // function switchSong(index) {
// //     if (typeof index !== 'undefined' && this.audios[index]) {

// //     }
// // }
// // TODO: 我这个添加事件监听只能在 播放器里完成
// prevBtn.addEventListener('click', () => {
//     // playlist.index = this.playlist.index - 1
    
//     let nextIndex = this.playlist.index - 1
//     let index = nextIndex < 0 ? this.playlist.audios.length - 1 : nextIndex
//     this.playlist.index = index
//     // this.playSong()
// })
// nextBtn.addEventListener('click', () => {
//     let nextIndex = this.playlist.index + 1
//     let index = nextIndex > this.playlist.audios.length - 1 ? 0 : nextIndex
//     this.playlist.index = index
//     // this.playSong()
// })



class KaPlayer {
    /**
     * @param {Object} object
     * @constructor
     */
    constructor(options) {
        
        // TODO: 需要一个参数表示是双语双行显示，单行显示
        let kaplayerContainer = this.initHTML(options)
        console.log(kaplayerContainer.querySelector);
        // console.log(kaplayerContainer.toString);
        [this.audio, this.playBtn, this.prevBtn, this.nextBtn, this.progress] = 
            [kaplayerContainer.querySelector('audio'), kaplayerContainer.querySelector('#playpause'), kaplayerContainer.querySelector('#prev'), kaplayerContainer.querySelector('#next'), kaplayerContainer.querySelector('#progress')]
        this.lrc = kaplayerContainer.querySelector('.lyric-area')

        this.kaplayerContainer = kaplayerContainer
        let haslyric = options.music.lrc ? true : false
        // TODO: object的has方法检查
        if(haslyric) {
            this.lyricParse(options.music.lrc)
        }

        this.playBtn.addEventListener('click', () => {

            if(this.audio.paused){
                // console.log(this.icon);
                
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
        
        this.bindEvents()
    }
    
    initHTML(options) {
        var {url, name, cover} = options.music
        // console.log(musicConf);
        // console.log(url,name,cover);
        let container = selector.$(options.container) || document.querySelector('.kaplayer')
        container.innerHTML = `<figure class="kaplayer-body" id="kaplayer-body">
                                           <div class="music-info">
                                               <span class="music-title">${name}</span>
                                               <span class="playback-duration">
                                                   <time class="playback-time">00:00</time> / <time class="duration">00:00</time>
                                               </span>
                                               <div class="progress-container" id="progress-container">
                                                   <div class="progress" id="progress"></div>
                                               </div>
                                           </div>
                                           <audio id="audio" src="${url}" preload="auto"></audio>
                                           <div class="img-container">
                                               <img alt="music-cover" id="cover" src="${cover}" class="music-cover"/>
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
                                           <div class="lyric">
                                             <div class="lyric-area"></div>
                                           </div>
                                    </figure>`
        return container.querySelector('.kaplayer-body')
                                }

    lyricParse(lrc) {
        if(lrc) {
            let request = new XMLHttpRequest()
            request.open("GET", lrc)
            request.send()
            request.addEventListener('load', (event) => {
                let lyric = request.response
                console.log(lyric);
                var length = lyric.length
                // 去掉翻译贡献者
                // TODO: support more language
               // TODO: 或者我保留翻译贡献者
                let translator = /^\[by:[\u4e00-\u9fa5a]*\](\r\n|\r|\n)/g
                // lyric = lyric.replace(translator,'')
                console.log(lyric);
                // 匹配时间
                var reg1 = /\[(\d{2}):(\d{2})\.(\d{2,3})]/g
                // var time = lyric.match(reg1)
                // console.log(time);
                // lyric = lyric.replace(reg1, '').replace(/^\s+|\s+$/g, '')
                // console.log(lyric);
                // 去掉换行符
                let rn = /\r\n|\r|\n/g
                lyric = lyric.split(rn)
                console.log(lyric);
                // console.log(typeof lyric);
               for(let i =0; i< length; ++i) {
                   // TODO: 我想直接要字符串，不要数组
                   let time = lyric[i].match(reg1)
                    console.log(time);
                  let lrcText = lyric[i].replace(reg1, '').replace(/^\s+|\s+$/g, '').replace(/^\s+|\s+$/g, '')
                  console.log(lrcText);
               } 
            })
            
            request.addEventListener('error', () => {
                console.log(`LRC file request fails: status ${request.status}`);
            })
            // lyric.parse(lrc).renderTo(lyricArea)
        }
        
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
            // let dtime = this.container.querySelector('.dtime')
            let dtime = this.kaplayerContainer.querySelector('.duration')
            // let dtime = selector.init(kaplayerContainer).select([
                // 'duration'
            // ])
            // console.log(dtime);
            dtime.innerHTML = utils.secondToTime(isNaN(this.audio.duration) ? 0 : this.audio.duration)
            
        })

    }

    // get kaplayerContainer() {
    //     return this.kaplayerContainer
    // }
    // setAudio(audio) {
    //     this.audio.src = audio.url
    // }
    
    // updateUI() {
    //     if(this.paused) {
    //         this.template.getElement('#kaplayer-body').classList.remove('playing')
    //         this.template.getElement('i.fas').classList.add('fa-play')
    //         this.template.getElement('i.fas').classList.remove('fa-pause')
    //         this.audio.pause()

    //     } else {
    //         this.template.getElement('#kaplayer-body').classList.add('playing')
    //         this.template.getElement('i.fas').classList.remove('fa-play')
    //         this.template.getElement('i.fas').classList.add('fa-pause')
    //         this.audio.play()
    //     }
    // }
    // set paused(boolean) {
    //     this.paused = boolean
    //     this.updateUI()
    // }
    // get progress() {
    //     return this.container.querySelector('#progress')
    // }
    // get duration() {
    //     return isNaN(this.audio.duration) ? 0 : this.audio.duration;
    // }
    // get img() {
    //     return this.container.querySelector('#cover')
    // }
    // get audio() {
    //     return this.container.querySelector('#audio')
    // }

//     playSong() {
//     // container.querySelector('#kaplayer-body').classList.add('playing')
//     // container.querySelector('#playpause').querySelector('i.fas').classList.remove('fa-play')
//     const audio = this.playlist.audios[this.playlist.index];
//     // let cover = this.player.container.getElementById('cover')
//     // let title = this.player.container.getElementById('title')
//     // this.player.container.getElementById('audio').src = `music/${audio.name}`
//     // this.player.container.getElementById('cover').src = `images/${audio.cover}`
//     this.template.img.hasAttribute("src") ? this.template.img.src = `${audio.cover}` : this.template.img.setAttribute("src", audio.cover)
//     this.template.audio.hasAttribute("src") ? this.template.audio.src = `${audio.url}` : this.template.audio.setAttribute("src", audio.url)
//     this.template.container.querySelector('#title').innerText = audio.name

//     this.template.setAudio(audio)

//     this.template.container.querySelector('.dtime').innerHTML = utils.secondToTime(this.template.duration)
// }
    
}

export default KaPlayer