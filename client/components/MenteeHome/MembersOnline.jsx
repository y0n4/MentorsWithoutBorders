import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';

import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
// import MobileTearSheet from '../../../MobileTearSheet';
class MembersOnline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentors: [],
    };
    this.socket = this.props.socket;
    this.socket.on('mentorsOnline', (mentors) => {
      this.setState({ mentors });
    });
  }

  componentDidMount() {
    const { userId } = this.props;
    this.socket.emit('getMyMentors', userId);

  }

  render() {
    const { mentors } = this.state;
    return (
      <div className="onlineContainer">
        <List style={{ maxWidth: '100%', overflow: 'auto' }}>
          <span style={{
            fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '18px',
          }}
          >
            <center>
        Mentors Online
    
            </center>
          </span>
    
          <br />
          <hr />
          { mentors.map(mentor => (
            <ListItem
              key={mentor.id}
              primaryText={mentor.fullName}
              rightAvatar={<Avatar src={mentor.photo} />}
              rightIcon={<CommunicationChatBubble />}
            />
          ))}
        </List>
      </div>
    );
  }
}

export default MembersOnline;
