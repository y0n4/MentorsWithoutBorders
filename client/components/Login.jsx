import React, { Component } from 'react';
// import $ from 'jquery'; //for request
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '', // ?not needed atm?
    };
    this.findUserInfo = this.findUserInfo.bind(this);
  }

  componentDidMount() {
    console.log(1, 'mounted', this.props);
    this.findUserInfo();
  }

  findUserInfo() {
    axios.get('/home')
      .then((res) => {
        if (res.data.status === 'cookie') {
          console.log(res.data);
          this.props.setUser(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <a href="/auth/google">
<button className="login-btn">
          Sign in
        </button>

        </a>
      </div>
    );
  }
}

export default Login;
