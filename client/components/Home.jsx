import React, { Component } from 'react';
import Map from './Map';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // func to get users location using api call
  componentDidMount() {
    // console.log('oi');
    // // then save to db
    // axios({
    //   method:'get',
    //   url:'https://geoip-db.com/jsonp',
    //   responseType:'json'
    // })
    // .then(function(response) {
    //   console.log('geolocation', response);
    // });
  }

  render() {
    return (
        <Map />
    );
  }
}

export default Home;
