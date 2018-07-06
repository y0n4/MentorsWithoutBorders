import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
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

  setIsUserOn(info) {
    this.setState({
      isUserOn: true,
      name: info.dbInfo.fullName,
    });
  }

  render() {
    const { isUserOn, messages, name } = this.state;
    return (
      <div className="container">
        <div className="nav">
          <NavBar messages={messages} socket={this.socket} isUserOn={isUserOn} />
        </div>
        {!isUserOn && <Login setIsUserOn={this.setIsUserOn} />}
        <div className="routes">
          <Route exact path="/" component={Home} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/mentor" component={MentorHome} />
          <Route path="/mentee" component={MenteeHome} />
          <Route path="/chat" component={() => <Chat name={name} socket={this.socket} />} />
        </div>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
