import React, { Component } from 'react';
<<<<<<< HEAD
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
=======
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar';
import MenteeFeed from './MenteeFeed';

const styles = theme => ({
  root: {
    margin: '80px',
>>>>>>> added userprofile, mentee home
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
<<<<<<< HEAD
    color: theme.palette.text.secondary,
  },
});

const MenteeHome = (props) => {
  const { classes } = props;

  return (
    <div />
    //     <div className={classes.root}>
    //       <Grid container spacing={24}>
    //         <Grid item xs={12}>
    //           <Paper className={classes.paper}>xs=12</Paper>
    //         </Grid>
    //         <Grid item xs={6}>
    //           <Paper className={classes.paper}>xs=6</Paper>
    //           whats upppp
    //           {/* <Chat messages={this.state.messages} socket={this.state.socket} /> */}
    //         </Grid>
    //         <Grid item xs={6}>
    //           <Paper className={classes.paper}>xs=6</Paper>
    //         </Grid>
    //         <Grid item xs={3}>
    //           <Paper className={classes.paper}>xs=3</Paper>
    //         </Grid>
    //         <Grid item xs={3}>
    //           <Paper className={classes.paper}>xs=3</Paper>
    //         </Grid>
    //         <Grid item xs={3}>
    //           <Paper className={classes.paper}>xs=3</Paper>
    //         </Grid>
    //         <Grid item xs={3}>
    //           <Paper className={classes.paper}>xs=3</Paper>
    //         </Grid>
    //       </Grid>
    //     </div>
  );
};
=======
    color: 'black',
  },
});

class MenteeHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <div className="mentor-search">
                <SearchBar />
              </div>
              <div className="mentee-question-feed">
                Get inspired
                <br />
                <MenteeFeed />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <div className="mentor-online">
Mentors Online
              </div>
              <div className="mentor-list">
                <ul>

                  Bob Doe
                </ul>
                <ul>
                  Jane Smith
                </ul>
                <ul>
                  George Washington

                </ul>
              </div>

            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
>>>>>>> added userprofile, mentee home

export default withStyles(styles)(MenteeHome);
