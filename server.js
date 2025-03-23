const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    
    socket.on('message', (msg) => {
        console.log('收到訊息: ' + msg);
        socket.emit('message', '這是伺服器回應的訊息');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = process.env.PORT || 10000;
server.listen(port, () => {
    console.log(`伺服器運行在端口 ${port}`);
});
