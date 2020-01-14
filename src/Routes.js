import React from 'react';
import PropTypes from 'prop-types';
import makeRoutes from './makeRoutes';

/**
 * @description
 * Generate all Routes components for your application, it can be used within a Switch.
 * @param {object|Map<string, object>|RoutesMap<string, object>} routes -  an array of routes configuration a map or a routes map
 * @returns {Route[]}
 * @constructor
 */
const Routes = ({ routes }) => <>{makeRoutes(routes)}</>;

Routes.propTypes = {
  /** An array of routes configuration object or a routes Map */
  routes: PropTypes.oneOfType([
    PropTypes.instanceOf(Map),
    PropTypes.array,
  ]).isRequired,
};

export default Routes;
