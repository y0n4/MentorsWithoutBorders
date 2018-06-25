const sendMessages = (whereToSend, socket) => {
  return socket.emit(whereToSend, { hello: 'world' })
};

module.exports = {
  sendMessages: sendMessages,

}