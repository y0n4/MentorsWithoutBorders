import React, { Component } from 'react';
import { recommendationSystem } from '../../database/Recommendations/recommendationSystem';

export default class RecommendedMentors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommended: []
    }
  }

  componentDidMount() {
    recommendationSystem()
  }
  
  render() {
    return(
      <div>
        This is recommendations
      </div>
    );
  }
};