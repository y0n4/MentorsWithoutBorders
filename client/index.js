import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
// import injectTapEventPlugin from "react-tap-event-plugin";
// injectTapEventPlugin();
import AppWithRouter from "./components/App.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <AppWithRouter />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("app")
);
