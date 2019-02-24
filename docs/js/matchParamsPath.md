<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## matchParamsPath

It will return true if the first path match the second path with params

```js
const { matchParamsPath } = require('$PACKAGE_NAME/lib');
<div>matchParamsPath('/users/1', '/users/:id'): {matchParamsPath('/users/1', '/users/:id').toString()}</div>;
```

### Parameters

-   `path` **[string][1]** The real path
-   `pathWithParams` **[string][1]** The path with params

### Examples

```javascript
matchParamsPath('/users/1', '/users/:id');
// true
matchParamsPath('/users', '/users/:id');
// false
```

Returns **[boolean][2]** Return true if the compare match

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean