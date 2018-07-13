import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Redirect, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import MembersOnline from './MembersOnline';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '80px',
  },
  flex: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // backgroundColor: 'transparent',
    fontFamily: 'sans-serif',
    // fontWeight: 'bold',
    // boxShadow: 'none',
    overflow: 'auto',
  },
});

class MenteeHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMentor: this.props.isMentor,
    };
  }

  checkTime() {
    const time = new Date().getHours();
    // console.log(time);
    if (time < 12) {
      return 'Good Morning! 😄 ';
    } if (time < 18) {
      return 'Good Afternoon! 😄';
    }
    return 'Good Evening 🙂';
  }

  render() {
    const { classes, userId } = this.props;

    return (
      <div className={classes.root}>
        <div style={{ padding: 0 }}>
          <div className="checkTime">
            {this.checkTime()}<br />
          </div>
          <Grid container spacing={24}>
            <Grid item xs={8} style={{ height: 400, overflow: 'auto' }}>
              <Paper className={classes.paper}>
                <div className="mentor-quote" style={{ lineHeight: 5, color: 'black', fontSize: 20 }}>
                Check out these inspiring quotes from our mentors
                </div>
                <div className="mentor-quote-entry">
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
                <div className="mentor-quote-entry">
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
                {' '}
                <div className="mentor-quote-entry">
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
                {' '}
                <div className="mentor-quote-entry">
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
                {' '}
                <div className="mentor-quote-entry">
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4} style={{ height: 500 }}>
              <Paper className={classes.paper}>
                <div>
                  {!this.state.isMentor
                    ? (
                      <button className="signup-btn">
                        <Link to="/mentor-sign-up">
                          Become a Mentor!
                        </Link>
                      </button>
                    ) : <div />}<br /><br />
                  <SearchBar /><br /><br />
                  <MembersOnline userId={userId} socket={this.props.socket} />
                </div>
              </Paper>
            </Grid>
            <Grid
              item
              xs={8}
            >
              <Paper className={classes.paper}>
                <div
                  className="menteeOldQ"
                  style={{
                    color: 'black', lineHeight: 5, fontSize: 20,
                  }}
                >
                Here are the recent questions you've posted!
                </div>
                <br />
                <div className="mentor-quote-entry" style={{ lineHeight: 3 }}>
                  Why is my dog always hungryyy?
                  <br />
                  What would happen if I binge eat hot cheetos? 🤔🤔🤔
                </div>
              </Paper>
            </Grid>

          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MenteeHome);
