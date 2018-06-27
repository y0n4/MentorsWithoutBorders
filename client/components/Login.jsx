import React, { Component } from "react";
// import $ from 'jquery'; //for request
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    // this.state = {

    // };
  }

  userLogin() {
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
    return <a href="/auth/google"><button className="login-btn">Sign in</button></a>
  }
}

export default Login;

