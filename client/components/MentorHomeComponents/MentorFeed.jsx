import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: 'black',
  },
});


function MentorFeed(props) {
  const { classes } = props;
  return (
    <div className="mentee-qs">
      <img src="http://i64.tinypic.com/20uwyl0.jpg" width="50" height="50" className="feed-icon"/>
      <div className="feed-post">
      <strong>Wade Watts</strong><br /><br />
      I really want to start a mukbang channel, should I eat silently or have a full blown conversation?
      </div>
    </div>
  );
} 

MentorFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MentorFeed);

{/* <Grid container spacing={24}>
<Grid item xs={10}>
  <img src="http://i64.tinypic.com/20uwyl0.jpg" width="50" height="50"/>
  <Paper className={classes.paper}>xs=12</Paper>
</Grid>
</Grid> */}