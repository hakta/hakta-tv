var io = require('socket.io').listen(8080);

var videoSourceList = [
    "/media/big_buck_bunny_640x360_2.28.webm", 
    "/media/sintel_640x360_2.28.webm",
    "/media/elephants_dream_640x360_2.30.webm"
];

io.sockets.on('connection', function (socket) {
    socket.emit('set', {list: videoSourceList});
});
