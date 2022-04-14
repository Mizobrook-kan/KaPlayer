// var context = new AudioContext()



// var highShelf = context.createBiquadFilter()
// var lowShelf = context.createBiquadFilter()
// var highPass = context.createBiquadFilter()
// var lowPass = context.createBiquadFilter()

// // source.connect(highShelf)
// highShelf.connect(lowShelf)
// lowShelf.connect(highPass)
// highPass.connect(lowPass)
// lowPass.connect(context.destination)

// highShelf.type = 'highshelf'
// highShelf.frequency.value = 4700
// highShelf.gain.value = 50

// lowShelf.type = 'lowshelf'
// lowShelf.type = "lowshelf";
// lowShelf.frequency.value = 50

// var highshelf = new BiquadFilterNode(context, {type: 'highshelf' ,frequency: 50, gain: 50 })
// console.log(highshelf);

var animationId;
var playPause = document.querySelector('.play-pause-btn')


var HSF = document.querySelector('#highshelf-frequency')
var HSG = document.querySelector('#highshelf-gain')
var LSF = document.querySelector('#lowshelf-frequency')
var LSG = document.querySelector('#lowshelf-gain')
var HPF = document.querySelector('#highpass-frequency')
var HPQ = document.querySelector('#highpass-quality')
var LPF = document.querySelector('#lowpass-frequency')
var LPQ = document.querySelector('#lowpass-quality')
var currentTime = document.querySelector('.current-time')
var totalTime = document.querySelector('.total-time')
var canvas = document.getElementById('canvas')
let canvasContext = canvas.getContext('2d')
    // let HSNode = new BiquadFilterNode(audioContext, {type:'highshelf',frequency:0,gain:0})
    // let LSNode = new BiquadFilterNode(audioContext, {type: 'lowshelf', frequency:0,gain:0})
    // let HPNode = new BiquadFilterNode(audioContext,{type:'highpass',frequency:0,Q:0})
    // let LPNode = new BiquadFilterNode(audioContext,{type:'lowpass', frequency:0,Q:0})

// let myself = {};
function windowAudioContext() {
    //下面这些是为了统一Chrome和Firefox的AudioContext
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
    try {
        if (audioMap.has('audioContext')){
            return audioMap.get('audioContext')
        } else {
            let context = new AudioContext()
            audioMap.set('audioContext',context)
            console.log(audioMap);
        }
        
        // myself.audioContext = new AudioContext();
    } catch (e) {
        console.log('您的浏览器不支持 AudioContext,信息:' + e);
    }
}

var mediaElement = document.querySelector('audio')
var audioMap = new Map()
playPause.addEventListener('click', function () {
    const isPlaying = playPause.classList.contains('playing')
    const elem = playPause.querySelector('path')
    if (isPlaying) {
        mediaElement.pause()
        playPause.classList.remove('playing')
        playPause.classList.add('pause')
        elem.setAttribute('d', "M 18 12 L 0 24 V 0")
    } else {
        mediaElement.play()
        playPause.classList.remove('pause')
        playPause.classList.add('playing')
        elem.setAttribute('d', "M 0 0 h 6 v 24 H 0 Z M 12 0 h 6 v 24 h -6 Z")
    }
})
// mediaElement.addEventListener('durationchange',function(){
//     windowAudioContext()

// })
var hsfv = document.querySelector('.HSF-value')
var hsfg = document.querySelector('.HSG-value')
var lsfv = document.querySelector('.LSF-value')
var lsfg = document.querySelector('.LSG-value')
var hpfv = document.querySelector('.HPF-value')
var hpfq = document.querySelector('.HPQ-value')
var lpfv = document.querySelector('.LPF-value')
var lpfq = document.querySelector('.LPQ-value')

audioMap.set('HSFMode',null)
audioMap.set('HSGMode',null)
audioMap.set('LSFMode',null)
audioMap.set('LSGMode',null)
audioMap.set('HPFMode',null)
audioMap.set('HPQMode',null)

audioMap.set('LPFMode',null)
// TODO: 添加其他的
audioMap.set('LPQMode',null)


