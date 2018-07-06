import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';

export default class SelectedMentors extends Component {

  capitalize (words) {
    words = words.split(' ');
    let capitalized = [];

    words.forEach((word) => {
      capitalized.push(`${word[0].toUpperCase()}${word.slice(1)}`);
    })

    return capitalized.join(' ');
  }

  render() {
    let mentor = this.props.mentor;
  
    return (
      <div className='eachMentor'>
        <ListItem>
          <Avatar src={mentor.picture.thumbnail} className='theAvatar' />
          <div className='theName'>
            <h2>{`${this.capitalize(`${mentor.name.first} ${mentor.name.last}`)}`}</h2> 
          </div>
          <div className='state'>
            <h3>{`${this.capitalize(mentor.location.state)}`}</h3> 
          </div>
          <div className='aQuote'>
            <h2>A pretty cool quote from the mentor can go here...</h2>
          </div>
          <div className='startChat'>
            <i className='far fa-comments fa-2x chatBubble' />
          </div>
          <div className='addMentorFA'>
            <i className='fas fa-user-plus fa-2x addMentor'></i>
          </div>
          <div className='profileFA'>
            <i className='far fa-id-card fa-2x viewProfile'></i>
          </div>
        </ListItem>
        {/* {console.log(this.props.mentor)} */}
      </div>
    );
  }
};