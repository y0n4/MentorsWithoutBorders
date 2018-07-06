import React from 'react';
import Chat from './Chat';
import VideoComponent from './VideoComponent';

const VideoChatRoom = props => (
  <div>
    <VideoComponent />
    <Chat />
  </div>
);

export default VideoChatRoom;
