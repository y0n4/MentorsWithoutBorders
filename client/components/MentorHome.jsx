import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MentorFeed from './MentorHomeComponents/MentorFeed';
<<<<<<< HEAD
<<<<<<< HEAD
import MentorFeedRight from './MentorHomeComponents/MentorFeedRight';
=======
>>>>>>> added userprofile, mentee home
=======
import MentorFeedRight from './MentorHomeComponents/MentorFeedRight';
>>>>>>> merge

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
<<<<<<< HEAD
<<<<<<< HEAD
    this.state = {
      questions: '',
    };
  }

  componentDidMount() {
    // get last 15 questions from connected mentees
    // get current online mentees
  }

  // renders mentees questions on homepage
=======
    this.state = {};
  }

  // readily need 
  // questions from mentees data
  // list of online mentees (socket)
  // mentor user data
>>>>>>> added userprofile, mentee home
=======
    this.state = {
      questions: '',
    };
  }

  componentDidMount() {
    // get last 15 questions from connected mentees
    // get current online mentees
  }

  // renders mentees questions on homepage
>>>>>>> merge
  renderMenteeQs() {
    return (
      <MentorFeed />
    );
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> merge
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

<<<<<<< HEAD
=======
>>>>>>> added userprofile, mentee home
=======
>>>>>>> merge
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
<<<<<<< HEAD
<<<<<<< HEAD
                <button onClick={this.saveMentorQ}>Submit</button><br /><br /><br />
              </div>
              <div className="mentee-question-feed">
                Help guide your mentee's with tips that can help answer their worries/questions!<br />
                Simply visit their profile and chat with them!<br />
=======
                <button>Submit</button><br /><br /><br />
              </div>
              <div className="mentee-question-feed">
                Help guide your mentee's with tips that can help answer their worries/questions!<br /><br />
>>>>>>> added userprofile, mentee home
=======
                <button onClick={this.saveMentorQ}>Submit</button><br /><br /><br />
              </div>
              <div className="mentee-question-feed">
                Help guide your mentee's with tips that can help answer their worries/questions!<br />
                Simply visit their profile and chat with them!<br />
>>>>>>> merge
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
<<<<<<< HEAD
<<<<<<< HEAD
              <br /><br />
              <div className="mentor-connect-mentee">
                Current Mentees Online <br /><br />
                {this.renderMenteeOnline()}
=======
              <br />
              <div className="mentor-connect-mentee">
                Online Mentees
                <div>*list of online mentees here*</div>
>>>>>>> added userprofile, mentee home
=======
              <br /><br />
              <div className="mentor-connect-mentee">
                Current Mentees Online <br /><br />
                {this.renderMenteeOnline()}
>>>>>>> merge
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
