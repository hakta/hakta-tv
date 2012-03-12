var io = require('socket.io').listen(8080);

var videoSourceList = [
    "static/big_buck_bunny_640x360_2.28.webm", 
    "static/sintel_640x360_2.28.webm",
    //"static/elephants_dream_640x360_2.30.webm"
];

io.sockets.on('connection', function (socket) {
    //socket.on('init', function (data) {
    //    console.log(data);
    //    socket.emit('set', {list: videoSourceList});
    //});
    socket.emit('set', {list: videoSourceList});
    console.log('connection');
});