document.addEventListener('input',function(event){
    let context, HSNode, LSNode, HPNode, LPNode
    // let HSMode = null, LSMode = null, HPMode = null, LPMode = null
    if(event.target === HSF){
        if(audioMap.has('audioContext')){
            context = audioMap.get('audioContext')
            
            if(audioMap.has('HSNode')){
                HSNode = audioMap.get('HSNode')
                HSNode.frequency.value = HSF.getAttribute('value')
            } else {
                HSNode = context.createBiquadFilter()
                HSNode.type = 'highshelf'
                HSNode.frequency.value = HSF.getAttribute('value')
                audioMap.set('HSNode',HSNode)
            }           
            HSF.setAttribute('value',element.value)
            hsfv.innerHTML = HSF.value
        }
        
        audioMap.set('HSFMode',0b00000001)
        
        
    }
    if(event.target === HSG){
        if (audioMap.has('audioContext')) {
           context = audioMap.get('audioContext')
            if (audioMap.has('HSNode')) {
                HSNode = audioMap.get('HSNode')
                HSNode.gain.value = HSG.getAttribute('value')
            } else {
               HSNode = context.createBiquadFilter()
                HSNode.type = 'highshelf'
                HSNode.gain.value = HSG.getAttribute('value')
                audioMap.set('HSNode', HSNode)
            }
            hsfg.innerHTML = HSG.value
        }
        audioMap.set('HSGMode',0b00000010)
    }
    if(event.target === LSF){
        if (audioMap.has('audioContext')) {
            context = audioMap.get('audioContext')
            if (audioMap.has('LSNode')) {
               LSNode = audioMap.get('LSNode')
                LSNode.frequency.value = LSF.getAttribute('value')
            } else {
               LSNode = context.createBiquadFilter()
                LSNode.type = 'lowshelf'
                LSNode.frequency.value = LSF.getAttribute('value')
                audioMap.set('LSNode', LSNode)
            }
            lsfv.innerHTML = LSF.value
        }
        audioMap.set('LSFMode',0b00000100)
    }
    if(event.target === LSG){
        if (audioMap.has('audioContext')) {
            context = audioMap.get('audioContext')
            if (audioMap.has('LSNode')) {
               LSNode = audioMap.get('LSNode')
                LSNode.gain.value = LSG.getAttribute('value')
            } else {
                LSNode = context.createBiquadFilter()
                LSNode.type = 'lowshelf'
                LSNode.gain.value = LSG.getAttribute('value')
                audioMap.set('LSNode', LSNode)
            }
            lsfg.innerHTML = LSG.value
        }
        audioMap.set('LSGMode', 0b00001000)
    }
    if(event.target === HPF){
        if (audioMap.has('audioContext')) {
            context = audioMap.get('audioContext')
            if (audioMap.has('HPNode')) {
                HPNode = audioMap.get('HPNode')
                HPNode.frequency.value = HPF.getAttribute('value')
            } else {
                HPNode = context.createBiquadFilter()
                HPNode.type = 'highpass'
                HPNode.frequency.value = HPF.getAttribute('value')
                audioMap.set('HPNode', HPNode)
            }
            hpfv.innerHTML = HPF.value
        }
        audioMap.set('HPFMode', 0b00010000)
    }
    if(event.target === HPQ){
        if (audioMap.has('audioContext')) {
            context = audioMap.get('audioContext')
            if (audioMap.has('HPNode')) {
                HPNode = audioMap.get('HPNode')
                HPNode.Q.value = HPQ.getAttribute('value')
            } else {
                HPNode = context.createBiquadFilter()
                HPNode.type = 'highpass'
                HPNode.Q.value = HPQ.getAttribute('value')
                audioMap.set('HPNode', HPNode)
            }
            hpfq.innerHTML = HPQ.value
        }
        audioMap.set('HPQMode', 0b00100000)
    }
    if(event.target === LPF){
        if (audioMap.has('audioContext')) {
            context = audioMap.get('audioContext')
            if (audioMap.has('LPNode')) {
                LPNode = audioMap.get('LPNode')
                LPNode.frequency.value = LPF.getAttribute('value')
            } else {
                LPNode = context.createBiquadFilter()
                LPNode.type = 'lowpass'
                LPNode.frequency.value = LPF.getAttribute('value')
                audioMap.set('LPNode', LPNode)
            }
            lpfv.innerHTML = LPF.value
        }
        audioMap.set('LPFMode', 0b01000000)
    }
    if(event.target === LPQ){
        if (audioMap.has('audioContext')) {
            context = audioMap.get('audioContext')
            if (audioMap.has('LPNode')) {
                LPNode = audioMap.get('LPNode')
                LPNode.Q.value = LPQ.getAttribute('value')
            } else {
                LPNode = context.createBiquadFilter()
                LPNode.type = 'lowpass'
                LPNode.Q.value = LPQ.getAttribute('value')
                audioMap.set('LPNode', LPNode)
            }
            lpfq.innerHTML = LPQ.value
        }
        audioMap.set('LPQMode', 0b10000000)
    }
    let source = audioMap.get(mediaElement)
    let HSFMode = audioMap.get('HSFMode')
    let HSGMode = audioMap.get('HSGMode')
    let LSFMode = audioMap.get('LSFMode')
    let LSGMode = audioMap.get('LSGMode')
    let HPFMode = audioMap.get('HPFMode')
    let HPQMode = audioMap.get('HPQMode')
    let LPFMode = audioMap.get('LPFMode')
    let LPQMode = audioMap.get('LPQMode')
    let HSMode = HSFMode | HSGMode
    let LSMode = LSFMode | LSGMode
    let HPMode = HPFMode | HPQMode
    let LPMode = LPFMode | LPQMode
    switch(HSMode | LSMode | HPMode | LPMode){
        // case 
        case HPMode:
            {
                if(HPMode!=HPQMode){
                    source.connect(HPNode)
                    HPNode.connect(context.destination)
                }
                // switch(HPMode){
                //     case HPFMode:
                //         {
                //             source.connect(HPNode)
                //             HPNode.connect()
                //         }
                //     case HPQMode:
                //         {

                //         }    
                // }
            }
    }
    // if(){

    // }
})
mediaElement.addEventListener('play',function(){
//     console.log('一直调用play');
//    mediaElement.play()
    windowAudioContext()
    let source;
    var audioContext;
    if (audioMap.has('audioContext')) {
        audioContext = audioMap.get('audioContext')
        console.log(audioContext);
    } else {
        audioContext = windowAudioContext()
       
    }
    // var audioContext = myself.audioContext
    // console.log(audioContext);
    // TODO: 频繁connect
    if (audioMap.has(mediaElement)) {
        source = audioMap.get(mediaElement)
    }
    else {
        source = audioContext.createMediaElementSource(mediaElement)
        audioMap.set(mediaElement, source)
    }
    source.connect(audioContext.destination)
    if(!audioMap.has('Analyser')){
        audioMap.set('Analyser',new AnalyserNode(audioContext,{fftSize:64}))
    }
//    console.log('创建context');
})
function animate() {
    var analyser = audioMap.get('Analyser')
    var audioContext = audioMap.get('audioContext')
    var source = audioMap.get(mediaElement)
    source.connect(analyser)
    analyser.connect(audioContext.destination)
    // analyser.fftSize = 1024
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    const centered = audioContext.sampleRate / analyser.fftSize
    // const meter = 10
    // const barWidth = canvas.width / bufferLength
    let barHeight
    // let x = 0
    // TODO: canvas宽高，1000，500
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    analyser.getByteFrequencyData(dataArray)
    let gap = 10
    // canvasContext.strokeStyle = '#353535'
    // canvasContext.strokeWidth = 4
    // canvasContext.beginPath()
    let baseline = canvas.height -100
    
    // canvasContext.moveTo(0, baseline)
    // canvasContext.lineTo(canvas.width,baseline)
    // canvasContext.stroke()
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]
        let label = (i+1) * centered
        let string = `${label}Hz`
        canvasContext.save()
        canvasContext.font = '20px serif'
        canvasContext.strokeStyle = '#00001D'
        canvasContext.rotate(Math.PI / 2)
        canvasContext.fillText(string,baseline,-i*(25+10))
        canvasContext.restore()
        
        
        
        // console.log(string);
        // console.log(i*25,'  ', baseline+2*gap);
        // canvasContext.fillText(string,100,40)
        // canvasContext.fillText(string, i * (25 + 20),baseline+2*gap)
        // canvasContext.measureText(`{label}Hz`)
        // canvasContext.font = '18px'
        // canvasContext.strokeStyle = '#3366ff'
        // canvasContext.resetTransform()
        // canvasContext.fillText(`{label}Hz`, x, baseline+gap)
        barHeight = dataArray[i]
        
        canvasContext.fillStyle = '#DC704F'
        canvasContext.fillRect(i*(25+10), baseline - barHeight-gap, 25, barHeight)
        
    }
    animationId = requestAnimationFrame(animate)
}

