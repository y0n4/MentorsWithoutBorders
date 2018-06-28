import React, { Component } from "react";
// import $ from 'jquery'; //for request
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: ''
    };
    this.google = this.google.bind(this);

  }

  componentDidMount() {
    console.log(1, 'mounted', this.props);
    this.google();
  }

  google() {
    axios.get('/home')
    .then(res => {
      console.log(res.data.status);
      if(res.data.status === 'cookie') {
        this.props.setUser('is bae');
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <div>
        <a href="/auth/google"><button className="login-btn">
          Sign in
        </button></a>
      </div>
    );
  }
}

export default Login;

//req.session.passport.user.profile.displayName