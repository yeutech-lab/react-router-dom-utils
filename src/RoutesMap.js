/**
 * @public
 * @description
 * RoutesMap class extend Map class and has an edited get method to retrieve route from parameterized path.
 *
 * Be aware that the `has` method will still check for the exact match.
 *
 * See: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map/get
 *
 * ```js
 * const { RoutesMap } = require('$PACKAGE_NAME');
 * const routesMap = new RoutesMap([
 *  ['/', { name: 'Home' }],
 *  ['/users/:id', { name: 'EditUser' }],
 * ]);
 * // get as usual (See https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map/get)
 * const home = routesMap.get('/');
 * // get as usual
 * const editUser = routesMap.get('/users/:id');
 * // this is a valid path id
 * const editUserCc = routesMap.get('/users/1');
 * // this is invalid path id but RoutesMap can get it
 * <pre>
 *   routesMap.get('/users/1'):
 *
 *   {JSON.stringify(editUser, null, 2)}
 * </pre>
 */
export default class RoutesMap extends Map {
  /**
   * @public
   * @override
   * @description
   * The get method can get a routes that use params using a path with params set.
   * @param key - It can get from the usual key or a routes with params such as `/users/1`
   * @return {V} - The route configuration object of the route, or undefined if not found
   */
  get(key) {
    let match;
    // exact match
    if (this.has(key)) return super.get(key);

    // not exact match, need to apply logic
    for (let route of this.keys()) { // eslint-disable-line no-restricted-syntax, prefer-const
      const reg = new RegExp(`^${route.replace(/:[-\w.]+/g, '\\w+')}$`);
      if (!match && reg.test(key)) match = route;
    }
    return super.get(match);
  }
}
