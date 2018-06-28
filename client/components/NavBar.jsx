import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FormControl from "@material-ui/core/FormControl";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';
import Switch from "@material-ui/core/Switch";
import $ from "jquery";
import Dropdown, {
  DropdownTrigger,
  DropdownContent
} from "react-simple-dropdown";

const styles = {
  root: {
    width: 500
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      mentor: false,
    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event, value) {
    console.log(value, 'this value!!');
    this.setState({ value });
  }

  switchMode() {
    this.setState({
      mentor: !this.state.mentor
    });
  }
  renderMentor() {
    if (this.state.mentor) {
      return <Redirect to="/mentor" />;
    } else if(!this.state.mentor) {
      return <Redirect to="/mentee" />;
  }
}
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="navContainer">
        <Redirect to= {`/${this.state.value}`} />
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          className={classes.app}
          style={styles.large}
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
                <Link to="/home">
                  Home
                </Link>
              </ul>
              <ul>
              <FormControl component="fieldset">
              <div>{this.renderMentor()}</div>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.mentor}
                          onChange={this.switchMode.bind(this)}
                          value="mentor"
                        />
                      }
                      label="Mentor"
                    />
                  </FormGroup>
                  </FormControl>
              </ul>
              <ul>
                <Link to="/logout" onClick={this.handleLinkClick}>
                  Log Out
                </Link>
              </ul>
            </DropdownContent>
          </Dropdown>
        </BottomNavigation>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
