import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RecommendedMentors from '../RecommendedMentors';
import { recommendationSystem } from '../../../database/Recommendations/recommendationSystem';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      input: '',
      recommended: []
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    // axios.get('/generateMessages')

    recommendationSystem((recommendedMentors) => {
      this.setState({
        recommended: recommendedMentors
      });
    });
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
        {(this.state.recommended.length === 0) ? null : 
          (
          <div>
            <h1>Recommended for You</h1>
            <RecommendedMentors recommended={this.state.recommended} />
          </div>
          )
        }
      </div>  
    );
  }
}
