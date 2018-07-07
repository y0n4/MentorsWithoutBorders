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
  }

  render() {
    return (
    <div className="world-map">
      {/* <Map /> */}
    </div>
    );
  }
}

export default Home;