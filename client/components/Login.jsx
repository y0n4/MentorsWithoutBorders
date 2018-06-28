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
    console.log(1, 'mounted');
    this.google();
  }

  google() {
    axios.get('/home')
    .then(res => {
      console.log(res.data.status);
      if(res.data.status === 'cookie') {
        this.setState({login: true});
      }
    })
    .catch(err => {
      console.error(err);
    });
    // $.ajax({
    //   url: '/auth/google',
    //   type: 'GET',
    //   contentType: 'application/json',      success: (loc) => {
    //     console.log('worked');
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   },
    // });
    
    // axios.get('/auth/google')//endpoint
    //   .then(res => {
    //     console.log('worked!!');
    //   })
    //   .catch(err => {
    //     console.log('too bad :(');
    //   });
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

