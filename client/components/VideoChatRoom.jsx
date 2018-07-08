import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LanguageSelector from './LanguageSelector';
import VideoComponent from './VideoComponent';
import Chat from './Chat';

class VideoChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
    };
    this.handleLanguageSelect = this.handleLanguageSelect.bind(this);
  }

  handleLanguageSelect(language) {
    this.setState({ language });
  }

  render() {
    const { name, socket } = this.props;
    const { language } = this.state;
    console.log(socket)
    return (

      <Grid className="video-chatroom" container justify="center" >
        {language ? (
          <React.Fragment>
            <Grid item component={() => <VideoComponent name={name} socket={socket} />} />
            <Grid item xs={8} component={() => <Chat name={name} socket={socket} />} />
          </React.Fragment>

        ) : (
            <Grid item component={() => <LanguageSelector handleLanguageSelect={this.handleLanguageSelect} />} />
          )}
      </Grid>
    );
  }
}

export default VideoChatRoom;
