const getMessages = (action, socket, messages) => socket.on(action, { hello: 'world' });

const sendMessage = (action, message, socket) => socket.broadcast.emit(action, {
  message,
});

module.exports = {
  getMessages,
  sendMessage,
};
