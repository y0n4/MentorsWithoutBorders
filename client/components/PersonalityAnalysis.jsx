import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'babel-polyfill';

class PersonalityAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      bigFive: null,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.chart = this.chart.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  async onFormSubmit(event) {
    event.preventDefault();
    console.log(this.state.term, 'tweet awayyyy!');
    const res = await axios.post('/result', { twitterHandle: this.state.term });

    const { personality } = await res.data;
    this.setState({ bigFive: personality });
    console.log(this.state.bigFive, 'big five here whatup');
  }

  chart() {
    const { bigFive } = this.state;
    if (bigFive !== null) {
      const traits = bigFive.map(trait => trait.percentile);
      console.log(traits);
    }
  }

  render() {
    const { bigFive } = this.state;

    return (
      <div>
        {/* {this.chart} */}

        <form onSubmit={this.onFormSubmit} className="searchContainer">
          <div style={{ color: 'white', fontSize: 18 }}>
@
            {' '}

            <input
              placeholder="enter twitter handle"
              className="form-control"
              value={this.state.input}
              onChange={this.onInputChange}
            />
            <span className="submitButton">
              <Button type="submit" className="btn btn-secondary">
Go!
              </Button>
            </span>
          </div>
        </form>
        {/* {bigFive !== null && (
        <Pie
          data={'bigFive.map((trait)) => trait.percentile)'}
          options={{
            maintainAspectRatio: false,
          }}
          height={500}
          width={700}
        />
        )} */}

        {bigFive !== null && bigFive.map(trait => (
          <div key={trait.percentile}>

            {trait.name}
:
            {' '}
            {trait.percentile}

          </div>
        ))}
      </div>
    );
  }
}

export default PersonalityAnalysis;
