import React, { Component } from 'react'
import { VectorMap } from 'react-jvectormap';
import Map from './Map'

class Home extends React.Component {
  render() {
    return (
    <div className="world-map">
      <Map />
    </div>
    );
  }
}

export default Home;
