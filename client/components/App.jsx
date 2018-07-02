import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import io from 'socket.io-client';
import VideoChatRoom from './VideoChatRoom';
import MentorHome from './MentorHome';
import MenteeHome from './MenteeHome';
import NavBar from './NavBar';
import Login from './Login';
import Chat from './Chat';
import Home from './Home';
import '../dist/styles.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      isUserOn: false,
      name: '',
    };
    this.setIsUserOn = this.setIsUserOn.bind(this);
    this.socket = io.connect();

    this.socket.on('get message', (data) => {
      this.setState({
        messages: data,
      });
    });
  }

  setIsUserOn(info) {
    this.setState({
      isUserOn: true,
      name: info.dbInfo.fullName,
    });
    // this.googleOAuth();
  }

  handleLinkClick() {
    this.refs.dropdown.hide();
  }

  render() {
    const { isUserOn, messages } = this.state;
    return (
      <div className="container">
        <div className="nav">
          <NavBar messages={messages} socket={this.socket} />
        </div>
        {!isUserOn && <Login setIsUserOn={this.setIsUserOn} />}
        {/* <div className="links">
          <Link to="/mentee" />
        </div> */}
        <div className="routes">
          <Route exact path="/" component={Home} />
          <Route path="/mentor" component={MentorHome} />
          <Route path="/mentee" component={MenteeHome} />
          <Route path="/chat" component={() => <Chat messages={messages} socket={this.socket} />} />
        </div>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
