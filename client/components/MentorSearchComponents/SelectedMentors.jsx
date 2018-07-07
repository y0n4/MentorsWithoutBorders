import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  }
});


class SelectedMentors extends Component {

  capitalize (words) {
    words = words.split(' ');
    let capitalized = [];

    words.forEach((word) => {
      capitalized.push(`${word[0].toUpperCase()}${word.slice(1)}`);
    })

    return capitalized.join(' ');
  }

  render() {
    let mentor = this.props.mentor;
    const { classes } = this.props;

    return (
      <div className='eachMentor'>
        <ListItem>
          <Grid container className={classes.root} spacing={0}>
            <Grid item xs={4}>
              <Avatar src={mentor.picture.thumbnail} className='theAvatar' />
              <div className='theName'>
                <h2>{`${this.capitalize(`${mentor.name.first} ${mentor.name.last}`)}`}</h2> 
              </div>
              <div className='state'>
                <h3>{`${this.capitalize(mentor.location.state)}`}</h3> 
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className='aQuote'>
                <h2>A pretty cool quote from the mentor can go here...</h2>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className='startChat'>
                <i className='far fa-comments fa-2x chatBubble' />
              </div>
              <div className='addMentorFA'>
                <i className='fas fa-user-plus fa-2x addMentor'></i>
              </div>
              <div className='profileFA'>
                <i className='far fa-id-card fa-2x viewProfile'></i>
              </div>
            </Grid>
          </Grid>
        </ListItem>
        {/* {console.log(this.props.mentor)} */}
      </div>
    );
  }
};

SelectedMentors.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectedMentors);
