import { shallow } from 'enzyme';
import React from 'react';
import Routes from '../Routes';

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


const renderComponent = ({ routes, ...rest }) => shallow(
  <Routes routes={routes} {...rest} />
);

describe('<Routes />', () => {
  it('should render a <Routes /> tag', () => {
    const renderedComponent = renderComponent({
      routes: testRoutes,
    });
    expect(renderedComponent.length).toBe(1);
    expect(renderedComponent.find('Route').length).toBe(9);
    expect(renderedComponent.find('Redirect').length).toBe(1);
    const theRedirect = renderedComponent.find('Redirect');
    expect(theRedirect.prop('to')).toBe('/404.html');
  });
});
