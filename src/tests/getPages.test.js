import getPages from '../getPages';

describe('should exports', () => {
  it('should get pages', () => {
    const routes = [{
      name: 'hello',
      path: '/hello',
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
    const routesCopy = [...routes];
    JSON.stringify(getPages(routes), null, 2);
    expect(getPages(routes)).toEqual({
      bye: {
        forest: {
          gump: {
            1337: {
              name: '1337',
              path: '/bye/forest/gump/1337',
            },
            name: 'gump',
            path: '/bye/forest/gump',
            routes: [
              {
                name: '1337',
                path: '/bye/forest/gump/1337',
              },
            ],
          },
          name: 'forest',
          path: '/bye/forest',
          routes: [
            {
              name: 'gump',
              path: '/bye/forest/gump',
              routes: [
                {
                  name: '1337',
                  path: '/bye/forest/gump/1337',
                },
              ],
            },
          ],
        },
        name: 'bye',
        path: '/bye',
        routes: [
          {
            name: 'forest',
            path: '/bye/forest',
            routes: [
              {
                name: 'gump',
                path: '/bye/forest/gump',
                routes: [
                  {
                    name: '1337',
                    path: '/bye/forest/gump/1337',
                  },
                ],
              },
            ],
          },
        ],
      },
      hello: {
        name: 'hello',
        path: '/hello',
        routes: [
          {
            name: 'world',
            path: '/hello/world',
            routes: [
              {
                name: '2017',
                path: '/hello/world/2017',
              },
            ],
          },
        ],
        world: {
          2017: {
            name: '2017',
            path: '/hello/world/2017',
          },
          name: 'world',
          path: '/hello/world',
          routes: [
            {
              name: '2017',
              path: '/hello/world/2017',
            },
          ],
        },
      },
    });
    expect(routes).toEqual(routesCopy);
  });
});
