const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const socketFuncs = require('./socketFuncs/funcs');
const exampleData = require('./exampleData').exampleMessages;

const app = express();
const server = http.Server(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;
const data = require('../database');

io.on('connection', socket => {
  socket.emit('get message', exampleData);
  socket.on('new message', (message) => {
    exampleData.push({
      name: 'Kav',
      message: message
    });

    socket.broadcast.emit('get message', exampleData);
  })
});

app.use(express.static(__dirname + '/../client/dist'));

server.listen(port, function () {
  console.log(`Listening on port: ${port}`)
});

