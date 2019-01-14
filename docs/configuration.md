The react-router `<Route />` components expect a few props described [here](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md).

It is more appropriate to store route configuration as an array than an object but it is more appropriate to target path in an object.

Your **route configuration** `routes.js` must be of type `Array` and can include `childRoutes` of type `Array`.

It will return an object construct of `{ [route.name]: route }`.

You can use [getPages](#get-pages) utility to have the `routeList` configuration as an object that can be traversed.


