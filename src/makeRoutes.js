import { Redirect, Route } from 'react-router-dom';
import React from 'react';

/**
 * @public
 * @description This utility will check for routes configurations
 *
 * ```js
 * import { makeRoutes } from '$PACKAGE_NAME';
 * const Routes = makeRoutes([{ name: 'home', path: '/home', component: () => <div>Home page</div> }]);
 * <div>{Routes[0].props.name} is <code>home</code></div>;
 * ```
 *
 * @param {Array|Map<string,object>|RoutesMap<string,object>} routesConfig - list of route configuration object, a map or a routes map
 * @param {string} [childKey=routes] - the children key used for flattening pages
 * @returns {Array} routeList - list of <Route /> and <Redirect />
 * @example
 * const routeList = makeRoutes([{ name: 'home', path: '/home', component: HomePage }])
 * // return [<Route name="home" path="/home" component={HomePage} />]
 */
export default function makeRoutes(routesConfig, childKey = 'routes') {
  const r = routesConfig instanceof Map ? [...routesConfig.values()] : [...routesConfig];
  const routeList = [];
  function recursive(routes) {
    routes.forEach((route) => {
      const path = route.path || route.from;
      if (!routeList.find((l) => l.key === path)) {
        if (route.from) {
          const {
            to,
            push,
            from,
            exact,
            strict,
          } = route;
          routeList.push(
            <Redirect
              key={from}
              to={to}
              push={push}
              from={from}
              exact={exact}
              strict={strict}
            />
          );
        } else {
          const {
            render,
            children,
            path: routePath,
            exact,
            strict,
            location,
            sensitive,
            component,
          } = route;
          routeList.push(
            <Route
              key={path}
              render={render}
              children={children} // eslint-disable-line react/no-children-prop
              path={routePath}
              exact={exact}
              strict={strict}
              location={location}
              sensitive={sensitive}
              component={component}
            />
          );
        }
        if (route[childKey]) {
          recursive(route[childKey]);
        }
      }
    });
  }
  recursive(r);
  return routeList;
}
