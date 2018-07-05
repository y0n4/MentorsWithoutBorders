<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import React from 'react';
import Map from './Map';
// import { API } from "../../config.js";

const Home = props => (
  <div>
    what up
    {/* <Map
        locations={[
          { lat: 38, lng: 90 },
          { lat: 60, lng: 70 },
          { lat: 20, lng: 40 }
        ]} // pass in geolocations props
        googleMapURL={API.googleMapUrl}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%`, width: `50%` }} />}
      /> */}
  </div>
);
>>>>>>> added userprofile, mentee home
=======
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
>>>>>>> merge

export default Home;
