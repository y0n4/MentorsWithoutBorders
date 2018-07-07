import React, { Component } from 'react';
import axios from 'axios';
import Map from './Map';

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
      <div>
        Map hurrr
      </div>

    );
  }
}

export default Home;
