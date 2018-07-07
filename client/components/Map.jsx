import React from 'react';
import { VectorMap } from 'react-jvectormap';
import axios from 'axios';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      point: [],
      ready: '',
    }
    this.addData = this.addData.bind(this);
    this.renderMap = this.renderMap.bind(this);
  }

  addData() {
    // console.log(this.refs.map.getMapObject())
    // console.log(this.refs.map.getMapObject().scale = ['#C8EEFF', '#0071A4']);
  }

  componentDidMount() {
    axios.get('/map')
      .then((res) => {
        console.log('got it', res.data);
        this.setState({point: res.data});
        // console.log(this.state.userLocation);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(this.state.point);
  }

  renderMap(data) {
    return (
      <VectorMap
        map="world_mill"
        ref="map"
        backgroundColor="clear"
        containerStyle={{
          width: '100%',
          height: '100%',
        }}
        containerClassName="map"
        markers={data}
      />
    );
  }

  render() {
    return (
      <div className="world-map">
      {this.state.point.length < 1 ? <div>Nada</div> : this.renderMap(this.state.point)}
      </div>
    )
  }
}

export default Map;
