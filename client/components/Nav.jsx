import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MailVideoConnect from './MailVideoConnect';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      mentor: false,
      anchorEl: null,
    };
    this.switchToMentor = this.switchToMentor.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  switchToMentor() {
    this.setState(prevState => ({
      mentor: !prevState.mentor,
    }));
  }


  logsOff() {
    return !this.props.isUserOn;
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  renderMentor() {
    const { mentor } = this.state;
    // console.log(this.props.isUserOn);
    const { isUserOn, videoChat } = this.props;
    if (isUserOn && !videoChat) {
      if (!mentor) {
        return <Redirect to="/mentee" />;
      } return <Redirect to="/mentor" />;
    }
  }


  render() {
    const {
      classes, name, isUserOn, mailCount, socket, userId,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{
            width: '100%',
            height: '150px',
            background: 'linear-gradient(to bottom, rgb(112, 184, 211) 0%, rgba(255,255,255,0) 100%)',
            paddingBottom: 50,
            boxShadow: 'none',
            color: '#ffffff',
          }}
        >
          <Toolbar>
            <Typography variant="title" className={`${classes.flex} theTitle`} style={{ color: 'white', fontSize: 30 }}>
              Mentors Without Borders
            </Typography>
            {isUserOn ? (
              <MailVideoConnect
                style={{ fontSize: '18px' }}
                mailCount={mailCount}
                userId={userId}
                socket={socket}
                color="inherit"
              />
            ) : null}
            <Button
              style={{ fontSize: '19px' }}
              className="nav-btn"
              component={Link}
              to="/mentee"
              color="inherit"
            >
              <i className="material-icons">
                home
              </i>
              HOME
            </Button>
            <Button
              style={{ fontSize: '18px' }}
              className="nav-btn"
              component={Link}
              to="/chat"
              color="inherit"
            >
              <i className="material-icons">
                comment
              </i>
              CHAT
            </Button>
            {this.renderMentor()}
            <div>
              {isUserOn && (<Button
                style={{ fontSize: '18px' }}
                className="nav-btn"
                component={Link}
                to="/personality-analysis"
                color="inherit"
              >
                <i className="material-icons">
                grade
                </i>
              Analysis
              </Button>
              )}
              <Button
                style={{ fontSize: '18px' }}
                className="nav-btn"
                aria-owns={anchorEl ? 'dropdown-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                color="inherit"
              >
                <i className="material-icons">
                  face
                </i>
                {`HI ${name || ''} !`}
                <i className="material-icons">
                  expand_more
                </i>
              </Button>
              <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem>

                  <FormGroup>
                    <FormControlLabel
                      control={(
                        <Switch
                          onChange={this.switchToMentor}
                          value="mentor"
                        />
                      )}
                      label="Mentor"
                    />
                  </FormGroup>
                </MenuItem>
                <MenuItem onClick={this.logsOff}>
                  <Link to="/logout" onClick={this.logsOff}>
                    Log Out
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


export default withStyles(styles)(Nav);
