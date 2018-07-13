import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import 'babel-polyfill';
import BigFiveChart from './BigFiveChart';
import AnalyzeScore from './AnalyzeScore';


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
    event.preventDefault();
    console.log(this.state.term, 'tweet awayyyy!');
    const res = await axios.post('/result', { twitterHandle: this.state.term });

    const { personality } = await res.data;
    this.setState({ bigFive: personality });
    console.log(this.state.bigFive, 'big five here whatup');
  }

  render() {
    const { bigFive, input } = this.state;
    const { userId } = this.props;

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
        {bigFive ? <BigFiveChart traits={bigFive} /> : 'enter handle and wait' }
        {bigFive && <AnalyzeScore traits={bigFive} userId={userId} />}
      </div>
    );
  }
}


export default PersonalityAnalysis;
