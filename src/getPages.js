import merge from 'deepmerge';
import camelcase from 'lodash.camelcase';
import get from 'lodash.get';
import set from 'lodash.set';
import omit from 'lodash.omit';

/**
 * @public
 * @description
 * This utility convert a path to a camelCase dotted string.
 * Every parameter within the path will see the colon replaced with a dollar sign.
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

/** This will be default options applied in getPages */
const defaultOptions = {
  filters: ['component', 'routes'],
  childKey: 'routes',
  home: {
    page: 'home',
    path: '/',
  },
};

/**
 * @public
 * @description
 * Utility to convert an array of routes configuration or a routes map into a pages object that can be used to create link to page.
 * It use the `route.path` to determinate a camelcase key dotted name and append it in a nested object.
 * It also read for `route.page` to create page aliases.
 * It is recommended to inject `pages` into the application context so Link component can quickly access it..

 *```js
 * const routesConfig = [{ path: '/', component: Dashboard, page: 'dashboard' }, { path: '/users', component: UserList }];
 * const pages = getPages(routesConfig);
 * const pages2 = getPages(getRoutesMap(routesConfig));
 * <div>
 *  <h2>It work with routes config</h2>
 *  <pre>{JSON.stringify(pages, null, 2)}</pre>
 *  <h2>It work with routes map</h2>
 *  <pre>{JSON.stringify(pages2, null, 2)}</pre>
 * </div>
 * ```
 *
 * Params
 *
 * `path` with params such as `/users/:id` will be added to `pages` with the colon replaced with the dollar sign: `pages.users.$id`.
 *
 * ```js
 * const routesConfig = [{
 *  path: '/users',
 *  component: UserList,
 *  routes: [{
 *    path: '/users/:id',
 *    component: UserEdit,
 *  }],
 * }];
 * const pages = getPages(routesConfig);
 * <pre>pages.users.$id.path: {pages.users.$id.path}</pre>
 * ```
 *
 * Aliases:
 *
 * It is possible to create an alias of any page using `route.page`.
 *
 * `{string|array} route.page` - An array of string camelCase dotted separated key that indicate where to set the alias from the root of pages.
 *
 *
 * ```js
 * const routesConfig = [{
 *   path: '/',
 *   component: Dashboard,
 *   page: 'dashboard'
 * }, {
 *  path: '/users',
 *  component: UserList,
 *  routes: [{
 *    page: ['users.edit', 'dashboard.userEdit'],
 *    path: '/users/:id',
 *    component: UserEdit,
 *  }],
 * }];
 * const pages = getPages(routesConfig);
 * <div>
 *   <h2>use the generated key: pages.users.$id.path</h2>
 *   <pre>{pages.users.$id.path}</pre>
 *   <h2>or use the aliased one: pages.users.edit.path</h2>
 *   <pre>{pages.users.edit.path}</pre>
 *   <h2>or use an alias from root of pages: pages.dashboard.userEdit.path</h2>
 *   <pre>{pages.dashboard.userEdit.path}</pre>
 * </div>
 * ```
 *
 * > The base path `/` will be added to `pages` as `home` if no `page` alias exist for it.
 *
 * @param {Object[]|RoutesMap|Map} routesConfig or routesMap - An array of routes configuration object or a routes map that will be translated into pages
 * @param {object} [pages={}] - A pages object
 * @param {object} options - An options object for the getPages
 * @param {array} [options.filters=['component', 'routes']] - Keys listed here will be omitted in page.
 * @param {string} [options.childKey=routes] - When using a list of route configuration, this will be the key used to identify the nested list of routes configuration.
 * @param {object} [options.home={ page: 'home', path: '/' }] - This will be used by default if your homepage path is `/` and if the route configuration does not set an alias for it.
 * @return {object} pages - The pages of your applications
 */
export default function getPages(routesConfig, pages = {}, options = defaultOptions) {
  // options
  const { filters, childKey, home } = { ...defaultOptions, ...options };
  // define input mode
  const isRoutesMap = routesConfig instanceof Map;
  [...routesConfig].forEach((routeOrMap) => {
    // choose from input mode
    const routeUnfiltered = isRoutesMap ? routeOrMap[1] : routeOrMap;
    // retrieve page information
    const { path, page: pageAliases, ...route } = omit(routeUnfiltered, filters);
    // set the page content
    const page = { path, ...route };
    // set a list of aliases
    const pageAliasList = pageAliases instanceof Array ? pageAliases : [pageAliases].filter((f) => f);
    // routes without path can be redirection or nested route config case
    if (path) {
      // convert the path into dotted camel case
      const camelCasePath = camelizePath(path);
      const camelCasePathList = camelCasePath.split('.');
      camelCasePathList.forEach((onePathDepth, i) => {
        // this is special case to map homepage
        if (path === home.path) {
          if (!pageAliasList.length) {
            // default page name if no page alias are set
            getMergeSet(pages, home.page, page);
          } else {
            // otherwise skip the default and use page aliases directly
            pageAliasList.forEach((depth) => {
              getMergeSet(pages, depth, page);
            });
          }
        } else if (i === 0 && i === camelCasePathList.length - 1) {
          // for root path, create the page
          [onePathDepth, ...pageAliasList].filter((f) => f).forEach((depth) => getMergeSet(pages, depth, page));
        } else if (i > 0 && i === camelCasePathList.length - 1) {
          // for non root path, create the page
          const targetList = [camelCasePath, ...pageAliasList].filter((f) => f);
          targetList.forEach((target) => getMergeSet(pages, target, page));
        }
      });
    }
    // support nested routes configuration
    routeUnfiltered[childKey] && getPages(routeUnfiltered[childKey], pages, childKey); // eslint-disable-line no-unused-expressions
  });
  return pages;
}

/**
 * @private
 * @description
 * Traverse get merge and set a value within an object
 * @param {object} object - object to use
 * @param {string} path - The path to get and set
 * @param {*} value - The value to merge and set
 */
function getMergeSet(object, path, value) {
  if (path.includes('.')) {
    const val = get(object, path) || {};
    set(object, path, merge(val, value));
  } else {
    Object.assign(object, merge(object, { [path]: value }));
  }
}
