import React from "react";
import Map from "./Map.jsx";
// import { API } from "../../config.js";
import VectorMap from 'react-jvectormap';

const Home = props => {
  return (
    <div style={{ width: 500, height: 500 }}>
      <VectorMap map={'world_mill'}
        backgroundColor="#dfebf6"
        ref="map"
        containerStyle={{
          width: '100%',
          height: '100%'
        }}
        containerClassName="map"
      />
    </div>
  );
};

export default Home;
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