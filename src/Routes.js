import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import makeRoutes from './makeRoutes';

/**
 * @description Routes component
 * @param {object} props -  props with props.routes a routes configuration array
 * @returns {Routes}
 * @constructor
 */
const Routes = ({ routes }) => <Fragment>{makeRoutes(routes)}</Fragment>;

Routes.propTypes = {
  /** An array of routes configuration */
  routes: PropTypes.array.isRequired,
};

export default Routes;
