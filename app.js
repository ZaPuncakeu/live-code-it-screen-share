const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

io.on('connection', socket => {
    console.log("new client connected")
    socket.on('offer', offerDescription => {
        socket.broadcast.emit('offer', offerDescription)
    })

    socket.on('answer', answerDescription => {
        socket.broadcast.emit('answer', answerDescription);
    })
})

server.listen(3000, console.log('Server on port 3000'));