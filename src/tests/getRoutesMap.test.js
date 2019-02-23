import getRoutesMap from '../getRoutesMap';

describe('should exports', () => {
  let routes;
  beforeEach(() => {
    routes = [{
      name: 'hello',
      path: '/hello',
      routes: [{
        name: 'world',
        path: '/hello/world',
        routes: [{
          mustBePresentPrimary: true,
          name: '2017',
          path: '/hello/world/2017',
          component: 'Exist',
        }, {
          from: '/here',
          to: '/there',
        }],
      }],
    }, {
      name: 'bye',
      path: '/bye',
      routes: [{
        name: 'forest',
        path: '/bye/forest',
        routes: [{
          name: 'gump',
          path: '/bye/forest/gump',
          routes: [{
            name: '1337',
            path: '/bye/forest/gump/1337',
          }],
        }],
      }, {
        name: 'world',
        path: '/hello/world',
        routes: [{
          name: '2017',
          mustBePresent: true,
          path: '/hello/world/2017',
          component: 'ExistAndDifferent',
        }, {
          name: '2018',
          path: '/hello/world/2018',
        }],
      }],
    }];
  });
  describe('soft mode on', () => {
    let map;
    beforeEach(() => {
      map = getRoutesMap(routes, undefined, { soft: true });
    });
    it('should get routes map', () => {
      expect(map.get('/hello').name).toEqual('hello');
      expect(map.get('/bye')).toEqual(routes.find((r) => r.name === 'bye'));
    });
    it('should merge route object for same route', () => {
      expect(map.get('/hello/world/2017').mustBePresentPrimary).toBe(true);
      expect(map.get('/hello/world/2017').mustBePresent).toBe(true);
    });
    it('should extends an existing map', () => {
      const extendedMap = getRoutesMap([
        { name: 'google', path: '/google' },
      ], map, { soft: true });
      expect(extendedMap.get('/hello/world/2017').mustBePresentPrimary).toBe(true);
      expect(extendedMap.get('/google').name).toBe('google');
    });
    it('should also store redirect', () => {
      expect(map.get('/here').to).toEqual('/there');
    });
  });

  describe('soft mode off (default)', () => {
    it('should get without soft and refuse twice a component for the same route', (done) => {
      expect(() => getRoutesMap(routes)).toThrow(new Error('You can\'t set more than 1 component per path (/hello/world/2017)'));
      done();
    });
    it('should get without soft and refuse a different name when changed', (done) => {
      expect(() => getRoutesMap([
        {
          name: 'hello',
          path: '/hello',
        },
        {
          name: 'hellochange',
          path: '/hello',
        },
      ])).toThrow(new Error('You can\'t set a different name hello and hellochange for the route /hello'));
      done();
    });
  });
});
