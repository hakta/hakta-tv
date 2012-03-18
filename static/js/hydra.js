function set_current(path){
    var extension = Modernizr.video.h264 ? 'mp4': 
                    Modernizr.video.webm ? 'webm': 
                                           'mp4';    
    current = path;
    source.src = path + "." + extension;
    source.type = "video/" + extension;
    player.load();
}

function first(){
    set_current(playList[0])
    player.play();
}

function next(){
    var index = playList.indexOf(current);
    if (index == playList.length-1){ // end of play list?
        path = playList[0];
    } else {
        // next video
        path = playList[index+1];
    }

    set_current(path);
    player.play();    
}

function set(data){
    // dont net to update if is same play list
    if (!$(playList).compare(data['list'])) {
        playList = data['list'];
        first();
    }
}

function main(uri){
    playList = null;
    current = null;

    player = $('#videoPlayer')[0];
    source = $('#videoSource')[0];    

    var socket = io.connect(uri);
    socket.on('set', function (data) {
        set(data);
    });

    player.onended = function(){
        // play next vido
        next();
    }
};