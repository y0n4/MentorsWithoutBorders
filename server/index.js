const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;
const data = require('../database');

io.on('connection', socket => {
  console.log('New client connected')
  socket.emit('test', { hello: 'world'});
});

app.use(express.static(__dirname + '/../client/dist'));

server.listen(port, function () {
  console.log(`Listening on port: ${port}`)
});

