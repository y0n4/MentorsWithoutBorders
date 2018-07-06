import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MentorFeed from './MentorHomeComponents/MentorFeed';
import MentorFeedRight from './MentorHomeComponents/MentorFeedRight';

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
    this.state = {
      questions: '',
    };
  }

  componentDidMount() {
    // get last 15 questions from connected mentees
    // get current online mentees
  }

  // renders mentees questions on homepage
  renderMenteeQs() {
    return (
      <MentorFeed />
    );
  }

  // renders current online mentees on homepage
  renderMenteeOnline() {
    return (
      <MentorFeedRight />
    )
  }

  // when submit button is clicked, save quote to db
  saveMentorQ() {
    console.log('oui');
    // save textarea input as value
    // delete textarea input
    // do post req to save to db
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
                <button onClick={this.saveMentorQ}>Submit</button><br /><br /><br />
              </div>
              <div className="mentee-question-feed">
                Help guide your mentee's with tips that can help answer their worries/questions!<br />
                Simply visit their profile and chat with them!<br />
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
              <br /><br />
              <div className="mentor-connect-mentee">
                Current Mentees Online <br /><br />
                {this.renderMenteeOnline()}
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
