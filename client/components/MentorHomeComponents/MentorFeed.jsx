import React, { Component } from 'react';

function MentorFeed(props) {
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

export default MentorFeed;
