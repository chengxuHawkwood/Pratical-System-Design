module.exports = (app)=>{

    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    server.listen(80);

    io.on('connection', function (socket) {
        console.log('connected');
        socket.emit('message recived', { hello: 'another' });
        socket.on('userInfo', (user)=>{console.log(user);console.log(socket.id)});
        console.log('sent')
        socket.on('new message', function (data) {
            console.log('receive');
        });
        socket.on('disconnect', function () {
            io.emit('user disconnected');
        });
    });
}
