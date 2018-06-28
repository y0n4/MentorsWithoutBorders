import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import '../dist/styles.css';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import NavBar from './NavBar.jsx';
import Chat from './Chat.jsx';
import Home from './Home.jsx';
import MentorHome from './MentorHome.jsx';
import MenteeHome from './MenteeHome.jsx';
import Login from './Login.jsx';
// import VideoComponent from "./VideoComponent.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      socket: openSocket('http://localhost:3000'),
      isUserOn: false,
      fullName: '',
    };
    this.setIsUserOn = this.setIsUserOn.bind(this);
    this.googleOAuth = this.googleOAuth.bind(this);
    this.state.socket.on('get message', (data) => {
      this.setState({
        messages: data,
      });
    });
  }

  handleLinkClick() {
    this.refs.dropdown.hide();
  }

  googleOAuth() { // the sign in button component
    if (!this.state.isUserOn) { // false
      return (
        <Login setUser={this.setIsUserOn} />
      );
    } if (this.state.isUserOn) { // true
      return (
        <h2>
Welcome to Mentors without Borders!
        </h2>
      );
    }
  }

  setIsUserOn(info) {
    this.setState({
      isUserOn: true,
      fullName: info.dbInfo.fullName,
    });
    this.googleOAuth();
  }

  render() {
    return (
      <div className="container">
        <div className="nav">
          <NavBar socket={this.state.socket} messages={this.state.messages} />
        </div>
        {this.googleOAuth()}
        <div className="links">
          <Link to="/mentee" />
        </div>
        <div className="routes">
          <Route path="/home" component={Home} />
          <Route path="/mentor" component={MentorHome} />
          <Route path="/mentee" component={MenteeHome} />
          <Route path="/chat" component={() => <Chat messages={this.state.messages} socket={this.state.socket} />} />
        </div>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
