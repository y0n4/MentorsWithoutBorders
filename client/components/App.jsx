import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';
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
import PersonalityAnalysis from './PersonalityAnalysis';


class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      isUserOn: false,
      name: '',
      userId: '',
      isMentor: '',
      videoChat: false,
      roomName: '',
    };
    this.socket = io();
    this.setIsUserOn = this.setIsUserOn.bind(this);
    this.socket.on('request', (data) => {
      this.setState({
        videoChat: true,
        roomName: data.roomName,
      });
    });
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
    const {
      isUserOn, messages, userId, name, videoChat, isMentor,
    } = this.state;

    return (

      <div className="nav">
        <Nav name={name} isUserOn={isUserOn} />


        <Route exact path="/" component={Home} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/mentor" component={MentorHome} />
        <Route path="/mentee" component={() => <MenteeHome isUserOn={isUserOn} userId={userId} isMentor={isMentor} socket={this.socket} />} />
        <Route path="/chat" component={() => <VideoChatRoom {...this.state} socket={this.socket} />} />
        <Route path="/searchResults" component={MentorSearch} />
        <Route path="/personality-analysis" component={PersonalityAnalysis} />
        <div className="main">
          {!videoChat && (
          <Button
            component={Link}
            to="/chat"
          >
HEREEEE

          </Button>
          )}
          {!isUserOn && <Login setIsUserOn={this.setIsUserOn} />}
        </div>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
