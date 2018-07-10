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
        const { isUserOn, messages, userId } = this.state;
        const appState = this.state;
        return (

            <div className="nav">
                <Nav name={name} isUserOn={isUserOn} />

                <div className="main">

                    <Route exact path="/" component={Home} />
                    <Route path="/user-profile" component={UserProfile} />
                    <Route path="/mentor" component={MentorHome} />
                    <Route path="/mentee" component={() => <MenteeHome userId={userId} socket={this.socket} />} />
                    <Route path="/chat" component={() => <VideoChatRoom {...this.state} socket={this.socket} />} />
                    <Route path="/searchResults" component={MentorSearch} />

                    {!isUserOn && <Login setIsUserOn={this.setIsUserOn} />}
                </div>
            </div>
        );
    }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
