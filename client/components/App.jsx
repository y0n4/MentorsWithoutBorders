import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import io from 'socket.io-client';
import VideoChatRoom from './VideoChatRoom';
import MentorSearch from './MentorSearchComponents/MentorSearch';
import MentorHome from './MentorHome';
import MenteeHome from './MenteeHome/MenteeHome';
import Nav from './Nav';
import Login from './Login';
import Chat from './Chat';
import Home from './Home';
import UserProfile from './UserProfile';
import MentorSignUp from './MentorSignUp';
import '../dist/styles.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      isUserOn: false,
      name: '',
      userId: '',
      isMentor: '',
    };
    this.socket = null;
    this.setIsUserOn = this.setIsUserOn.bind(this);
  }

  componentDidMount() {
    console.log('app', this.state.isMentor);
  }


  setIsUserOn(info) {
    const { isUserOn } = this.state;
    this.socket = io.connect();
    console.log(info);
    this.setState({
      isUserOn: true,
      name: info.dbInfo.fullName,
      photo: info.dbInfo.photo,
      userId: info.dbInfo.id,
      isMentor: info.dbInfo.isMentor,
    });
    console.log(isUserOn);
    this.socket.emit('userLoggedIn', {
      userId: info.dbInfo.id,
      name: info.dbInfo.fullName,
      photo: info.dbInfo.photo,
    });
  }

  render() {
    const { isUserOn, messages, name, isMentor } = this.state;
    return (

      <div className="nav">
        <Nav name={name} isUserOn={isUserOn} />
        <Route exact path="/" component={Home} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/mentor" component={MentorHome} />
        <Route path="/mentee" component={() => <MenteeHome props={this.state} />} />
        <Route path="/chat" component={() => <Chat name={name} socket={this.socket} />} />
        <Route path="/searchResults" component={MentorSearch} />
        <Route path="/mentor-sign-up" component={() => <MentorSignUp isMentor={isMentor} />} />
        <div className="main">
          {!isUserOn && <Login setIsUserOn={this.setIsUserOn} />}
        </div>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
