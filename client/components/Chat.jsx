import React, { Component } from 'react';
import VideoComponent from './VideoComponent.jsx';
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
    color: theme.palette.text.secondary,
  },
});

class Chat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      name: ''
    }

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  sendMessage(message) {
    message.preventDefault();
    this.props.socket.emit('new message', this.state.message);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <VideoComponent />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <form onSubmit={this.sendMessage}>
                <div className='chatTitle'>
                  <h1>TheChatArea</h1>
                </div>
                <div className='messagesArea'>
                  {this.props.messages.map((message) => {
                    return (
                      <div className='aMessage'>
                        {message.message}
                      </div>
                    )
                  })}
                </div>
                <div className='enterMessage'>
                  <textarea className='typeMessage' value={this.state.message} onChange={this.handleChange} />
                  <input type='submit' value='Submit' />
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
} 

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);