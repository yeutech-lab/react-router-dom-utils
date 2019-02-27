## Motivation

With the introduction of React Router v4, there is no longer a centralized route configuration. 

There are some use-cases where it is valuable to know about all the app's potential routes such as:

- Loading data on the server or in the lifecycle before rendering the next screen
- Linking to routes by name
- Static analysis

This project seeks to define a shared format for others to build patterns on top of.

## Adding route (declaration)

During development it is convenient to declare route configuration as an array of object.

This is why [react-router-config](https://www.npmjs.com/package/react-router-config) was created.

Our utilities help to use this array of route configuration within our application.

A route configuration object is a configuration that can be use later to create the react-router `<Route />` or `<Redirect />` components.
Read available props : 

- `<Route />`: [Read documentation](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md).
- `<Redirect />`: [Read documentation](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Redirect.md).

We use `getPages` utility to turn the `routeList` configuration into a `pages` object that can be traversed more efficiently than the array when writing links.

```js
const { getPages } = require('$PACKAGE_NAME');

// routes configuration
const routes = [{
  name: 'home',
  path: '/',
}];

// pages object is useful for creating <Link to={pages.home.path} />
const pages = getPages(routes);
<pre>Result: {JSON.stringify(pages.home.path, null, 2)}</pre>
```

## Using route within your application


A typical use case to use `routesMap` instead of an array of `routesConfig` is when
you have a large application with many routes configuration coming from everywhere.

This will ensure uniqueness of the route identified by it's path.

> Because a route can exist only once per application lifetime, 
we recommend to use a `routesMap` after the initialization of your application.
(Instead of directly using the `routesConfig` array)

Using `Map` have numerous advantages, unique route configuration can be done using the unique `path`. 

The flat architecture of the map and it's unique id makes it easier to found updated or merged routes more easily.

To creates a `routesMap`, just pass the array of route configuration to `getRoutesMap` function:

```js
const { getRoutesMap } = require('$PACKAGE_NAME');

// routes configuration
const routes = [{
  name: 'home',
  path: '/',
}];

const routesMap = getRoutesMap(routes);
<div>
  <pre>
  routeMap.get('/') return the associated route:
  </pre>
  <pre>
    {JSON.stringify(routesMap.get('/'), null, 2)}
  </pre>
</div>
```
