import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
import App from "./components/App.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MentorHome from "./components/MentorHome.jsx";
import MenteeHome from "./components/MenteeHome.jsx";
// import App from "./components/App.jsx";

ReactDOM.render(
<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/mentor" component={MentorHome} />
      <Route path="/mentee" component={MenteeHome} />
    </div>
  </Router>,
  </MuiThemeProvider>,
  document.getElementById("app")
);
