import React, { Component } from 'react';
import Video from 'twilio-video';
import axios from 'axios';

export default class VideoComponent extends Component {
  constructor(props) {
    super();

    this.state = {
      name: null, // Holds name assigned to client
      roomName: '', // Stores room name
      roomNameErr: false, // Enables to show error if true
      previewTracks: null,
      localMediaAvailable: false, // Represents availability of LocalAudioTrack(mic) and LocalVideoTrack(cam)
      hasJoinedRoom: false,
      activeRoom: null // Tracks current active room
    };

    this.joinRoom = this.joinRoom.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.detachTracks = this.detachTracks.bind(this);
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
  }

  componentDidMount() {
    axios.get('/token').then(results => {
      const { identity, token } = results.data;
      this.setState({
        identity,
        token
      });
    });
  }

  handleRoomNameChange(e) {
    // Get room name from text field and update state
    let roomName = e.target.value;
    this.setState({
      roomName
    });
  }

  joinRoom() {
    // Show error if trying to join room without room name input
    if (!this.state.roomName.trim()) {
      this.setState({
        roomNameErr: true
      });
      return;
    }

    console.log(`Joining room ${this.state.roomName}`);
    let connectOptions = {
      name: this.state.roomName
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    // Connect to room by providing token and connection options that include room name and tracks
    Video.connect(this.state.token, connectOptions).then(this.roomJoined, error => {
      alert('Could not connect to Twilio', error);
    });
  }

  // Attach tracks to DOM
  attachTracks(tracks, container) {
    tracks.forEach(track => {
      container.appendChild(track.attach());
    });
  }

  // Attach participant's track to DOM
  attachParticipantTracks(participant, container) {
    let tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  }

  roomJoined(room) {
    // Called when a participant joins a room
    console.log(`Joined as ${this.state.identity}`);
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true
    });

    // Attach participants track to DOM
    let previewContainer = this.refs.localMedia;
    if (!previewContainer.querySelector('video')) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

      // Attach the Tracks of the room's participants.
    room.participants.forEach(participant => {
      console.log("Already in Room: '" + participant.identity + "'");
      var previewContainer = this.refs.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // Participant joining room
    room.on('participantConnected', participant => {
      console.log("Joining: '" + participant.identity + "'");
    });

    // Attach participant’s tracks to DOM when they add a track
    room.on('trackAdded', (track, participant) => {
      console.log(participant.identity + ' added track: ' + track.kind);
      var previewContainer = this.refs.remoteMedia;
      this.attachTracks([track], previewContainer);
    });

    // Detach participant’s track from DOM when they remove a track.
    room.on('trackRemoved', (track, participant) => {
      this.log(participant.identity + ' removed track: ' + track.kind);
      this.detachTracks([track]);
    });

    // Detach all participant’s track when they leave a room.
    room.on('participantDisconnected', participant => {
      console.log("Participant '" + participant.identity + "' left the room");
      this.detachParticipantTracks(participant);
    });

    // Once the local participant leaves the room, detach the Tracks
    // of all other participants, including that of the LocalParticipant.
    room.on('disconnected', () => {
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach(track => {
          track.stop();
        });
      }
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);
      this.state.activeRoom = null;
      this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
    });  
  }

  leaveRoom() {
    this.state.activeRoom.disconnect();
    this.setState({
      hasJoinedRoom: false,
      localMediaAvailable: false
    });
  }
  
  detachTracks(tracks) {
    tracks.forEach(track => {
      track.detach().forEach(detachedElement => {
        detachedElement.remove();
      });
    });
  }

  detachParticipantTracks(participant) {
    var tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }

  render() {
    /*
      Controls showing the local track
      Only shows after user has joined room
    */
    let showLocalTrack = this.state.localMediaAvailable ? (
      <div className='flex-item' ref='localMedia' />
    ) : '';

    /*
      Buttons for joining room or leaving room
      Shows one or the other depending on current state
    */
    let joinOrLeaveRoomButton = this.state.hasJoinedRoom ?
      (<button secondary={true} onClick={this.leaveRoom} >Leave Room</button>)
      :
      (<button label='Join Room' primary={true} onClick={this.joinRoom} >Join Room</button>);

    return (
      <div className='videoArea'>
        <div className='flex-container'>
          {showLocalTrack}
        </div>
        <div className='roomName'>
          <input type='text' onChange={this.handleRoomNameChange} />
          <br />
          {joinOrLeaveRoomButton}
        </div>
        <div className='otherVid' ref='remoteMedia' id='remote-media' />
      </div>
    );
  }
};