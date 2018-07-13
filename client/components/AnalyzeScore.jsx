import React, { Component } from 'react';

import axios from 'axios';
import 'babel-polyfill';
import BigFiveChart from './BigFiveChart';


class AnalyzeScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // result: [],
    };
  }

  componentDidMount() {
    this.getRecommendation();
  }

  getRecommendation() {
    let recommendation = [];
    const { traits, userId } = this.props;
    const userTraits = traits.slice();
    // console.log(traits[0]);
    userTraits.forEach((trait) => {
      if (trait.name === 'Openness') {
        // high score
        if (trait.percentile > 0.5) {
          recommendation = recommendation.concat(['curious', 'imaginative', 'untraditional']);
        } else {
          // low score
          recommendation = recommendation.concat(['inartistic', 'realistic', 'practical']);
          // console.log(recommendation);
        }
      } if (trait.name === 'Conscientiousness') {
        if (trait.percentile > 0.5) {
          recommendation = recommendation.concat(['punctural', 'organized', 'self-disciplined', 'hardworking']);
        } else {
          recommendation = recommendation.concat(['unreliable', 'hedonistic', 'careless']);
          // console.log(recommendation);
        }
      } if (trait.name === 'Extraversion') {
        if (trait.percentile > 0.5) {
          recommendation = recommendation.concat(['active', 'optimistic', 'fun-loving', 'affectionate']);
        } else {
          recommendation = recommendation.concat(['quiet', 'unethusiastic', 'sober', 'aloof']);
        }
      } if (trait.name === 'Agreeableness') {
        if (trait.percentile > 0.5) {
          recommendation = recommendation.concat(['good-natured', 'forgiving', 'gullible', 'helpful', 'forgiving']);
        } else {
          recommendation = recommendation.concat(['rude', 'uncooperative', 'irritable', 'assertive']);
        }
      } if (trait.name === 'Emontional range') {
        if (trait.percentile > 0.5) {
          recommendation = recommendation.concat(['insecure', 'hypochondriacal', 'incompetent']);
        } else {
          recommendation = recommendation.concat(['calm', 'unemotional', ' secure', 'self-satisfied']);
        }
      }
      console.log(userId, 'this is usserrrr');
      axios.post('/recommend', {
        personality: recommendation,
        userId,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  render() {
    return (
      <div>
        {/* {this.getRecommendation} */}
      </div>
    );
  }
}


export default AnalyzeScore;


// source:
// http://nobaproject.com/modules/personality-traits
