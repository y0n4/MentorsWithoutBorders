import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';

export default class SelectedMentors extends Component {
  render() {
    let mentor = this.props.mentor;

    return (
      <div className='eachMentor'>
        <ListItem>
          <Avatar src={mentor.picture.thumbnail} className='theAvatar' />
            <div className='theName'>
              <h2>{`${mentor.name.first} ${mentor.name.last}`}</h2> 
            </div>
            <div className='state'>
              <h3>{mentor.location.state}</h3> 
            </div>
        </ListItem>
        {console.log(this.props.mentor)}
      </div>
    );
  }
};
