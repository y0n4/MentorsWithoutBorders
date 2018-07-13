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
  }
 
  render() {
    return (
    <div className="world-map">
      <Map />
    </div>
    );
  }
}

export default Home;
