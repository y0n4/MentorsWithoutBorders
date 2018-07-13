import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';


const PrivateRoute = ({
  component: Component, path: Path, isUserOn, ...rest
}) => (
  <Route
    path={Path}
    isUserOn={isUserOn}
    {...rest}
    render={props => (isUserOn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />))
    }
  />
);

export default withRouter(PrivateRoute);
