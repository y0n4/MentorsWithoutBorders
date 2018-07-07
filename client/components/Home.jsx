import React, { Component } from 'react';
import Map from './Map';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  render() {
    return (
        <Map />
    );
  }
}

export default Home;
