import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Typography from '@material-ui/core/Typography';

import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
// import MobileTearSheet from '../../../MobileTearSheet';

const MembersOnline = props => (

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
      <ListItem
        primaryText="Steve C."
        rightAvatar={<Avatar src="http://focus.levif.be/medias/162/82959_the-40-year-old-virgin-steve-carell.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Eric Hoffman"
        rightAvatar={<Avatar src="http://www.poetryguy.com/wp-content/themes/tedscheu/images/ted-photo.png" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Grace Ng"
        rightAvatar={<Avatar src="https://ae01.alicdn.com/kf/HTB1ErJhKFXXXXaJXXXXq6xXFXXXQ/Beige-Chinese-Lady-Wu-Shu-Uniform-Women-s-Cotton-Long-Sleeve-Kung-fu-Tai-Chi-Suit.jpg_640x640.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Marge S."
        rightAvatar={<Avatar src="https://vignette.wikia.nocookie.net/simpsons/images/b/b4/Glasses.png/revision/latest/scale-to-width-down/180?cb=20140323083040" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Raquel Parrado"
        rightAvatar={<Avatar src="https://pixel.nymag.com/imgs/daily/vulture/2018/01/04/04-new-girl.w190.h190.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
    </List>

  </div>
);


export default MembersOnline;
