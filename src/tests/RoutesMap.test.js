import RoutesMap from '../RoutesMap';

describe('RoutesMap', () => {
  it('should create a routes map', () => {
    const routesMap = new RoutesMap([
      ['/404.html', {
        name: 'notFound',
        path: '/404.html',
      }],
      ['/career.html', {
        name: 'career',
        path: '/career.html',
        exact: true,
      }],
      ['/users/:id', {
        name: 'editUser',
        path: '/users/:id',
      }],
      ['/users/:userId/application/:id', {
        name: 'editUserApp',
        path: '/users/:userId/application/:id',
      }],
    ]);
    expect(routesMap.get('/404.html').name).toBe('notFound');
    expect(routesMap.get('/career.html').exact).toBe(true);
    expect(routesMap.get('/users/:id').name).toBe('editUser');
    expect(routesMap.get('/users/1').name).toBe('editUser');

    // TODO: fix this test, allow all charcter to be passed as a param *?
    // expect(routesMap.get('/users/mikeordan/application/1337').name).toBe('editUserApp');

    expect(routesMap.get('/users/mikeordan/1337')).toBeUndefined();
    expect(routesMap.get('/users/mikeordan/application')).toBeUndefined();
    const map = new Map();
    expect(routesMap instanceof Map).toBe(true);
    expect(routesMap instanceof RoutesMap).toBe(true);
    expect(routesMap.constructor !== Map).toBe(true);
    expect(routesMap.constructor === RoutesMap).toBe(true);
    expect(map instanceof Map).toBe(true);
    expect(!(map instanceof RoutesMap)).toBe(true);
    expect(map.constructor === Map).toBe(true);
    expect(map.constructor !== RoutesMap).toBe(true);
  });
});
