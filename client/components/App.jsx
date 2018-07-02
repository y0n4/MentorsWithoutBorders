import React, { Component } from 'react';
import io from 'socket.io-client';
import '../dist/styles.css';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import NavBar from './NavBar.jsx';
import Chat from './Chat.jsx';
import Home from './Home.jsx';
import MentorHome from './MentorHome.jsx';
import MenteeHome from './MenteeHome.jsx';
import Login from './Login.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      isUserOn: false,
      fullName: '',
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
      fullName: info.dbInfo.fullName,
    });
    this.googleOAuth();
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
        <div className="links">
          <Link to="/mentee" />
        </div>
        <div className="routes">
          <Route path="/home" component={Home} />
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
