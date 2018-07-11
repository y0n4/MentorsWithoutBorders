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
  },
  flex: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    boxShadow: 'none',
    overflow: 'auto',
  },
});

class MenteeHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <div style={{ padding: 150 }}>
          <div className="checkTime" style={{ fontSize: 45, color: 'white', fontFamily: 'Chela One' }}>
            {this.checkTime()}
          </div>
          <Grid container spacing={24}>
            <Grid item xs={8} style={{ height: 400, overflow: 'auto' }}>
              <Paper className={classes.paper}>
                <div className="mentor-quote" style={{ lineHeight: 5, color: 'white', fontSize: 20 }}>
                  Quote feed here
                </div>
                <div className="mentor-quote-entry" style={{ lineHeight: 3 }}>
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
                <div className="mentor-quote-entry" style={{ lineHeight: 3 }}>
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
                {' '}
                <div className="mentor-quote-entry" style={{ lineHeight: 3 }}>
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
                {' '}
                <div className="mentor-quote-entry" style={{ lineHeight: 3 }}>
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
                {' '}
                <div className="mentor-quote-entry" style={{ lineHeight: 3 }}>
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
                <div className="mentor-quote-entry" style={{ lineHeight: 3 }}>
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
                <div className="mentor-quote-entry" style={{ lineHeight: 3 }}>
                Somone is sitting in the shade today because someone planted a tree a long time ago
                  <bold style={{ color: 'blue' }}>
                    {' -  Warren Buffet'}
                  </bold>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4} style={{ paddingLeft: 90, height: 500 }}>
              <Paper className={classes.paper}>
                <div>
                  <SearchBar />
                  {/* <MembersOnline userId={userId} socket={this.props.socket} /> */}
                </div>
              </Paper>
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                overflow: 'auto', height: 500, maxWidth: '50%', marginLeft: '20%', marginTop: '5',
              }}
            >
              <Paper className={classes.paper}>
                <div
                  className="menteeOldQ"
                  style={{
                    color: 'white', lineHeight: 5, fontSize: 20,
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
