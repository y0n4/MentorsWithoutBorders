import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  paper: {
    height: 140,
    width: 100,
  },
  card: {
    minWidth: 275,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  pos: {
    marginBottom: 12,
  },
});

const MentorSearch = (props) => {
  state = {
    open: false,
    age: '',
  }

  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  const { classes } = props;
  const spacing = 16;
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={10}>
            <Card className={classes.card}>
              <CardContent>
                Blah Blah
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card className={classes.card}>
              <CardContent>
                Blah Blah
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

MentorSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MentorSearch);