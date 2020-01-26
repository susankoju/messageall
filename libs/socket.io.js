
const cors = require('cors');
const app = require('express')();
app.use(cors()); //allow everything
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('socketio', io)

io.sockets.on('connection', (socket) => {
    console.log('Client connected to socket: ' + socket.id);
})

module.exports=  io;