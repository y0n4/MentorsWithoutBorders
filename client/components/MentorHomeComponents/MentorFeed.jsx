import React, { Component } from 'react';

function MentorFeed(props) {
  return (
    <div>
    <div className="mentee-qs">
      <img src="https://lh5.googleusercontent.com/-TmnJQRrW878/AAAAAAAAAAI/AAAAAAAAAIU/KGlHPb0a2_s/photo.jpg?sz=50" className="feed-icon" alt=""/>
      <div className="feed-post">
      <strong>
        yona n
      </strong>
        <br />
        <br />
        I really want to start a mukbang channel, should I eat silently or have a full blown conversation?
      </div>
    </div>

    <div className="mentee-qs">
      <img src="https://lh5.googleusercontent.com/-_jJRpF_XESU/AAAAAAAAAAI/AAAAAAAAAAA/AAnnY7oXu-v_h51SoZ5bstl6IlE2EzPI6Q/mo/photo.jpg?sz=50" className="feed-icon" alt=""/>
      <div className="feed-post">
      <strong>
        Selena Xu
      </strong>
        <br />
        <br />
        Are people more satisfied if I eat junk food? I'm not trying to gain weight for the expense of pleasing others (unless the number of views are worth it).
      </div>
    </div>

      <div className="mentee-qs">
      <img src="https://lh4.googleusercontent.com/-9ra4IoPESgo/AAAAAAAAAAI/AAAAAAAAAIg/9H0_-cuQEMQ/photo.jpg?sz=50" className="feed-icon" alt=""/>
      <div className="feed-post">
      <strong>
        Kav Linkin
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
