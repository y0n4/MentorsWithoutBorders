import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
// import MobileTearSheet from '../../../MobileTearSheet';


const MembersOnline = props => (

  <div className="onlineContainer">
    <List style={{ maxWidth: '20%', overflow: 'auto' }}>
      <Subheader>
Mentors Online
      </Subheader>
      <ListItem
        primaryText="Brendan Lim"
        leftAvatar={<Avatar src="images/ok-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Eric Hoffman"
        leftAvatar={<Avatar src="images/kolage-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Grace Ng"
        leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Kerem Suer"
        leftAvatar={<Avatar src="images/kerem-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Raquel Parrado"
        leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
    </List>

  </div>
);

export default MembersOnline;
