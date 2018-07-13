import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import Mail from './Mail';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class MailDialog extends React.Component {
  render() {
    const {
      classes, onClose, mentors, sendChatRequest, ...other
    } = this.props;

    return (
      <Dialog onClose={onClose} {...other}>
        <DialogTitle>
          Connect with Mentee
        </DialogTitle>
        <div>
          <List>
            {mentors.map(mentor => (
              <ListItem button onClick={() => sendChatRequest(mentor)} key={mentor.id}>
                <ListItemAvatar>
                  <Avatar src={mentor.photo} />
                </ListItemAvatar>
                <ListItemText primary={mentor.fullName} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

const MailDialogWrapped = withStyles(styles)(MailDialog);

class MailVideoConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentors: [],
      menteeHome: true,
      open: false,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.sendChatRequest = this.sendChatRequest.bind(this);
    this.socket = this.props.socket;
  }

  componentDidMount() {
    console.log('mounting');
    const { userId } = this.props;
    this.socket.emit('getMyMentors', userId);
    this.socket.on('mentorsOnline', (mentors) => {
      this.setState({ mentors });
    });
  }

  sendChatRequest(toUserId, e) {
    const { userId } = this.props;
    const data = {
      userId,
      toUserId,
    };
    this.socket.emit('chatRequest', data);
    this.setState({ open: false });
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { mailCount, userId } = this.props;
    const {
      mentors, open,
    } = this.state;
    return (
      <div>
        <Mail mailCount={mailCount} handleClickOpen={this.handleClickOpen} />
        <MailDialogWrapped
          open={open}
          onClose={this.handleClose}
          mentors={mentors}
          sendChatRequest={this.sendChatRequest}
        />
      </div>
    );
  }
}

export default MailVideoConnect;
