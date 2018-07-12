import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import 'babel-polyfill';


export default class BigFiveChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: null,
    };
  }

  componentDidMount() {
    const { traits } = this.props;
    console.log(traits);
    const name = [];
    const score = [];
    traits.forEach((trait) => {
      name.push(trait.name);
      score.push(Math.round(trait.percentile * 100));
    });
    this.setState({
      Data: {
        labels: name,
        datasets: [
          {
            label: 'big five personality',
            data: score,
            backgroundColor: [
              '#D3E7ED',
              '#E6D3ED',
              '#DAEDD3',
              '#F3F7C3',
              '#F2E0DA',

            ],
            hoverBackgroundColor: [
              '#B6C1E3',
              '#B6C1E3',
              '#B6C1E3',
              '#B6C1E3',
              '#B6C1E3',
            ],
          },
        ],
      },
    });
  }


  render() {
    const { Data } = this.state;
    const options = {
      maintainAspectRatio: false,
    };
    return (
      <div>
        <Pie
          data={Data}
          width={400}
          height={400}
          options={options}
        />

      </div>
    );
  }
}
