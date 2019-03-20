import 'core-js/es/map';
import 'core-js/features/symbol/for';
import merge from 'deepmerge';
import TreeOps from '@yeutech-lab/tree-operations';
import RoutesMap from './RoutesMap';
const defaultOptions = { soft: false, childKey: 'routes' };

/**
 * @public
 * @description
 * This routeMap was created to store a map of all routes within applications.
 *
 * It set routes into a RoutesMap. This map one path to a route configuration.
 *
 * RoutesMap class extends from Map and has a modified get method that permit to get using `/users/1` and get `/users/:id`
 *
 * The path can be seen as the id of the route, and the configuration is what is actually used for the route.
 *
 * To set redirect route, just add from and to instead of path in the redirect route configuration
 *
 * Before adding a route to the map, it will test if the route exist and if it exist, it will merge the configuration.
 *
 * In non soft mode, it can throw error if the route already contain the component or is changing it's name within it's route configuration
 *
 * > We use core-js/es6/map and core-js/fn/symbol/for for old browsers that does not support Map, see https://www.npmjs.com/package/core-js for more information.
 *
 *
 * @param {array} routesConfig - A list of routes configuration object that will be flatten and set in the map
 * @param {RoutesMap} [routesMap=new RoutesMap()] - An optional existing routeMap
 * @param {object} [options={ soft: false, childKey: 'routes' }] - Options to configure getRoutesMap,
 * if options.soft is true, it will skip all errors found during the merge,
 * if options.soft is false, it will throw error if a route already:
 *   - have a component and a second is found
 *   - have a name and different name is found
 *
 * @return {RoutesMap<string, object>} - The routeMap object used for your application
 */
export default function getRoutesMap(routesConfig, routesMap = new RoutesMap(), options = defaultOptions) {
  const { childKey, soft } = { ...defaultOptions, ...options };
  const copy = [...routesConfig];
  const flattenRouteConfigList = TreeOps.toFlatArray(copy, childKey);
  flattenRouteConfigList.forEach((route) => {
    const path = route.path || route.from;
    if (routesMap.has(path)) {
      const existingData = routesMap.get(path);
      if (!soft) {
        if (existingData.component && route.component) {
          throw new Error(`You can't set more than 1 component per path (${path})`);
        }
        if (route.name && existingData.name && route.name !== existingData.name) {
          throw new Error(`You can't set a different name ${existingData.name} and ${route.name} for the route ${path}`);
        }
      }
      routesMap.set(path, merge(existingData, route));
    } else if (path) {
      routesMap.set(path, route);
    }
  });
  return routesMap;
}
