import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import $ from 'jquery';

class PersonalityTrait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();


    console.log(this.state.term, 'sending this handle to twitter!');
    axios.post('/result', { twitterHandle: this.state.term })

      .then((res) => {
        console.log(res, 'this is the response');
        console.log(res.data);
      });
  }

  render() {
    return (
      <div>

        <form onSubmit={this.onFormSubmit} className="searchContainer">
          <input
            placeholder="search new mentors"
            className="form-control"
            value={this.state.input}
            onChange={this.onInputChange}
          />
          <span className="submitButton">
            <Button type="submit" className="btn btn-secondary">
Go!
            </Button>
          </span>
        </form>
      </div>
    );
  }
}

export default PersonalityTrait;
