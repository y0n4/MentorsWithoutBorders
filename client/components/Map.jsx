import React from 'react';
import { VectorMap } from 'react-jvectormap';
import axios from 'axios';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
      />
    );
  }
}

export default Map;
