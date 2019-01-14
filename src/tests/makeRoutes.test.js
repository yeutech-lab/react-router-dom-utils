import makeRoutes from '../makeRoutes';

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


describe('makeRoutes', () => {
  it('makeRoutes should return a list of <Route />', () => {
    const routeList = makeRoutes(testRoutes);
    expect(routeList.length).toBe(10);
    expect(routeList.filter((r) => r.props.name === 'aboutUs')[0].props.path).toEqual('/about-us.html');
    expect(routeList.filter((r) => r.props.name === 'notFound')[0].props).toEqual({ name: 'notFound', path: '/404.html' });
  });
});
