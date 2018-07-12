import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import 'babel-polyfill';
import BigFiveChart from './BigFiveChart';


class PersonalityAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {

      term: '',
      bigFive: null,

    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  async onFormSubmit(event) {
    const { term } = this.state;
    event.preventDefault();
    console.log(term, 'tweet awayyyy!');
    const res = await axios.post('/result', { twitterHandle: term });

    const { personality } = await res.data;

    this.setState({
      bigFive: personality,
      term: '',
    });
    console.log(term, this.state.bigFive);
  }

  render() {
    const { bigFive, input } = this.state;

    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="searchContainer">
          <div style={{ color: 'white', fontSize: 18 }}>
@
            {' '}

            <input
              placeholder="enter twitter handle"
              className="form-control"
              value={input}
              onChange={this.onInputChange}
            />
            <span className="submitButton">
              <Button type="submit">
Go!
              </Button>
            </span>
          </div>
        </form>
        {bigFive && <BigFiveChart traits={bigFive} /> }
      </div>
    );
  }
}


export default PersonalityAnalysis;
