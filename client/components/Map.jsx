import React from 'react';
import { VectorMap } from 'react-jvectormap';
import axios from 'axios';

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
}

export default Map;
