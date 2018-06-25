const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sendMessages = require('./emits/emit').sendMessages;

const app = express();
const server = http.Server(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;
const data = require('../database');

io.on('connection', socket => {
  sendMessages('test', socket);
});

app.use(express.static(__dirname + '/../client/dist'));

server.listen(port, function () {
  console.log(`Listening on port: ${port}`)
});

