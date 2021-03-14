import React, { useContext } from 'react';
import { AuthContext, IProvider } from '../context/auth/AuthState';

import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext as IProvider;

  const { component: Component, ...rest } = props;

  // If not authenticated but found token, try to get user from server with that token
  if (!isAuthenticated && localStorage.lifts_token) {
    authContext?.loadUser();
  }

  return (
    <Route
      {...rest}
      render={routeProps =>
        isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
