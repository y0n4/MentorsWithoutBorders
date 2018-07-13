import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
        <div
          className="descriptionBig5"
          style={{
            font: 'Georgia', textAligh: 'center', padding: 20, boxSizing: 'border-box',
          }}
        >
          <p>
Understanding your personality can help us give you better recommendations.
          </p>

          <p>
Let's find out your Big 5 personality!
          </p>

        </div>
        <form onSubmit={this.onFormSubmit} className="searchContainer" style={{ marginTop: '20px', marginBottom: '30px', textAlign: 'center' }}>
          <div style={{ color: '#7ed6c8', fontSize: '29px' }}>
@
            {' '}
            <input

              placeholder="enter twitter handle"
              className="form-control"
              name="@"
              value={input}
              height={400}
              fontSize="15px"
              onChange={this.onInputChange}
            />
            <span className="submitButton">
              <Button type="submit" style={{ fontSize: '20px' }}>
Go!
              </Button>
            </span>
          </div>
        </form>
        {bigFive && <BigFiveChart traits={bigFive} />}
        {bigFive && <AnalyzeScore traits={bigFive} userId={userId} />}
      </div>
    );
  }
}


export default withRouter(PersonalityAnalysis);
