import React from 'react';
import { VectorMap } from 'react-jvectormap';
import axios from 'axios';

<<<<<<< HEAD
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
        this.setState({point: res.data});
        // console.log(this.state.userLocation);
      })
      .catch((err) => {
        console.error(err);
      });
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
=======
let mapData = {
    AU: 5,
    BR: 5,
    CA: 5,
    DE: 5,
    FR: 5,
    GB: 5,
    GE: 5,
    IN: 5,
    RO: 5,
    RU: 5,
    US: 5,
    AL: 5,
    DZ: 5,
    AO: 5,
    AR: 5,
    AM: 5,
    AU: 5,
    AT: 5,
    AZ: 5,
    BS: 5,
    BD: 5,
    BY: 5,
    BE: 5,
    BZ: 5
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: '',
        }
        this.addData = this.addData.bind(this);
        this.renderMap = this.renderMap.bind(this);
    }
      .catch((err) => {
    console.error(err);
});
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
>>>>>>> Remove submit button @ chat
}

export default Map;