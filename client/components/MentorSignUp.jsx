import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';

class MentorSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMentor: this.props.isMentor,
      userId: this.props.userId,
    }
    this.isMentorNow = this.isMentorNow.bind(this);
  }

  isMentorNow() {
    console.log('clicked', this.state.userId);
    this.setState({ isMentor: true });

    axios.post('/mentorUpdate', {userId: this.state.userId})
      .then((res) => {
        console.log(res);
      });
  }

  checkMentor() {
    if (!this.state.isMentor) {
      return (
        <div className="mentor-descrip">
          <h2>So you want to be in our mentoring community?</h2>

          Anyone can be a mentor in our community. It feels so rewarding when helping a fellow mentee grow, gain knowledge, and be thankful for your efforts! Not only are you giving, you are also learning to be patient, understanding, and more about yourself along the way. <br />
          <br />
  
          Simply click on the button below!<br /><br />
          <button className="login-btn" onClick={this.isMentorNow}>
            Sign me up!
          </button>
        </div>
      );
    } else {
      return (
        <div className="mentor-descrip">
          <h2>Congrats you're a mentor!</h2>
          Thanks for singing up! You now have access to Mentor Mode and see questions posted by mentees around the world! You can view these questions in all categories or filtering them out with specific ones instead. Just chat with them to answer their question!<br /><br />
          <button className="login-btn">
          <Link to="/mentor">
            Let's go!
          </Link>
          </button>
        </div>
      );
    }
  }

  render() {
    return ( 
      <div>
        {this.checkMentor()}
      </div>
    )
  }
}

export default MentorSignUp;