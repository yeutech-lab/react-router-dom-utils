It expect an [`Array`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) of `route` configuration object, a [map](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map) or
a [`routeMap`](#getroutesmap).

See [`<Route />`](https://reacttraining.com/react-router/web/api/Route) documentation for more info.

```js static
const routes = [
  {
    page: 'home',
    path: '/',
    exact: true,
  },
  {
    page: 'customers',
    path: '/customers.html',
    exact: true,
    routes: [
      {
        page: 'aboutUs',
        path: '/about-us.html',
        exact: true,
      },
      {
        page: 'career',
        path: '/career.html',
        exact: true,
      },
      {
        page: 'faq',
        path: '/faq.html',
        exact: true,
      },
      {
        page: 'cgu',
        path: '/CGU.html',
        exact: true,
      },
      {
        page: 'confidentiality',
        path: '/Confidentiality.html',
        exact: true,
      },
      {
        page: 'cookies',
        path: '/cookies.html',
        exact: true,
      },
    ],
  },
  {
    page: 'notFound',
    path: '/404.html',
  },
  {
    page: 'notFoundRedirect',
    from: '*',
    to: '/404.html',
  },
];
```

**Example**

```js
const {
  Switch,
  BrowserRouter: Router,
  Link,
} = require('react-router-dom');

const routes = [
  {
    page: 'home',
    path: '/',
    exact: true,
    component: () => <div>home</div>,
  },
  {
    page: 'customers',
    path: '/customers.html',
    exact: true,
    component: () => <div>home</div>,
    routes: [
      {
        page: 'aboutUs',
        path: '/about-us.html',
        exact: true,
        component: () => <div>home</div>,
        routes: [
          {
            page: 'theVision',
            path: '/about-us/the-vision.html',
            exact: true,
            component: () => <div>home</div>,
          },
        ],
      },
      {
        page: 'career',
        path: '/career.html',
        exact: true,
        component: () => <div>home</div>,
      },
      {
        page: 'faq',
        path: '/faq.html',
        exact: true,
        component: () => <div>home</div>,
      },
      {
        page: 'cgu',
        path: '/CGU.html',
        exact: true,
        component: () => <div>home</div>,
      },
      {
        page: 'confidentiality',
        path: '/Confidentiality.html',
        exact: true,
        component: () => <div>home</div>,
      },
      {
        page: 'cookies',
        path: '/cookies.html',
        exact: true,
        component: () => <div>home</div>,
      },
    ],
  },
  {
    page: 'notFound',
    path: '/404.html',
    component: () => <h1>404 Page not found</h1>,
  },
];

const reference = {
  name: 'react-router-dom',
  documentation: 'https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom',
};

/* Create the menu recursively for demo */
const createNavigation = (routes, padding = 0) => (
  <ul style={{ marginLeft: `${padding}px` }}>
    {routes.map((route) => (
      <li key={route.path}>
        <Link to={route.path} onClick={(e) => e.preventDefault() || e.stopPropagation() || alert(route.path)}>
          {route.page}
          {route.routes && createNavigation(route.routes, 15)}
        </Link>
      </li>
    ))}
  </ul>
);

// Route can't be rendered for real because our location does not use react-router :{
<Router>
  <Switch>
    {createNavigation(routes)}
    <h1>
      Read <a href={reference.documentation} target="_blank">{reference.name}</a> documentation for more.
    </h1>
    <Routes routes={routes} />
  </Switch>
</Router>
```

You can play with the same example on [codesandbox.io](https://codesandbox.io/s/yqyro6lkvx).
