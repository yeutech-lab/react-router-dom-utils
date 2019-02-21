/**
 * @public
 * @description
 * It will return true if the first path match the second path with params
 * @param {string} path - The real path
 * @param {string} pathWithParams - The path with params
 * @return {boolean} - Return true if the compare match
 * @example
 * isPathParamsPath('/users/1', '/users/:id');
 * // true
 * isPathParamsPath('/users', '/users/:id');
 * // false
 */
export default function isPathParamsPath(path, pathWithParams) {
  const p1 = pathWithParams.split('/');
  const p2 = path.split('/');
  if (p1.length !== p2.length) {
    return false;
  }
  const leading = pathWithParams[0] === '/' ? '/' : '';
  const recomposedList = [];
  for (let i = 0; i < p2.length; i += 1) {
    if (p1[i] && p1[i].match(/:[A-z-0-9_]+/)) {
      recomposedList.push(p2[i]);
    } else if (p1[i]) {
      recomposedList.push(p1[i]);
    }
  }
  return `${leading}${recomposedList.join('/')}` === path;
}
