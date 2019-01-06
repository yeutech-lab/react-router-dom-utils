import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/**
 * @private
 * @description Will store the list of routes of the app
 * @type {Array}
 */
const list = [];

/**
 * @private
 * @description This utility will check for routes configurations
 * @param routes
 * @returns {Array}
 */
const makeRoutes = (routes) => {
  routes.forEach((route) => {
    if (list.filter((l) => l.key === route.name).length === 0) {
      if (route.from) {
        list.push(<Redirect key={route.name} {...route} />);
      } else {
        list.push(<Route key={route.name} {...route} />);
      }
      if (route.childRoutes) {
        makeRoutes(route.childRoutes);
      }
    }
  });
  return list;
};

/**
 * @public
 * @description Routes component
 * @param {Array} routes
 * @returns {Routes}
 * @constructor
 */
const Routes = ({ routes }) => <Fragment>{makeRoutes(routes)}</Fragment>;

Routes.propTypes = {
  /** An array of route configuration object */
  routes: PropTypes.array.isRequired,
};

export default Routes;
