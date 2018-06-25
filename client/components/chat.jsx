import React, { Component } from 'react';

class chat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      name: ''
    }

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  sendMessage(message) {
    message.preventDefault();
    this.props.socket.emit('new message', this.state.message);
  }

  render() {
    return (
      <div className='chatBox'>
        <form onSubmit={this.sendMessage}>
          <div className='chatTitle'>
            <h1>TheChatArea</h1>
          </div>
          <div className='messagesArea'>
            {this.props.messages.map((message) => {
              console.log('Anything', message)
              return (
                <div className='aMessage'>
                  {message.message}
                </div>
              )
            })}
          </div>
          <div className='enterMessage'>
            <textarea className='typeMessage' value={this.state.message} onChange={this.handleChange} />
            <input type='submit' value='Submit' />
          </div>
        </form>
      </div>
    );
  }
} 

export default chat;