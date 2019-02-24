/**
 * @public
 * @name getPages
 * @description
 *
 * Looping through an array and find an entry require filtering. Find recursively a (`routes`) won't look nice in your code.
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
 *   routes: [
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
 * @param {object} [pages={}] - an object pages to expand
 * @param {string} [childKey=routes] - the children key used for flattening pages
 * @return {object} pages - a pages object
 * @example
 * `routes` are flattened in parent `[parent][route.name]` and are kept in `[parent].routes` for faster accessibility.
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
 *     routes: [
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
 *     routes: [
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
export default function getPages(routeConfig, pages = {}, childKey = 'routes') {
  const copy = [...routeConfig];
  function addRoutes(routes, parent) {
    const innerCopy = [...routes];
    innerCopy.forEach((route) => {
      const r = { ...route };
      parent[r.name] = r; // eslint-disable-line no-param-reassign
      route[childKey] && addRoutes(route[childKey], r); // eslint-disable-line no-unused-expressions
    });
  }
  addRoutes(copy, pages);
  return pages;
}
