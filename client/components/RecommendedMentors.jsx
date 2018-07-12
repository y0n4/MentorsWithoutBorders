import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import CardContent from '@material-ui/core/CardContent';


const styles = {
  card: {
    
  }
};

class RecommendedMentors extends Component {
  constructor(props) {
    super(props);

    this.capitalize = this.capitalize.bind(this);
  }

  capitalize (words) {
    words = words.split(' ');
    let capitalized = [];

    words.forEach((word) => {
      capitalized.push(`${word[0].toUpperCase()}${word.slice(1)}`);
    })

    return capitalized.join(' ');
  }

  render() {
    const { classes } = this.props;

    return(
      <div>
        <Card>
          <CardContent>
            {this.props.recommended.map((mentor, idx) => {
              return (
                <ListItem key={idx} className='recommended'>
                  <Avatar src={mentor.photo} />
                  <h2>{ `${this.capitalize(mentor.fullName)}` }</h2>
                </ListItem>
              );
            })}
          </CardContent>
        </Card>
      </div>
    )
  }
};

RecommendedMentors.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecommendedMentors);