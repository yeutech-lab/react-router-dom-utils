import React from 'react';
import getPages from '../getPages';

describe('should exports', () => {
  const routes = [{
    name: 'hello',
    path: '/hello',
    component: () => <div>hi</div>,
    routes: [{
      name: 'world',
      path: '/hello/world',
      routes: [{
        name: '2017',
        path: '/hello/world/2017',
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
    }],
  }];
  const p = getPages(routes);

  it('should get pages', () => {
    expect(p).toEqual({
      hello: {
        name: 'hello',
        path: '/hello',
        world: {
          2017: {
            name: '2017',
            path: '/hello/world/2017',
          },
          name: 'world',
          path: '/hello/world',
        },
      },
      bye: {
        name: 'bye',
        path: '/bye',
        forest: {
          name: 'forest',
          path: '/bye/forest',
          gump: {
            1337: {
              name: '1337',
              path: '/bye/forest/gump/1337',
            },
            name: 'gump',
            path: '/bye/forest/gump',
          },
        },
      },
    });
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
