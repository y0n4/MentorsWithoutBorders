import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  paper1: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes } = this.props;

    return (

      <div className={classes.root} style={{ padding: 150, height: 824 }}>

        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Paper className={classes.paper1}>
              <p style={{ fontFamily: 'Chela One', fontSize: 100 }}>
                {' '}
Jack Daniel
                <div style={{ fontFamily: 'Chela One', fontSize: 35, color: 'white' }}>
Software Engineer
                </div>
              </p>
              <p style={{ fontSize: 28 }}>
                <i>
"Never stop learning, because life never stops teaching."
                </i>
              </p>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <img src="https://images.unsplash.com/photo-1506349548872-e96212963180?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9abc394cf9a1fc882a89d8b49e778b79&auto=format&fit=crop&w=1350&q=80" alt="Moutain view" height="820" width="100%" />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);
