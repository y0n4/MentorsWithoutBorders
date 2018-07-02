import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';


const Map = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={1}
    defaultCenter={{ lat: 39.828, lng: 98.579 }}
  >
    {props.locations.map((mentor, i) => (
      <Marker
        key={i}
        position={{ lat: mentor.lat, lng: mentor.lng }}
      />
    ))}
  </GoogleMap>
)));

export default Map;
