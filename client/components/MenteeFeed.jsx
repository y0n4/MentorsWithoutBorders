import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: 'black',
  },
});


const MenteeFeed = (props) => {
  const { classes } = props;
  return (
    <div>
      <div className="mentee-quotes">
        <img src="https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?cs=srgb&dl=adult-beautiful-blonde-324658.jpg&fm=jpg" width="50" height="50" className="feed-icon" alt="" />
        <div className="feed-post">
          <strong>
        Britney P.
          </strong>
          <br />
          <br />
          Good, better, best. Never let it rest. 'Til your good is better and your better is best.
        </div>
      </div>

      <div className="mentee-qs">
        <img src="https://cdn.vox-cdn.com/thumbor/Toruw3D8PqV1BvMpAoB9UgPMII4=/0x0:5221x3481/920x613/filters:focal(2064x1785:2898x2619):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/59410935/GettyImages_642908826.0.jpg" width="50" height="50" className="feed-icon" alt="" />
        <div className="feed-post">
          <strong>
        Helen Keller
          </strong>
          <br />
          <br />
          Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.
        </div>
      </div>

      <div className="mentee-qs">
        <img src="http://i673.photobucket.com/albums/vv99/mynyankoworld/Nyanko/NyankoCreamPuffy1.jpg" width="50" height="50" className="feed-icon" alt="" />
        <div className="feed-post">
          <strong>
        Foodie Queen
          </strong>
          <br />
          <br />
I want to film myself eating out in restuarants so that my viewers can relate to me and not feel lonely when eating alone but I'm afraid that passerbys will think weirdly of me
        </div>
      </div>
    </div>
  );
};


export default withStyles(styles)(MenteeFeed);
