const mongoose = require('mongoose');
const Thread = mongoose.model('threads');
module.exports = (app, redisclient)=>{

    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    server.listen(80);

    io.on('connection', function (socket) {
        socket.emit('message recived', { hello: 'another' });
        socket.on('userInfo', async (user)=>{
            await redisclient.setAsync(user._id+' socketid', socket.id);
        });
        socket.on('logout', async (user)=>{
            await redisclient.delAsync(user._id+' socketid');
        });
        socket.on('new message', async (threadid)=>{
            const thread = await Thread.findById(threadid);
            for(var i=0;i<thread.participants.length;i++){
                const socket_id = await redisclient.getAsync(thread.participants[i]+' socketid');
                if(socket_id!=null) io.sockets.connected[socket_id].emit('updateNow', "");
            }
            
        });
        socket.on('disconnect', function () {
            io.emit('user disconnected');
        });
    });
}
