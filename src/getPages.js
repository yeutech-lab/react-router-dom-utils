/**
 * @public
 * @name getPages
 * @description
 *
 * Looping through an array and find an entry require filtering. Find recursively a (`childRoutes`) won't look nice in your code.
 *
 * it turn your array of `routes` into a `pages` object that can be used to access any `path`.
 *
 * ```js
 * const getPages = require('$PACKAGE_NAME/lib/getPages');
 * const routes = [{
 *   name: 'dashboard',
 *   redirect: true,
 *   from: '/dashboard',
 *   to: '/',
 *   description: 'Dashboard',
 *   childRoutes: [
 *     {
 *       name: 'users',
 *       path: '/users',
 *       description: 'List users',
 *     },
 *   ],
 * }];
 * <div>
 *   <h2>routes:</h2>
 *   <pre>
 *     {JSON.stringify(routes, null, 2)}
 *   </pre>
 *   <h2>pages:</h2>
 *   <pre>
 *     {JSON.stringify(getPages(routes), null, 2)}
 *   </pre>
 * </div>
 * ```
 *
 * @param {Array} routeConfig - a list of route configuration
 * @param {object} [default={}] pages - an object pages to expand
 * @return {object} pages - a pages object
 * @example
 * `childRoutes` are flattened in parent `[parent][route.name]` and are kept in `[parent].childRoutes` for faster accessibility.
 *
 * // This is how you would access a specific page in your routes configuration array:
 *
 * const routes = [
 *   {
 *     name: 'dashboard',
 *     redirect: true,
 *     from: '/dashboard',
 *     to: '/',
 *     description: 'Dashboard',
 *     childRoutes: [
 *       {
 *         name: 'users',
 *         path: '/users',
 *         description: 'List users',
 *       },
 *     ],
 *   }
 * ];
 * const page = routes.filter((route) => route.name === 'dashboard')[0]
 *
 * // This is how you do with `getPages`:
 *
 * const { getPages } = require('@yeutech-lab/react-router-dom-utils');
 * const routes = [
 *   {
 *     name: 'dashboard',
 *     redirect: true,
 *     from: '/dashboard',
 *     to: '/',
 *     description: 'Dashboard',
 *     childRoutes: [
 *       {
 *         name: 'users',
 *         path: '/users',
 *         description: 'List users',
 *       },
 *     ],
 *   }
 * ];
 * const pages = getPages(routes);
 * <ul>
 *   <li>{pages.dashboard.description}: {pages.dashboard.from}</li>
 *   <li>{pages.dashboard.users.description}: {pages.dashboard.users.path}</li>
 * </ul>
 *
 *
 */
export default function getPages(routeConfig, pages = {}) {
  const copy = [...routeConfig];
  function addRoutes(routes, parent) {
    const innerCopy = [...routes];
    innerCopy.forEach((route) => {
      parent[route.name] = route; // eslint-disable-line no-param-reassign
      route.childRoutes && addRoutes(route.childRoutes, route); // eslint-disable-line no-unused-expressions
    });
  }
  addRoutes(copy, pages);
  return pages;
}
