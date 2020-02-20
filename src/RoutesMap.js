import PathToRegex from 'path-to-regex';

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
 * import { RoutesMap } from '$PACKAGE_NAME';
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
   * @return {*} - The route configuration object of the route, or undefined if not found
   */
  get(key) {
    const resultList = [];
    if (this.has(key)) return super.get(key);
    for (let path of this.keys()) { // eslint-disable-line no-restricted-syntax, prefer-const
      const parser = new PathToRegex(path);
      const result = parser.match(key);
      if (result) {
        resultList.push(path);
      }
    }

    if (resultList.length === 0) {
      return undefined;
    }
    const match = super.get(resultList[0]);
    if (resultList.length > 1) {
      console.log(`You have multiple route that match "${key}" in your configuration
       Please verify your configuration:
       
       ${JSON.stringify(resultList, null, 2)}
       
       We have selected the first match ${JSON.stringify(match, null, 2)}
       
       You can ask support by opening a new issue: https://github.com/yeutech-lab/react-router-dom-utils/issues/new 
       `); // eslint-disable-line no-console
    }
    return match;
  }
}
