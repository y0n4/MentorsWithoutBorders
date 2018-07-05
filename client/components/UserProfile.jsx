import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: 'Jack Daniel',
        biography: '26 year old Designer / Developer living in Stockholm. Originally from Oxford, England. Love to make stuff.',
      },
      image: 'https://www.cheapflights.co.za/news/wp-content/uploads/2017/11/6-things-south-africans-need-to-know-before-travel-05-620x414.jpg',
      quote: {
        content: 'Beautiful things don\'t ask for attention',
        source: 'The Secret Life of Walter Mitty',
      },

    };
  }

  render() {
    return (
      <div className="UserProfile">
        {/* <img src={this.state.image} alt="Paris" width="300" height="300" /> */}
        <Profile person={this.state.person} img src={this.state.image} quote={this.state.quote} />
      </div>
    );
  }
}

// function Image(props) {
//   return (
//     <div
//       className="Image"
//       style={{
//         width: '40%',
//         height: '400px',
//         img: `url(${props.src})`,
//       }}
//     />
//   );
// }
function Profile(props) {
  return (
    <div className="Profile">
      <h1 className="Name">
        {props.person.name}
      </h1>
      <p className="Bio">
        {props.person.biography}
      </p>
      <div className="Quote">
        <blockquote>
&ldquo;
          {' '}
          {props.quote.content}
          {' '}
&rdquo;
        </blockquote>
        <div className="byline">
&mdash;
          {' '}
          {props.quote.source}
        </div>
      </div>

    </div>
  );
}

export default UserProfile;
