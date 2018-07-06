import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar';
import MembersOnline from './MembersOnline';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const MenteeHome = (props) => {
  const { classes } = props;

  return (
    <div>
      <SearchBar />
      <MembersOnline />
    </div>

  );
};

export default withStyles(styles)(MenteeHome);
