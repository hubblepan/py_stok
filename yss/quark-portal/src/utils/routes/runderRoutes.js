import React from 'react';
import Switch from 'react-router/Switch';
import { Route, Redirect } from 'react-router-dom';

const renderRoutes = (routes, authed, authPath, extraProps = {}, switchProps = {}) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            if (!route.restricted || authed || route.path == authPath) {
              return <route.component {...props} {...extraProps} route={route} />;
            }
            const redirPath = authPath ? authPath : '/login';
            return <Redirect to={{ pathname: redirPath, state: { from: props.location } }} />;
          }}
        />
      ))}
    </Switch>
  ) : null;

export default renderRoutes;

////
import Route from 'react-router/Route';

const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) =>
            route.render ? (
              route.render(props)
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }
        />
      ))}
    </Switch>
  ) : null;

export default renderRoutes;
