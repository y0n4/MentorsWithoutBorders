import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';

class MentorSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return ( 
      <div className="mentor-descrip">
      <h2>So you want to be a mentor, eh?</h2>
        Anyone can be a mentor in our community. Become a mentor and feel the external satisfaction of helping a mentee grow and hone their experience in your field! Not only are you giving, you may even feel like you are also learning along the way! <br />
        <br />

        Please fill out the form below.
      </div>
    )
  }
}

export default MentorSignUp;