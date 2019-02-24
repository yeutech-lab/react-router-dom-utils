<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## getPages

Looping through an array and find an entry require filtering. Find recursively a (`routes`) won't look nice in your code.

it turn your array of `routes` into a `pages` object that can be used to access any `path`.

```js
const getPages = require('$PACKAGE_NAME/lib/getPages');
const routes = [{
  name: 'dashboard',
  redirect: true,
  from: '/dashboard',
  to: '/',
  description: 'Dashboard',
  routes: [
    {
      name: 'users',
      path: '/users',
      description: 'List users',
    },
  ],
}];
<div>
  <h2>routes:</h2>
  <pre>
    {JSON.stringify(routes, null, 2)}
  </pre>
  <h2>pages:</h2>
  <pre>
    {JSON.stringify(getPages(routes), null, 2)}
  </pre>
</div>
```

### Parameters

-   `routeConfig` **[Array][1]** a list of route configuration
-   `pages` **[object][2]** an object pages to expand (optional, default `{}`)
-   `childKey` **[string][3]** the children key used for flattening pages (optional, default `routes`)

### Examples

```javascript
`routes` are flattened in parent `[parent][route.name]` and are kept in `[parent].routes` for faster accessibility.

// This is how you would access a specific page in your routes configuration array:

const routes = [
  {
    name: 'dashboard',
    redirect: true,
    from: '/dashboard',
    to: '/',
    description: 'Dashboard',
    routes: [
      {
        name: 'users',
        path: '/users',
        description: 'List users',
      },
    ],
  }
];
const page = routes.filter((route) => route.name === 'dashboard')[0]

// This is how you do with `getPages`:

const { getPages } = require('@yeutech-lab/react-router-dom-utils');
const routes = [
  {
    name: 'dashboard',
    redirect: true,
    from: '/dashboard',
    to: '/',
    description: 'Dashboard',
    routes: [
      {
        name: 'users',
        path: '/users',
        description: 'List users',
      },
    ],
  }
];
const pages = getPages(routes);
<ul>
  <li>{pages.dashboard.description}: {pages.dashboard.from}</li>
  <li>{pages.dashboard.users.description}: {pages.dashboard.users.path}</li>
</ul>
```

Returns **[object][2]** pages - a pages object

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String