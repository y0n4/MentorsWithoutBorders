import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import io from 'socket.io-client';
import VideoChatRoom from './VideoChatRoom';
import MentorHome from './MentorHome';
import MenteeHome from './MenteeHome/MenteeHome';
import NavBar from './NavBar';
import Login from './Login';
import Chat from './Chat';
import Home from './Home';
import UserProfile from './UserProfile';
import '../dist/styles.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      isUserOn: false,
      name: '',
    };
    this.socket = io.connect();
    this.setIsUserOn = this.setIsUserOn.bind(this);
  }

  // componentDidMount() {
  //   axios.get('/home')
  //     .then((res) => {
  //       console.log(res.data, '!!!!');
  //       if (res.data.status === 'cookie') {
  //         this.setIsUserOn(res.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }


  setIsUserOn(info) {
    console.log(info);
    this.setState({
      isUserOn: true,
      name: info.dbInfo.fullName,
    });
    console.log(this.state.isUserOn);
  }

  render() {
    const { isUserOn, messages, name } = this.state;
    return (
      <div className="main">
        <div className="nav">
          <NavBar messages={messages} socket={this.socket} isUserOn={isUserOn} />
        </div>
        {!isUserOn && <Login setIsUserOn={this.setIsUserOn} />}
        <div className="routes">
          <Route exact path="/" component={Home} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/mentor" component={MentorHome} />
          <Route path="/mentee" component={MenteeHome} />
          {/* <Route path="/chat" component={() => <Chat name={name} socket={this.socket} />} /> */}
          <Route path="/chat" component={() => <VideoChatRoom name={name} socket={this.socket} />} />
        </div>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
