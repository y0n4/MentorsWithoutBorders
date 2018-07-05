import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MentorFeed from './MentorHomeComponents/MentorFeed';

const styles = theme => ({
  root: {
    margin: '80px',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: 'black',
  },
});

class MentorHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // readily need 
  // questions from mentees data
  // list of online mentees (socket)
  // mentor user data
  renderMenteeQs() {
    return (
      <MentorFeed />
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <div className="mentor-quote">
                Share with your mentees about what inspired you today?<br /><br />
                <textarea className="mentor-input" /><br />
                <button>Submit</button><br /><br /><br />
              </div>
              <div className="mentee-question-feed">
                Help guide your mentee's with tips that can help answer their worries/questions!<br /><br />
                {this.renderMenteeQs()}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <div className="mentor-rating">
                Your Mentor Rating
                <div>⭐️ ⭐ ️⭐️ ⭐️ ⭐️ 5 reviews</div>
              </div>
              <br />
              <div className="mentor-connect-mentee">
                Online Mentees
                <div>*list of online mentees here*</div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MentorHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MentorHome);
