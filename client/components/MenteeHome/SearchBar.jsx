import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);

    this.setState({ input: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
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

    );
  }
}
