import React from "react";
import App from "./components/App.jsx";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MentorHome from "./components/MentorHome.jsx";
import MenteeHome from "./components/MenteeHome.jsx";
// import App from "./components/App.jsx";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/mentor" component={MentorHome} />
      <Route path="/mentee" component={MenteeHome} />
    </div>
  </Router>,
  document.getElementById("app")
);
