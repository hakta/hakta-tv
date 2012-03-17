var playList;

function play(){
    player = $('#videoPlayer')[0];
    source = $('#videoSource')[0];    

    source.src = playList[0];
    player.load();
    player.play();

    player.onended = function(){
        var current = playList.indexOf(parseUri(source.src).path);
        if (current == playList.lenght){
            source.src = playList[0];
        } else {
            source.src = playList[current+1];
        }
        
        player.load();
        player.play();
    }
}

function main(uri){
    var socket = io.connect(uri);
    socket.on('set', function (data) {
        if (!$(playList).compare(data['list'])) {
            playList = data['list'];
            play();
        }            
    });
};