import React from 'react'
import Map from './Map.jsx';
import { API } from '../../config.js';

const Main = (props) => {
  return (
    <div>
      <Map
        locations={props.mentorLocations} // pass in geolocations props
        googleMapURL={API.googleMapUrl}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%`, width: `50%` }} />}
      />
    </div>
  )
}

export default Main;
