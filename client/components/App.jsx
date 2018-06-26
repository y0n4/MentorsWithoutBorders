import React, { Component } from "react";
import Chat from "./chat.jsx";
import openSocket from "socket.io-client";
import styles from "../css/app.css";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Chat";
import FaceIcon from "@material-ui/icons/Face";
import Dropdown, {
  DropdownTrigger,
  DropdownContent
} from "react-simple-dropdown";

import VideoComponent from './VideoComponent.jsx';

const style = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      socket: openSocket("http://localhost:3000")
    };
    this.handleLinkClick = this.handleLinkClick.bind(this);

    this.state.socket.on("get message", data => {
      this.setState({
        messages: data
      });
    });
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  handleLinkClick() {
    this.refs.dropdown.hide();
  }

  googleOAuth() {
    return 'sign in';
    //⭐️TODO >> want to pass in new component dedicated just for google sign in
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div>
        <div className="navContainer text-center">
          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            className={classes.app}
          >
            <BottomNavigationAction
              label="Home"
              value="home"
              icon={<HomeIcon />}
              size="large"
            />
            <BottomNavigationAction
              label="Chat"
              value="chat"
              icon={<ChatIcon />}
            />
            <Dropdown className="account-dropdown" ref="dropdown">
              <DropdownTrigger>
                <BottomNavigationAction
                  label="User"
                  value="user"
                  icon={<FaceIcon />}
                />
              </DropdownTrigger>
              <DropdownContent>
                <ul>
                  <li>
                    <a href="/profile" onClick={this.handleLinkClick}>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="/mentor" onClick={this.handleLinkClick}>
                      Mentor Mode
                    </a>
                  </li>
                  <li>
                    <a href="/logout" onClick={this.handleLinkClick}>
                      Log Out
                    </a>
                  </li>
                </ul>
              </DropdownContent>
            </Dropdown>
            <button className="google-oauth">
              {this.googleOAuth()}
            </button>
          </BottomNavigation>
        </div>
        <div>
          <VideoComponent />
        </div>
        <div>
          <Chat messages={this.state.messages} socket={this.state.socket} />
        </div>
      </div>
    );
  }
}

export default withStyles(style)(App);
