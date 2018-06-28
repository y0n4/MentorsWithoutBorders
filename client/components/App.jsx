import React, { Component } from "react";
import Chat from "./chat.jsx";
import openSocket from "socket.io-client";
import "../dist/styles.css";
import NavBar from "./NavBar.jsx";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Home from "./Home.jsx";
import MentorHome from "./MentorHome.jsx";
import MenteeHome from "./MenteeHome.jsx";
import Login from "./Login.jsx";
// import VideoComponent from "./VideoComponent.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      socket: openSocket("http://localhost:3000"),
      isUserOn: false
    };
    this.setIsUserOn = this.setIsUserOn.bind(this);
    this.googleOAuth = this.googleOAuth.bind(this);
    this.state.socket.on("get message", data => {
      this.setState({
        messages: data
      });
    });
  }

  handleLinkClick() {
    this.refs.dropdown.hide();
  }

  googleOAuth() {
    console.log('37', this.state.isUserOn)
    if(this.state.isUserOn == false) { //false
      console.log(39)
      return (
        <Login setUser={this.setIsUserOn} />
      )
    } else if (this.state.isUserOn === true) { //true
      console.log('43');
      return (
        <div>hi</div>
      )
    }
  }

  setIsUserOn(info) {
    // console.log('post malone', info);
    this.setState({
      isUserOn: true
    });
    this.googleOAuth();
  }

  render() {
    return (
      <div className="container">
        <div className="nav">
          <NavBar />
        </div>
        {this.googleOAuth()}
        <div class="links">
          <Link to="/mentee" />
        </div>
        <div className="routes">
          <Route path="/home" component={Home} />
          <Route path="/mentor" component={MentorHome} />
          <Route path="/mentee" component={MenteeHome} />
        </div>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
