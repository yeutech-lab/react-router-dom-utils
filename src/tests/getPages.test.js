import React from 'react';
import getPages from '../getPages';
import getRoutesMap from '../getRoutesMap';

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
    hello: {
      world: {
        2017: {
          path: '/hello/world/2017',
        },
        path: '/hello/world',
        'two-thousand-seventeen': {
          path: '/hello/world/2017',
        },
      },
      myWorld: {
        path: '/hello/world',
      },
    },
    bye: {
      forest: {
        path: '/bye/forest',
        gump: {
          1337: {
            path: '/bye/forest/gump/1337',
          },
          path: '/bye/forest/gump',
        },
        myGump: {
          path: '/bye/forest/gump',
        },
      },
      myByeForest: {
        path: '/bye/forest',
      },
    },
    homepage: {
      resource: {
        path: 'homepage/resource',
      },
    },
    toRoot: {
      my1337: {
        path: '/bye/forest/gump/1337',
      },
      'two-thousand-seventeen': {
        path: '/hello/world/2017',
      },
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
