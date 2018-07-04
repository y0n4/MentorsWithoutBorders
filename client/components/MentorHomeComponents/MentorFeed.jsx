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


function MentorFeed(props) {
  const { classes } = props;
  return (
    <div>
    <div className="mentee-qs">
      <img src="http://i64.tinypic.com/20uwyl0.jpg" width="50" height="50" className="feed-icon" alt=""/>
      <div className="feed-post">
      <strong>
        Wade Watts
      </strong>
        <br />
        <br />
I really want to start a mukbang channel, should I eat silently or have a full blown conversation?
      </div>
    </div>

    <div className="mentee-qs">
      <img src="https://bloximages.newyork1.vip.townnews.com/lancasteronline.com/content/tncms/assets/v3/editorial/5/8c/58c86ab4-ecb1-11e3-bc18-001a4bcf6878/53906a000a1b2.image.jpg" width="50" height="50" className="feed-icon" alt=""/>
      <div className="feed-post">
      <strong>
        Samantha Zapit
      </strong>
        <br />
        <br />
Are people more satisfied if I eat junk food? I'm not trying to gain weight for the expense of pleasing others (unless the number of views are worth it).
      </div>
    </div>

      <div className="mentee-qs">
      <img src="http://i673.photobucket.com/albums/vv99/mynyankoworld/Nyanko/NyankoCreamPuffy1.jpg" width="50" height="50" className="feed-icon" alt=""/>
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
} 

MentorFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MentorFeed);

{/* <div className="mentee-qs">
<img src="http://i64.tinypic.com/20uwyl0.jpg" width="50" height="50" className="feed-icon" />
<div className="feed-post">
<strong>Samantha Carlson</strong><br /><br />
Is it a weird idea to film myself eating in silence at the park? I'm afraid what passerbys will think of me.
</div>
</div> */}