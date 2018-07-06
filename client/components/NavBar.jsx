import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';
import Switch from '@material-ui/core/Switch';
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from 'react-simple-dropdown';
import MentorHome from './MentorHome';
import MenteeHome from './MenteeHome/MenteeHome';

const styles = {
  root: {
    width: 500,
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
    // this.handleChange = this.handleChange.bind(this);
    this.switchMode = this.switchMode.bind(this);
  }

  // handleChange(event, value) {
  //   console.log(value, 'this value!!');
  //   this.setState({ value });
  // }

  // switchMode() {
  //   const { mentor } = this.state;
  //   this.setState((prevState) => ({
  //     mentor: prevState.mentor,
  //   })
  // )
  // }


  switchMode() {
    const { mentor } = this.state;
    this.setState({
      mentor: !mentor,
    });
  }

  // renderMentor() {
  //   const { mentor } = this.state;
  //   // const { isUserOn } = this.props;
  //   // if (!isUserOn) {
  //   //   return <Redirect to="/" />;
  //   // }
  //   if (this.state.home) {
  //     return <Redirect to="/chat" />;
  //   } if (!mentor) {
  //     return <Redirect to="/mentee" />;
  //   } if (mentor) {
  //     return <Redirect to="mentor" />;
  //   }
  //   return <Redirect to="/" />;
  // }

  // renderMentor() {
  //   const { mentor } = this.state;


  //   }
  // }


  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { mentor } = this.state;
    return (
      <div className="navContainer">
        {/* {this.renderMentor()} */}
        {/* <Redirect to={`/${value}`} /> */}
        {mentor ? (<MentorHome />) : (<MenteeHome />)}
        <BottomNavigation
          onChange={this.handleChange}
          className={classes.app}
          style={styles.large}
        >
          <BottomNavigationAction
            value="home"
            icon={<HomeIcon />}
            component={Link}
            to="/user-profile"
          />
          <BottomNavigationAction
            value="chat"
            icon={<ChatIcon />}
            component={Link}
            to="/chat"
          />
          <Dropdown className="account-dropdown" ref="dropdown">
            <DropdownTrigger>
              <BottomNavigationAction
                value="user"
                icon={<FaceIcon />}
              />
            </DropdownTrigger>
            <DropdownContent>
              <ul>
                <FormControl component="fieldset">
                  <div />
                  <FormGroup>
                    <FormControlLabel
                      control={(
                        <Switch
                          onChange={this.switchMode}
                          value="mentor"
                        />
                      )}
                      label="Mentor"
                    />
                  </FormGroup>
                </FormControl>
              </ul>
              <ul>
                <Link to="/logout" onClick={this.handleLinkClick}>
                  Log Out
                </Link>
                <br />
                <Link to="/searchResults" onClick={this.handleLinkClick}>
                  Find a Mentor
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
