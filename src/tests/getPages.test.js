import React from 'react';
import getPages from '../getPages';
import getRoutesMap from '../getRoutesMap';

describe('getPages homepage with /', () => {
  it('should set home page automatically', () => {
    expect(getPages([{
      path: '/',
    }])).toEqual({
      home: {
        path: '/',
      },
    });
  });
  it('should use the alias for homepage when set', () => {
    const p = getPages([{
      path: '/',
      page: 'newHome',
    }]);
    expect(p).toEqual({
      newHome: {
        path: '/',
      },
    });
    const p2 = getPages([{
      path: '/',
      page: ['newHome', 'newHome.sub'],
    }]);
    expect(p2).toEqual({
      newHome: {
        path: '/',
        sub: {
          path: '/',
        },
      },
    });
  });
});
describe('getPages', () => {
  const routes = [
    {
      page: 'myHello',
      path: '/hello',
      component: () => <div>hi</div>,
      routes: [{
        page: 'myWorld',
        path: '/hello/world',
        routes: [{
          page: ['2017', 'two-thousand-seventeen', 'toRoot.two-thousand-seventeen'],
          path: '/hello/world/2017',
        }],
      }],
    },
    {
      path: 'homepage/resource',
    },
    {
      page: 'myBye',
      path: '/bye',
      routes: [{
        page: 'myByeForest',
        path: '/bye/forest',
        routes: [{
          page: 'myGump',
          path: '/bye/forest/gump',
          routes: [{
            page: 'toRoot.my1337',
            path: '/bye/forest/gump/1337',
          }],
        }],
      }],
    }];
  const expectedPages = {
    2017: {
      path: '/hello/world/2017',
    },
    hello: {
      path: '/hello',
      world: {
        2017: {
          path: '/hello/world/2017',
        },
        path: '/hello/world',
      },
    },
    myHello: {
      path: '/hello',
    },
    myWorld: {
      path: '/hello/world',
    },
    'two-thousand-seventeen': {
      path: '/hello/world/2017',
    },
    toRoot: {
      'two-thousand-seventeen': {
        path: '/hello/world/2017',
      },
      my1337: {
        path: '/bye/forest/gump/1337',
      },
    },
    homepage: {
      resource: {
        path: 'homepage/resource',
      },
    },
    bye: {
      path: '/bye',
      forest: {
        path: '/bye/forest',
        gump: {
          1337: {
            path: '/bye/forest/gump/1337',
          },
          path: '/bye/forest/gump',
        },
      },
    },
    myBye: {
      path: '/bye',
    },
    myByeForest: {
      path: '/bye/forest',
    },
    myGump: {
      path: '/bye/forest/gump',
    },
  };

  describe('should get pages with list of routes configuration', () => {
    const p = getPages(routes);
    it('should get pages', () => {
      expect(p).toEqual(expectedPages);
      expect(p.hello.routes).not.toBeDefined();
    });

    it('should remove sub routes object from pages', () => {
      expect(p.hello.routes).not.toBeDefined();
      expect(p.bye.routes).not.toBeDefined();
      expect(p.bye.forest.routes).not.toBeDefined();
    });

    it('should remove components from pages', () => {
      expect(p.hello.component).not.toBeDefined();
    });
  });

  describe('should get pages with a routes map', () => {
    const p = getPages(getRoutesMap(routes));
    it('should get pages', () => {
      expect(p).toEqual(expectedPages);
      expect(p.hello.routes).not.toBeDefined();
    });

    it('should remove sub routes object from pages', () => {
      expect(p.hello.routes).not.toBeDefined();
      expect(p.bye.routes).not.toBeDefined();
      expect(p.bye.forest.routes).not.toBeDefined();
    });

    it('should remove components from pages', () => {
      expect(p.hello.component).not.toBeDefined();
    });
  });
});
describe('getPages', () => {
  it('should succeed all kind of merge', () => {
    const routes = [{
      from: '/user-management',
      to: '/',
      routes: [
        // authority
        {
          page: 'userManagement.authoritiesShow',
          path: '/user-management/:resource/:id/authorities/show',
        },
        {
          page: 'authoritiesEdit',
          path: '/user-management/:resource/:id/authorities',
        },
        // user function
        {
          path: '/user-management/users',
          menu: { role: 'VIEW_USER' },
        },
        // organizations function
        {
          path: '/user-management/organizations',
          menu: { role: 'VIEW_ORG' },
        },
      ],
    }];
    const expectedPages = {
      userManagement: {
        authoritiesShow: {
          path: '/user-management/:resource/:id/authorities/show',
        },
        $resource: {
          $id: {
            authorities: {
              path: '/user-management/:resource/:id/authorities',
              show: {
                path: '/user-management/:resource/:id/authorities/show',
              },
            },
          },
        },
        organizations: {
          menu: {
            role: 'VIEW_ORG',
          },
          path: '/user-management/organizations',
        },
        users: {
          menu: {
            role: 'VIEW_USER',
          },
          path: '/user-management/users',
        },
      },
      authoritiesEdit: {
        path: '/user-management/:resource/:id/authorities',
      },
    };
    expect(getPages(routes)).toEqual(expectedPages);
    expect(getPages(getRoutesMap(routes))).toEqual(expectedPages);
  });

  it('should work', () => {
    const routesConfig = [{
      path: '/',
      page: 'dashboard',
    }, {
      path: '/users',
      routes: [{
        page: ['users.edit', 'dashboard.userEdit'],
        path: '/users/:id',
      }],
    }];
    const p = getPages(routesConfig);
    expect(p.users.$id.path).toEqual('/users/:id');
    expect(p.users.edit.path).toEqual('/users/:id');
    expect(p.dashboard.userEdit.path).toEqual('/users/:id');
  });

  it('should work', () => {
    const routesConfig = [
      {
        path: '/test',
        role: 10,
      },
    ];
    const p = getPages(routesConfig);
    expect(p.test.path).toEqual('/test');
  });
});
