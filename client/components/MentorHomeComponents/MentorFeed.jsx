import React, { Component } from 'react';

function MentorFeed(props) {
  return (
    <div className="mentee-qs">
      <img src={props.info.photo} className="feed-icon" alt=""/>
      <div className="feed-post">
      <strong>
        {props.info.fullName}
      </strong>
        <br />
        <br />
        {props.info.question}
      </div>
    </div>
  );
}

export default MentorFeed;
