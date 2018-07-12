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
      name: this.props.name,
      photo: this.props.photo.replace(50, 300),
      isMentor: this.props.isMentor,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} style={{ padding: 150, height: 824 }}>
          <img src={this.state.photo} className="user-pic"/>
          <div className="user-descrip">
            <div className="user-name">{this.state.name}</div>
            <p className="user-occupation">Software Engineer</p>
            <p className="user-bio"><i>"Never stop learning, because life never stops teaching"</i></p>
          </div>
        
        <br /><br />
        <div className="user-feed">
          quotes feed goes here if mentor<br />
          question feed goes here if not mentor
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);
