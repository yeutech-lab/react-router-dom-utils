import { Redirect, Route } from 'react-router-dom';
import React from 'react';

/**
 * @public
 * @description This utility will check for routes configurations
 * @param {Array} routesConfig - list of route configuration
 * @returns {Array} routeList - list of <Route /> and <Redirect />
 * @example
 * const routeList = makeRoutes([{ name: 'home', path: '/home', component: HomePage }])
 * // return [<Route name="home" path="/home" component={HomePage} />]
 */
export default function makeRoutes(routesConfig) {
  const routeList = [];
  function recursive(routes) {
    routes.forEach((route) => {
      if (routeList.filter((l) => l.key === route.name).length === 0) {
        if (route.from) {
          routeList.push(<Redirect key={route.name} {...route} />);
        } else {
          routeList.push(<Route key={route.name} {...route} />);
        }
        if (route.childRoutes) {
          recursive(route.childRoutes);
        }
      }
    });
  }
  recursive(routesConfig);
  return routeList;
}
