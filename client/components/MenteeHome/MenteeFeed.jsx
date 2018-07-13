import React, { Component } from 'react';

function MenteeFeed(props) {
  return (
    <div className="mentee-qs">
      <img src={props.info.photo} className="feed-icon" alt=""/>
      <div className="feed-post">
      <strong>
        {props.info.fullName}
      </strong>
        <br />
        <br />
        {props.info.quote}
      </div>
    </div>
  );
}

export default MenteeFeed;
