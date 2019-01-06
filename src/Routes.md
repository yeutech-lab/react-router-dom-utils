
It expect an [`Array`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) of `route` configuration. 

See [`<Route />`](https://reacttraining.com/react-router/web/api/Route) documentation for more info.

```js static
const routes = [
  {
    name: 'home',
    path: '/',
    exact: true,
  },
  {
    name: 'customers',
    path: '/customers.html',
    exact: true,
    childRoutes: [
      {
        name: 'aboutUs',
        path: '/about-us.html',
        exact: true,
      },
      {
        name: 'career',
        path: '/career.html',
        exact: true,
      },
      {
        name: 'faq',
        path: '/faq.html',
        exact: true,
      },
      {
        name: 'cgu',
        path: '/CGU.html',
        exact: true,
      },
      {
        name: 'confidentiality',
        path: '/Confidentiality.html',
        exact: true,
      },
      {
        name: 'cookies',
        path: '/cookies.html',
        exact: true,
      },
    ],
  },
  {
    name: 'notFound',
    path: '/404.html',
  },
  {
    name: 'notFoundRedirect',
    from: '*',
    to: '/404.html',
  },
];
```

**Example**

```js
const { Switch, Router } = require('react-router-dom');
const { default: createBrowserHistory } = require('history/createBrowserHistory');

const routes = [
  {
    name: 'home',
    path: '/',
    exact: true,
  },
  {
    name: 'customers',
    path: '/customers.html',
    exact: true,
    childRoutes: [
      {
        name: 'aboutUs',
        path: '/about-us.html',
        exact: true,
      },
      {
        name: 'career',
        path: '/career.html',
        exact: true,
      },
      {
        name: 'faq',
        path: '/faq.html',
        exact: true,
      },
      {
        name: 'cgu',
        path: '/CGU.html',
        exact: true,
      },
      {
        name: 'confidentiality',
        path: '/Confidentiality.html',
        exact: true,
      },
      {
        name: 'cookies',
        path: '/cookies.html',
        exact: true,
      },
    ],
  },
  {
    name: 'notFound',
    path: '/404.html',
  },
//  {
//    name: 'notFoundRedirect',
//    from: '/*', 
//    to: '/404.html',
//  },
]; 
<Router history={createBrowserHistory()}>
  <Switch>
    <h1>
      Read <a href="https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom" target="_blank">react-router-dom</a> documentation for more information
    </h1>
    <Routes routes={routes} />
  </Switch>
</Router>
```
