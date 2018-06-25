import React, { Component } from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

class chat extends Component {

  constructor() {
    super();

    this.state = {
      chat: []
    }
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