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
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="search for mentor"
          className="form-control"
          value={this.state.input}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <Button type="submit" className="btn btn-secondary">
Submit
          </Button>
        </span>
      </form>

    );
  }
}
