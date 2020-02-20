function getAllowedIdQualifier(map) {
  const allowedQualifiers = [];
  map.forEach((val) => {
    const allowed = val.path.match(/(?<=\/)\w+(?=\/:)/g);
    if (!allowed) {
      return;
    }
    allowed.forEach((e) => {
      if (!allowedQualifiers.includes(e)) {
        allowedQualifiers.push(e);
      }
    });
  });
  return allowedQualifiers;
}

/**
 * @public
 * @description
 * Retrieve a end users path within routesMap
 *
 * > Special thanks to <a href="https://github.com/Supporterino" target="_blank">Supporterino</a> for this function
 *
 * ```js
 * import { RoutesMap, getRouteFromPath } from '$PACKAGE_NAME';
 * const routesMap = new RoutesMap([
 *  ['/', { name: 'Home' }],
 *  ['/users/:id.html', { name: 'ViewUser' }],
 *  ['/users/:userId/items/:id/view.html', { name: 'ViewUserItem' }],
 * ]);
 *
 * <div>
 *   {JSON.stringify(getRouteFromPath('/users/1.html', routesMap))}
 *   {JSON.stringify(getRouteFromPath('/users/2/items/10/view.html', routesMap))}
 * </div>
 * ```
 * @param {string} path - the path to find
 * @param {Map} routesMap - the route map
 * @returns {object} route - the route object
 */
export default function getRouteFromPath(path, routesMap) {
  let url = `${path}`;
  const urlMatch = url.match(/\/\d+/g);
  if (!urlMatch) {
    return undefined;
  }
  if (urlMatch.length > 1) {
    const allowedUrlPart = getAllowedIdQualifier(routesMap);
    let urlParts = url.match(/(?<=\/)\w+(?=\/\d+)/g);
    urlParts.forEach((val) => {
      if (!allowedUrlPart.includes(val)) {
        urlParts = urlParts.slice(urlParts.indexOf(val), 1);
      }
    });
    urlParts.forEach((val, key, arr) => {
      if (key === arr.length - 1) {
        const regex = new RegExp(`(?<=/${val}/)\\d+`, 'g');
        const replacement = ':id';
        url = url.replace(regex, replacement);
      } else {
        const regex = new RegExp(`(?<=/${val}/)\\d+`, 'g');
        const replacement = `:${val.slice(0, -1)}Id`;
        url = url.replace(regex, replacement);
      }
    });
    return routesMap.get(url);
  }
  url = url.replace(/\/\d+/g, '/:id');
  return routesMap.get(url);
}
