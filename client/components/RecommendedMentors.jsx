import React, { Component } from 'react';
import axios from 'axios';
import { recommendationSystem } from '../../database/Recommendations/recommendationSystem';

export default class RecommendedMentors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommended: []
    }
  }

  componentDidMount() {
    axios.get('/generateMessages')

    recommendationSystem((recommendedMentors) => {
      this.setState({
        recommended: recommendedMentors
      });

      console.log('This is recommendedMentors', recommendedMentors)
    });
  }
  
  render() {
    return(
      <div>
        This is recommendations
      </div>
    );
  }
};