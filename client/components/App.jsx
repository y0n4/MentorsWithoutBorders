import React from 'react';
import Chat from './chat.jsx';
import openSocket from 'socket.io-client';
import styles from '../css/app.css';
const socket = openSocket('http://localhost:3000');

class App extends Component {
  constructor() {
    super();

    this.state = {
      messages: []
    }
    
    socket.on('test', (data) => {
      this.setState({
        messages: data
      })
    })
  }

  render() {
    return (
      <div className='main'>Mentors
        <button className='theButton googleOAuth'>
        </button>
        <div className='theButton'>
          < Chat messages={this.state.messages}/>
        </div>
      </div>
    )
  }

}

export default App;