import getRoutesMap from '../getRoutesMap';
import getRouteFromPath from '../getRouteFromPath';

describe('getRouteFromPath', () => {
  let routes;
  let routesMap;
  beforeEach(() => {
    routes = [{
      name: 'editUser',
      path: '/users/:id/view.html',
      routes: [
        {
          name: 'editUserItem',
          path: '/users/:userId/items/:id/view.html',
        },
        {
          name: 'editUserItemBis',
          path: '/users/:userId/items/:id.html',
        },
        {
          name: 'editUserItemThird',
          path: '/users/:userId/items/:id',
        },
      ],
    }];

    routesMap = getRoutesMap(routes);
  });
  describe('getRouteFromPath', () => {
    it('should get /users/:id.html route', () => {
      expect(getRouteFromPath('/users/1/view.html', routesMap).name).toEqual('editUser');
    });
    it('should get /users/:userId/items/:id/view.html route', () => {
      expect(getRouteFromPath('/users/1/items/10/view.html', routesMap).name).toEqual('editUserItem');
    });
    it('should get /users/:userId/items/:id.html route', () => {
      expect(getRouteFromPath('/users/1/items/10.html', routesMap).name).toEqual('editUserItemBis');
    });
    it('should get /users/:userId/items/:id route', () => {
      expect(getRouteFromPath('/users/1/items/10', routesMap).name).toEqual('editUserItemThird');
    });
  });
});
