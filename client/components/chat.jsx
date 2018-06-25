import React, { Component } from '../../../../../../.cache/typescript/2.9/node_modules/@types/react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

class chat extends Component {

  constructor() {
    super();

    this.state = {
      chat: []
    }

    socket.on('test', (data) => {
      this.setState({
        chat: data
      })
    })
  }

  render() {
    return (
      <div>
        This is the chat
      </div>
    );
  }
} 

export default chat;