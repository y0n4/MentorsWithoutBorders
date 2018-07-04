import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import VectorMap from 'react-jvectormap';

class Map extends React.Component {
  changeBg() {
    this.refs.map.setBackgroundColor('red');
  }

  render() {
    return (
      <div style={{ width: 500, height: 500 }}>
        <VectorMap
          map="world_mill"
          backgroundColor="#3b96ce"
          ref="map"
          containerStyle={{
            width: '100%',
            height: '100%',
          }}
          containerClassName="map"
        />
      </div>
    );
  }
}
// const Map = withScriptjs(withGoogleMap(props => (
//   <GoogleMap
//     defaultZoom={1}
//     defaultCenter={{ lat: 39.828, lng: 98.579 }}
//   >
//     {props.locations.map((mentor, i) => (
//       <Marker
//         key={i}
//         position={{ lat: mentor.lat, lng: mentor.lng }}
//       />
//     ))}
//   </GoogleMap>
// )));

export default Map;