mediaElement.addEventListener('loadeddata',function(){
    let duration = mediaElement.duration
    let min_d = isNaN(duration) === true ? '0' : Math.floor(duration/60)
    min_d = min_d < 10? '0' + min_d:min_d

    function get_sec_d(x){
        if(Math.floor(x) >= 60){
            for(var i=1;i<=60;++i){
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        } else {
            sec_d = (isNaN(duration) === true) ? '0' :
                Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }

    }
    get_sec_d(duration)
    totalTime.innerHTML = min_d + ':' + sec_d
})
// playing的时候就该开始调用动画效果
mediaElement.addEventListener('playing',function(){
    console.log(canvas.width); 
animate()
})
mediaElement.addEventListener('timeupdate', function(){
    let curTime = mediaElement.currentTime
    var sec;
    let min = (curTime == null) ? 0 :
        Math.floor(curTime / 60);
    min = min < 10 ? '0' + min : min;
    function get_sec(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }
    get_sec(curTime, sec);

    // change curTime DOM
    currentTime.innerHTML = min + ':' + sec;
})

mediaElement.addEventListener('pause',function(){
    window.cancelAnimationFrame(animationId)
})
// mediaElement.addEventListener('loadeddata',function(){
//     console.log('开始这个时间');
    
// })






// mediaElement.addEventListener('click',function(){
//     console.log(mediaElement);
//     if(mediaElement.played){
//         mediaElement.pause()
        
//     } else {
//        windowAudioContext()
//        var audioContex = myself.audioContex
        
//         let source = audioContex.createMediaElementSource(mediaElement)

//         mediaElement.play()    
//         let HSNode = audioContex.createBiquadFilter()
//         HSNode.type = 'highshelf'
//         let LSNode = audioContex.createBiquadFilter()
//         LSNode.type = 'lowshelf'
//         let HPNode = audioContex.createBiquadFilter()
//         HPNode.type = 'highpass'
//         let LPNode = audioContex.createBiquadFilter()
//         LPNode.type = 'lowpass'

//         HSF.addEventListener('input', function () {
//             HSNode.frequency.value = HSF.getAttribute('value')
//         })

//         HSG.addEventListener('input', function () {
//             HSNode.gain.value = HSG.getAttribute('value')
//         })

//         LSF.addEventListener('input', function () {
//             LSNode.frequency.value = LSF.getAttribute('value')
//         })
//         LSG.addEventListener('input', function () {
//             LSNode.gain.value = LSG.getAttribute('value')
//         })
//         HPF.addEventListener('input', function () {
//             HPNode.frequency.value = HPF.getAttribute('value')
//         })
//         HPQ.addEventListener('input', function () {
//             HPNode.Q.value = HPQ.getAttribute('value')
//         })
//         LPF.addEventListener('input', function () {
//             LPNode.frequency.value = LPF.getAttribute('value')
//         })
//         LPQ.addEventListener('input', function () {
//             LPNode.Q.value = LPQ.getAttribute('value')
//         })

//         console.log(HSNode);
//         console.log(LSNode);
//         console.log(HPNode);
//         console.log(LPNode);
//         source.connect(HSNode)
//         HSNode.connect(LSNode)
//         LSNode.connect(HPNode)
//         HPNode.connect(LPNode)
//     }
    
// })

// mediaElement.addEventListener('canplay',function(){
//     console.log('audio player can play');
// })