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
// import VideoComponent from "./VideoComponent.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      socket: openSocket("http://localhost:3000"),
      isUserOn: false,
      isAuthenticated: false,
      user: null,
      token: '',
      session: ''
    };

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
    return "sign in";

  onFailure(response){
    console.log('not working');
  }


  googleOAuth() {
    if(!this.state.isAuthenticated) {
      console.log('true');
      return (
        <Login />
      )
    }
    //⭐️TODO >> want to pass in new component dedicated just for google sign in
  }

  render() {
    return (
      <div className="container">
        <div className="nav">
          <NavBar />
        </div>
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
