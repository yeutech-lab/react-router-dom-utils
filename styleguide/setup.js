const React = require('react');
const TreeOps = require('@yeutech-lab/tree-operations');
const {
  getPages,
  getRoutesMap,
  makeRoutes,
  matchParamsPath,
  Routes,
  RoutesMap,
  Link,
} = require('../src');
require('core-js/es6');

global.TreeOps = TreeOps;
global.Dashboard = () => <div>dashboard</div>;
global.UserList = () => <div>user list</div>;
global.UserEdit = () => <div>user edit</div>;
global.getPages = getPages;
global.getRoutesMap = getRoutesMap;
global.makeRoutes = makeRoutes;
global.matchParamsPath = matchParamsPath;
global.Routes = Routes;
global.RoutesMap = RoutesMap;
global.Link = Link;
