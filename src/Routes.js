import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import makeRoutes from './makeRoutes';

/**
 * @description
 * Generate all Routes components for your application, it can be used within a Switch.
 * @param {object|Map<string, object>} props -  props with props.routes an array of routes configuration or a routes map
 * @returns {Route[]}
 * @constructor
 */
const Routes = ({ routes }) => <Fragment>{makeRoutes(routes)}</Fragment>;

Routes.propTypes = {
  /** An array of routes configuration object or a routes Map */
  routes: PropTypes.oneOfType([
    PropTypes.instanceOf(Map),
    PropTypes.array,
  ]).isRequired,
};

export default Routes;
