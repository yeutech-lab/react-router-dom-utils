import makeRoutes from '../makeRoutes';
import getRoutesMap from '../getRoutesMap';

const testRoutes = [
  {
    name: 'home',
    path: '/',
    exact: true,
  },
  {
    name: 'customers',
    path: '/customers.html',
    exact: true,
    routes: [
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


describe('makeRoutes', () => {
  it('makeRoutes should return a list of <Route />', () => {
    const routeList = makeRoutes(testRoutes);
    expect(routeList.length).toBe(10);
    expect(routeList.find((r) => r.props.path === '/about-us.html').props.path).toEqual('/about-us.html');
    const routeProps = routeList.find((r) => r.props.path === '/404.html').props;
    expect(routeProps.path).toEqual('/404.html');
  });
  it('makeRoutes should return only one copy per duplicate <Route />', () => {
    const routeList = makeRoutes([{
      path: '/same',
    }, {
      path: '/same',
    }]);
    expect(routeList.length).toBe(1);
  });
  it('makeRoutes should work with Map', () => {
    const routeList = makeRoutes(getRoutesMap(testRoutes));
    expect(routeList.length).toBe(10);
    expect(routeList.find((r) => r.props.path === '/about-us.html').props.path).toEqual('/about-us.html');
    const routeProps = routeList.find((r) => r.props.path === '/404.html').props;
    expect(routeProps.path).toEqual('/404.html');
  });
});
