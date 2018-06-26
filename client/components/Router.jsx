import React from "react";

import { Switch, Route } from "react-router-dom";

import MentorHome from "./MentorHome.jsx";
import MenteeHome from "./MenteeHome.jsx";

const Header = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/mentor" component={MentorHome} />
      <Route path="/mentee" component={MenteeHome} />
    </Switch>
  </main>
);

export default Header;
