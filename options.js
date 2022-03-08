export default (options) => {
    console.log(options)
    const defaultOption = {
        container: options.element || document.getElementsByClassName('kaplayer')[0],
        lrcType: options.showlrc || options.lrc || 0,
        preload: 'metadata',
        volumn: 0.7,
        // audio: options.music || [],
        storageName: 'kaplayer-setting',
    }
    for (const defaultKey in defaultOption) {
        if (defaultOption.hasOwnProperty(defaultKey) && !options.hasOwnProperty(defaultKey)) {
            options[defaultKey] = defaultOption[defaultKey];
        }
    }

    if (Object.prototype.toString.call(options.audio) !== '[object Array]') {
        options.audio = [options.audio];
    }

    // options.audio.map((item) => {
    //     item.name = item.name || item.title || 'Audio name';
    //     item.artist = item.artist || item.author || 'Audio artist';
    //     item.cover = item.cover || item.pic;
    //     item.type = item.type || 'normal';
    //     return item;
    // });
}