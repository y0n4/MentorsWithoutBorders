import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Dropdown, {
  DropdownTrigger,
  DropdownContent
} from "react-simple-dropdown";
import "../dist/styles.css";

import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Chat";
import FaceIcon from "@material-ui/icons/Face";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: ["mentorMode"]
    };

    this.handleLinkClick = this.handleLinkClick.bind(this);
  }
  // handleChange(event, value) {
  //   this.setState({ value });
  // }

  handleLinkClick() {
    this.refs.dropdown.hide();
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className="navContainer text-center">
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.app}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
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
                  <a href="/" onClick={this.handleLinkClick}>
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
          {/* <button className="google-oauth">{this.googleOAuth()}</button> */}
        </BottomNavigation>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
