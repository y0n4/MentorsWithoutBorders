import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { VectorMap } from 'react-jvectormap';
import axios from 'axios';
=======
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
>>>>>>> added userprofile, mentee home
=======
import { VectorMap } from 'react-jvectormap';
import axios from 'axios';
>>>>>>> merge

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> merge
    }
    this.addData = this.addData.bind(this);
  }
  componentDidMount() {
    // this.addData();
    // axios.get('/mentor-count')
    //   .then(({data}) => {
    //     this.refs.map.getMapObject().regionsData = data.mapData
      // })
  }

  addData() {
    // console.log(this.refs.map.getMapObject())
    // console.log(this.refs.map.getMapObject().scale = ['#C8EEFF', '#0071A4']);
  }

  render() {
    return (
      <VectorMap
        map="world_mill"
        className="world-map"
        ref="map"
        backgroundColor="clear"
        containerStyle={{
          width: '100%',
          height: '100%',
        }}
        containerClassName="map"
<<<<<<< HEAD
      />
    );
  }
}
=======
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
>>>>>>> added userprofile, mentee home
=======
      />
    );
  }
}
>>>>>>> merge

export default Map;
