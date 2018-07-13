import React from 'react';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';

function Mail(props) {
  const { mailCount, handleClickOpen } = props;

  if (mailCount) {
    return (
      <IconButton onClick={handleClickOpen}>
        <Badge badgeContent={mailCount} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
    );
  } return (
    <IconButton onClick={handleClickOpen}>
      <MailIcon />
    </IconButton>
  );
}

export default Mail;
