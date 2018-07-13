import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
        {(this.state.recommended.length === 0) ? null : 
          (
          <div>
            <h1>Recommended for You</h1>
            <RecommendedMentors recommended={this.state.recommended} />
          </div>
          )
        }
        <Button size="large" variant='contained' color='primary' className="btn btn-secondary" component={Link} to='/searchResults'>
          Show Me More Mentors!
        </Button>
      </div>  
    );
  }
}
