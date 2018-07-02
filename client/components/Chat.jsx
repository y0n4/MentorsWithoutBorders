import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
import VideoComponent from './VideoComponent';

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
      messages: [],
      msgHistory: '',
      name: '',
      test: '',
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onListenClick = this.onListenClick.bind(this);
    this.socket = this.props.socket;
  }

  componentWillMount() {
    const { name } = this.props;
    this.socket.emit('userJoin', { name });
    this.setState({ name });
  }

  componentDidMount() {
    this.socket.on('oldMessages', (msgHistory) => {
      this.setState({ msgHistory });
    });
  }

  onListenClick() {
    fetch('/api/speech-to-text/token')
      .then(response => response.text())
      .then((token) => {
        const stream = recognizeMic({
          token,
          objectMode: true,
          extractResults: true,
          format: false,
        });
        stream.on('data', (data) => {
          console.log(data);
          this.setState({
            test: data.alternatives[0].transcript,
          });
        });
        stream.on('error', (err) => {
          console.log(err);
        });
        document.querySelector('.stop').onclick = stream.stop.bind(stream);
      }).catch((error) => {
        console.log(error);
      });
  }

  sendMessage(message) {
    message.preventDefault();
    this.props.socket.emit('new message', this.state.message);
  }

  handleChange(event) {
    const currentState = this.state;
    event.target.value;

    this.setState({
      message: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    const { test } = this.state;
    return (
      <div>
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
                  <div className="chatTitle">
                    <h1>
                      TheChatArea
                    </h1>
                  </div>
                  <div className="messagesArea">
                    {this.state.messages.map((message, i) => (
                      <div key={i} className="aMessage">
                        {message}
                      </div>
                    ))}
                  </div>
                  <div className="enterMessage">
                    <textarea className="typeMessage" value={this.state.message} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                  </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <button type="button" onClick={() => this.onListenClick()}>
          Listen
        </button>
        <button type="button" className="stop">
          Stop
        </button>
        {test}
      </div>
    );
  }
}

export default withStyles(styles)(Chat);
