import React, { Component } from 'react';

export default class SelectedMentors extends Component {
  render() {
    return (
      <div className='eachMentor'>
        <img src={this.props.mentor.picture.thumbnail} />
      </div>
    );
  }
};
