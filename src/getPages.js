import merge from 'deepmerge';
import camelcase from 'lodash.camelcase';
import get from 'lodash.get';
import set from 'lodash.set';

/**
 * @public
 * @description
 * This utility convert a path to a camelCase dotted string.
 * Every parameter within the path will see the colon replaced with a dollar
 * @example
 * camelizePath('users/:id');
 * // users.$id
 * camelizePath('/users/all');
 * // users.all
 * @param {string} path - A valid react router path
 * @return {string} camelizePath - a camel case dotted string representation of the path
 */
export function camelizePath(path) {
  return (path[0] === '/' ? path.slice(1) : path)
    .split('/')
    .map((p) => (p[0] === ':' ? `$${camelcase(p.slice(1))}` : camelcase(p)))
    .join('.');
}

/**
 * @public
 * @description
 * Utility to convert an array of routes configuration into a pages object.
 *
 *```javascript
 * const routesConfig = [{ path: '/', component: Dashboard, alias: 'dashboard' }, { path: '/users', component: UserList }];
 * const pages = getPages(routesConfig);
 * // { dashboard: { path: '/' }, users: { path: '/users' } }
 * ```
 *
 * *Params*
 *
 * `path` with params such as `/users/:id` will be added to `pages` with the colon replaced with the dollar sign.
 *
 * *Alias*:
 *
 * It is possible to duplicate a reference to a route called page alias.
 *
 * `{string|array} alias` that can be set in each `route`.
 *
 * Alias should not use dot (`.`) in their name unless you want to add at the root of the `pages` object,
 * in this case it will use it to traverse within the object to set the value.
 *
 * > The base path `/` can be added to `pages` only if an `alias` exist.
 *
 * @param {Object[]|RoutesMap|Map} routesConfig or routesMap - An array of routes configuration object or a routes map that will be translated into pages
 * @param {object} [pages={}] - A pages object
 * @param {string} [childKey=routes] - When using a routes config, this will be the key used to find nested array of routes configuration object.
 */
export default function getPages(routesConfig, pages = {}, childKey = 'routes') {
  const isRoutesMap = routesConfig instanceof Map;
  [...routesConfig].forEach((routeOrMap) => {
    const route = isRoutesMap ? routeOrMap[1] : routeOrMap;
    const {
      routes: x1, component: x2, path, alias, ...r
    } = route;
    const page = { ...r, path };
    let pageDepth = '';
    if (path) {
      const camelCasePath = camelizePath(path);
      const camelCasePathList = camelCasePath.split('.');
      camelCasePathList.forEach((onePathDepth, i) => {
        if (pageDepth.length && i === camelCasePathList.length - 1) {
          const targetList = [camelCasePath].concat(alias instanceof Array ? alias : [alias]).filter((f) => f);
          targetList.forEach((target) => {
            if (target.includes('.')) {
              set(pages, target, merge(get(pages, target), page));
            } else {
              set(pages, `${pageDepth}.${target}`, merge(get(pages, `${pageDepth}.${target}`), page));
            }
          });
        } else {
          pageDepth = pageDepth.length === 0 ? onePathDepth : `${pageDepth}.${onePathDepth}`;
        }
      });
    }
    route[childKey] && getPages(route[childKey], pages, childKey); // eslint-disable-line no-unused-expressions
  });

  return pages;
}
