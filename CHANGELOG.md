# [3.0.0](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.2.9...v3.0.0) (2019-03-20)


### Bug Fixes

* **dependencies:** Upgrade all dependencies ([dd7e733](https://github.com/yeutech-lab/react-router-dom-utils/commit/dd7e733))


### BREAKING CHANGES

* **dependencies:** corejs was ugprade to v3.0.0 and babel to 7.4.0. The api of corejs has changed and
is tightly coupled to babel 7.4.0

## [2.2.9](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.2.8...v2.2.9) (2019-03-11)


### Bug Fixes

* **documentation:** update @rollup-umd/documentation, @yeutech-lab/documentation. Using es6 import for all examples ([5997f36](https://github.com/yeutech-lab/react-router-dom-utils/commit/5997f36))

## [2.2.8](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.2.7...v2.2.8) (2019-03-03)


### Bug Fixes

* **dependencies:** upgrade all dependencies ([ca5a307](https://github.com/yeutech-lab/react-router-dom-utils/commit/ca5a307))

## [2.2.7](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.2.6...v2.2.7) (2019-02-28)


### Bug Fixes

* **getPages:** fix applying on root wrongly ([ded8cf8](https://github.com/yeutech-lab/react-router-dom-utils/commit/ded8cf8))

## [2.2.6](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.2.5...v2.2.6) (2019-02-28)


### Bug Fixes

* **getPages:** fixed error on root path ([8989f2d](https://github.com/yeutech-lab/react-router-dom-utils/commit/8989f2d))
* **getPages:** optimize code ([cd9de35](https://github.com/yeutech-lab/react-router-dom-utils/commit/cd9de35))

## [2.2.5](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.2.4...v2.2.5) (2019-02-28)


### Bug Fixes

* **getPages:** fixing bug for root paths ([32a878d](https://github.com/yeutech-lab/react-router-dom-utils/commit/32a878d))

## [2.2.4](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.2.3...v2.2.4) (2019-02-28)


### Bug Fixes

* **documentation:** fixed example in documentation ([1a17607](https://github.com/yeutech-lab/react-router-dom-utils/commit/1a17607))

## [2.2.3](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.2.2...v2.2.3) (2019-02-27)


### Bug Fixes

* **getPages:** fix error during merge ([51a7a36](https://github.com/yeutech-lab/react-router-dom-utils/commit/51a7a36))

## [2.2.2](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.2.1...v2.2.2) (2019-02-27)


### Bug Fixes

* **getPages:** now automatically detecting home ([7073c82](https://github.com/yeutech-lab/react-router-dom-utils/commit/7073c82))
* **pages:** Rename alias to page ([754013a](https://github.com/yeutech-lab/react-router-dom-utils/commit/754013a))

## [2.2.1](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.2.0...v2.2.1) (2019-02-27)


### Bug Fixes

* **dependencies:** upgrade all dependencies ([5aca285](https://github.com/yeutech-lab/react-router-dom-utils/commit/5aca285))

# [2.2.0](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.1.4...v2.2.0) (2019-02-27)


### Bug Fixes

* **dependencies:** upgrade all dependencies ([ac2469d](https://github.com/yeutech-lab/react-router-dom-utils/commit/ac2469d))


### Features

* **RoutesMap:** added RoutesMap class, improve getPages to support alias (config) and routesMap (source) ([0e14c4b](https://github.com/yeutech-lab/react-router-dom-utils/commit/0e14c4b))

## [2.1.4](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.1.3...v2.1.4) (2019-02-25)


### Bug Fixes

* **dependencies:** upgrade all dependencies, improve matchParamsPath ([a6cef0e](https://github.com/yeutech-lab/react-router-dom-utils/commit/a6cef0e))

## [2.1.3](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.1.2...v2.1.3) (2019-02-24)


### Bug Fixes

* **getPages:** it now remove routes from the pages object ([c372aa0](https://github.com/yeutech-lab/react-router-dom-utils/commit/c372aa0))

## [2.1.2](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.1.1...v2.1.2) (2019-02-24)


### Bug Fixes

* **Routes:** fix propTypes now accepting Map ([9469197](https://github.com/yeutech-lab/react-router-dom-utils/commit/9469197))

## [2.1.1](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.1.0...v2.1.1) (2019-02-24)


### Bug Fixes

* **copy:** using shallow copy in all utilities ([d9286b6](https://github.com/yeutech-lab/react-router-dom-utils/commit/d9286b6))

# [2.1.0](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.0.3...v2.1.0) (2019-02-23)


### Bug Fixes

* **dependencies:** remove babel-core@7.0.0-bridge.0 ([328027b](https://github.com/yeutech-lab/react-router-dom-utils/commit/328027b))


### Features

* **Link:** Link now support routesMap in prior routes for finding the Loadable component ([88a1671](https://github.com/yeutech-lab/react-router-dom-utils/commit/88a1671))

## [2.0.3](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.0.2...v2.0.3) (2019-02-23)


### Bug Fixes

* **getRoutesMap:** Added polyfill ([05c6c6b](https://github.com/yeutech-lab/react-router-dom-utils/commit/05c6c6b))
* **getRoutesMap:** Added polyfill ([330158d](https://github.com/yeutech-lab/react-router-dom-utils/commit/330158d))

## [2.0.2](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.0.1...v2.0.2) (2019-02-23)


### Bug Fixes

* **documentation:** release documentation ([5cbb73d](https://github.com/yeutech-lab/react-router-dom-utils/commit/5cbb73d))

## [2.0.1](https://github.com/yeutech-lab/react-router-dom-utils/compare/v2.0.0...v2.0.1) (2019-02-23)


### Bug Fixes

* **dist:** Added to globals and externals @yeutech-lab/tree-operations ([fb0a945](https://github.com/yeutech-lab/react-router-dom-utils/commit/fb0a945))

# [2.0.0](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.4.1...v2.0.0) (2019-02-23)


### Features

* **getRoutesMap:** Added utility to create a Map of routes ([2789038](https://github.com/yeutech-lab/react-router-dom-utils/commit/2789038))


### BREAKING CHANGES

* **getRoutesMap:** To comply to react-router-config synthax, we have renamed childRoutes into routes
in all our utilities.

## [1.4.1](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.4.0...v1.4.1) (2019-02-22)


### Bug Fixes

* **dependencies:** upgrade all dependencies ([1196963](https://github.com/yeutech-lab/react-router-dom-utils/commit/1196963))

# [1.4.0](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.3.3...v1.4.0) (2019-02-21)


### Bug Fixes

* **Link:** fix example and added isPathParamsPath to documentation ([b749db7](https://github.com/yeutech-lab/react-router-dom-utils/commit/b749db7))


### Features

* **isPathParamsPath:** added an utility function to compare path and path with params ([08d2669](https://github.com/yeutech-lab/react-router-dom-utils/commit/08d2669))

## [1.3.3](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.3.2...v1.3.3) (2019-02-19)


### Bug Fixes

* **Link:** improve the hability of Link to detect component with route using params ([04b9458](https://github.com/yeutech-lab/react-router-dom-utils/commit/04b9458))

## [1.3.2](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.3.1...v1.3.2) (2019-02-19)


### Bug Fixes

* **Link:** improve link to support dynamic url and failure ([d8f67db](https://github.com/yeutech-lab/react-router-dom-utils/commit/d8f67db))

## [1.3.1](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.3.0...v1.3.1) (2019-01-17)


### Bug Fixes

* **link:** remove useless ...rest spreaded twice on Link ([6dfd990](https://github.com/yeutech-lab/react-router-dom-utils/commit/6dfd990))

# [1.3.0](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.2.4...v1.3.0) (2019-01-17)


### Features

* **Link:** added onBeforePageChange ([6ba166c](https://github.com/yeutech-lab/react-router-dom-utils/commit/6ba166c))

## [1.2.4](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.2.3...v1.2.4) (2019-01-15)


### Bug Fixes

* **delay:** allow delay to be a function ([7693083](https://github.com/yeutech-lab/react-router-dom-utils/commit/7693083))

## [1.2.3](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.2.2...v1.2.3) (2019-01-15)


### Bug Fixes

* **delay:** added props delay ([dd70e02](https://github.com/yeutech-lab/react-router-dom-utils/commit/dd70e02))

## [1.2.2](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.2.1...v1.2.2) (2019-01-15)


### Bug Fixes

* **preload:** added preload props to tell if the preload should be totally disabled ([cb487bc](https://github.com/yeutech-lab/react-router-dom-utils/commit/cb487bc))

## [1.2.1](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.2.0...v1.2.1) (2019-01-15)


### Bug Fixes

* **Link:** fixed componentWillMount throwing unwanted warning ([5b3d9f6](https://github.com/yeutech-lab/react-router-dom-utils/commit/5b3d9f6))

# [1.2.0](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.1.0...v1.2.0) (2019-01-15)


### Features

* **Link:** Added <Link /> component ([1af95d2](https://github.com/yeutech-lab/react-router-dom-utils/commit/1af95d2))

# [1.1.0](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.0.3...v1.1.0) (2019-01-14)


### Features

* **getPages:** added getPages ([4ca5007](https://github.com/yeutech-lab/react-router-dom-utils/commit/4ca5007))

## [1.0.3](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.0.2...v1.0.3) (2019-01-06)


### Bug Fixes

* **example:** added codesandbox.io link ([f89d570](https://github.com/yeutech-lab/react-router-dom-utils/commit/f89d570))

## [1.0.2](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.0.1...v1.0.2) (2019-01-06)


### Bug Fixes

* **release:** trying one more release without build cache on travis due to errors reported in esm module ([4c427bb](https://github.com/yeutech-lab/react-router-dom-utils/commit/4c427bb))

## [1.0.1](https://github.com/yeutech-lab/react-router-dom-utils/compare/v1.0.0...v1.0.1) (2019-01-06)


### Bug Fixes

* **release:** GitHub release https://github.com/yeutech-lab/react-router-dom-utils ([e46591e](https://github.com/yeutech-lab/react-router-dom-utils/commit/e46591e))
