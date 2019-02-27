import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import getRoutesMap from '../getRoutesMap';
import Link from '../Link';

// this will mock the loadable component
const LoadableComponent = () => <div />;
LoadableComponent.preload = () => ({ then: (fn) => fn && fn() });

const testRoutes = [
  {
    name: 'home',
    path: '/',
    exact: true,
    component: LoadableComponent,
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
    component: () => <div />,
  },
  {
    name: 'notFoundRedirect',
    from: '*',
    to: '/404.html',
  },
];

const routesMap = getRoutesMap(testRoutes);

const ctx = React.createContext();
const ContextProvider = (props) => <ctx.Provider {...props} value={{ routes: testRoutes }} />;
const ContextConsumer = ctx.Consumer;


const badCtx = React.createContext();
const BadContextProvider = (props) => <badCtx.Provider {...props} value={{ routes: null }} />;
const BadContextConsumer = badCtx.Consumer;

const renderComponent = ({ to, ...rest }) => mount(
  <MemoryRouter initialEntries={[to]}>
    <ContextProvider>
      <Link to={to} {...rest} />
    </ContextProvider>
  </MemoryRouter>
);

describe('<Link />', () => {
  it('should shallow a <Link /> tag', () => {
    const renderedComponent = shallow(<Link />);
    expect(renderedComponent.length).toBe(1);
  });
  it('should mount a <Link /> tag', () => {
    const renderedComponent = renderComponent({
      routes: testRoutes,
      routesMap,
      to: '/404.html',
    });
    expect(renderedComponent.find('a').length).toBe(1);
    expect(renderedComponent.find('a').props().href).toBe('/404.html');
  });
  it('should getComponent with params and found the component', () => {
    const renderedComponent = renderComponent({
      routes: [
        {
          path: '/users/:id/service/:name',
          component: () => <div>Found</div>,
        },
      ],
      to: '/users/4564/service/this-is_cool',
    });
    const link = renderedComponent.find('Link');
    expect(link.instance().getComponent(link.prop('to'), link.prop('routes'))()).toEqual(<div>Found</div>);
  });
  it('should fail to getComponent', () => {
    const renderedComponent = renderComponent({
      routes: [
        {
          path: '/users/:id/service/:name',
          component: () => <div>Found</div>,
        },
      ],
      to: 'users/4564/service/this-is_cool',
    });
    const link = renderedComponent.find('Link');
    expect(link.instance().getComponent(link.prop('to'), link.prop('routes'))).toBe(undefined);
  });
  it('should also fail to getComponent', () => {
    const renderedComponent = renderComponent({
      routes: [
        {
          path: 'users/:id/service/:name',
          component: () => <div>Found</div>,
        },
      ],
      to: '/users/4564/service/this-is_cool',
    });
    const link = renderedComponent.find('Link');
    expect(link.instance().getComponent(link.prop('to'), link.prop('routes'))).toBe(undefined);
  });
  it('should also fail to getComponent', () => {
    const renderedComponent = renderComponent({
      to: '/users/4564/service/this-is_cool',
    });
    const link = renderedComponent.find('Link');
    expect(link.instance().getComponent(link.prop('to'), link.prop('routes'))).toBe(undefined);
  });
  it('should onMouseOver', () => {
    const spy = jest.fn();
    const renderedComponent = renderComponent({
      routes: testRoutes,
      to: '/404.html',
      onMouseOver: spy,
    });
    renderedComponent.simulate('mouseover');
    expect(spy).toHaveBeenCalled();
  });
  it('should onPreload and onLoaded onMouseOver', () => {
    const spy = jest.fn();
    const spyOnLoaded = jest.fn();
    const renderedComponent = renderComponent({
      routes: testRoutes,
      to: '/',
      onPreload: spy,
      onLoaded: spyOnLoaded,
    });
    renderedComponent.simulate('mouseover');
    expect(spy).toHaveBeenCalled();
    expect(spyOnLoaded).toHaveBeenCalled();
  });
  it('should onMouseOver with preload', () => {
    const renderedComponent = renderComponent({
      routes: testRoutes,
      to: '/',
    });
    renderedComponent.simulate('mouseover');
    expect(renderedComponent.length).toBe(1);
  });
  it('should onLoaded onMouseOver', () => {
    const spy = jest.fn();
    const spyOnLoaded = jest.fn();
    const renderedComponent = renderComponent({
      routes: testRoutes,
      to: '/',
      onPreload: spy,
      onLoaded: spyOnLoaded,
    });
    renderedComponent.simulate('mouseover');
    expect(spy).toHaveBeenCalled();
    expect(spyOnLoaded).toHaveBeenCalled();
  });
  it('should onClick onPageChange and onFocus', () => {
    const spy = jest.fn();
    const spyPageChange = jest.fn();
    const spyFocus = jest.fn();
    const renderedComponent = renderComponent({
      routes: testRoutes,
      to: '/404.html',
      onClick: spy,
      onPageChange: spyPageChange,
      onFocus: spyFocus,
    });
    renderedComponent.simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(spyPageChange).toHaveBeenCalled();
    renderedComponent.find('a').prop('onFocus')();
    expect(spyFocus).toHaveBeenCalled();
  });
  it('should onPageChange', () => {
    const spy = jest.fn();
    const renderedComponent = renderComponent({
      routes: testRoutes,
      to: '/404.html',
      onPageChange: spy,
    });
    renderedComponent.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should onBeforePageChange', () => {
    const spy = jest.fn();
    const renderedComponent = renderComponent({
      routes: testRoutes,
      to: '/404.html',
      onBeforePageChange: spy,
    });
    renderedComponent.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should onLoaded', () => {
    const spy = jest.fn();
    const renderedComponent = renderComponent({
      waitChunk: true,
      routes: testRoutes,
      to: '/',
      onLoaded: spy,
    });
    renderedComponent.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should waitChunk and onPreload onClick', () => {
    const spy = jest.fn();
    const spyPageChange = jest.fn();
    const spyLoaded = jest.fn();
    const renderedComponent = renderComponent({
      routes: testRoutes,
      to: '/',
      onPreload: spy,
      onPageChange: spyPageChange,
      onLoaded: spyLoaded,
      waitChunk: true,
    });
    renderedComponent.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should waitChunk and onPreload onClick with routesMap', (done) => {
    const spy = jest.fn();
    const spyPageChange = jest.fn();
    const spyLoaded = jest.fn();
    const renderedComponent = renderComponent({
      routesMap,
      to: '/',
      onPreload: spy,
      onPageChange: spyPageChange,
      onLoaded: spyLoaded,
      waitChunk: true,
    });
    renderedComponent.simulate('click');
    expect(spy).toHaveBeenCalled();
    done();
  });
  it('should waitChunk onClick', () => {
    const renderedComponent = renderComponent({
      routes: testRoutes,
      to: '/',
      waitChunk: true,
    });
    renderedComponent.simulate('click');
    expect(renderedComponent.length).toEqual(1);
  });
  it('should renderWith a ContextConsumer', () => {
    const spy = jest.fn();
    const spyPageChange = jest.fn();
    const spyLoaded = jest.fn();
    const spyFocus = jest.fn();
    const spyMouseover = jest.fn();
    const renderedComponent = renderComponent({
      to: '/',
      onPreload: spy,
      onPageChange: spyPageChange,
      onLoaded: spyLoaded,
      onFocus: spyFocus,
      onMouseOver: spyMouseover,
      waitChunk: true,
      ContextConsumer,
    });
    renderedComponent.find('a').simulate('click');
    expect(spy).toHaveBeenCalled();
    renderedComponent.find('a').prop('onFocus')();
    expect(spyFocus).toHaveBeenCalled();
    renderedComponent.find('a').simulate('mouseover');
    expect(spyMouseover).toHaveBeenCalled();
  });
  it('should throw error due to bad ContextConsumer', () => {
    const renderedComponent = mount(
      <MemoryRouter initialEntries={['/']}>
        <BadContextProvider>
          <Link to="/" ContextConsumer={BadContextConsumer} />
        </BadContextProvider>
      </MemoryRouter>
    );
    expect(renderedComponent.length).toBe(1);
  });
  it('should throw warning due to both routes and ContextConsumer', () => {
    const renderedComponent = mount(
      <MemoryRouter initialEntries={['/']}>
        <ContextProvider>
          <Link to="/" routes={testRoutes} ContextConsumer={ContextConsumer} />
        </ContextProvider>
      </MemoryRouter>
    );
    expect(renderedComponent.length).toBe(1);
  });
  it('should skip preload on mouse over and onClick', () => {
    const onPreLoad = jest.fn();
    const onLoaded = jest.fn();
    const renderedComponent = mount(
      <MemoryRouter initialEntries={['/']}>
        <ContextProvider>
          <Link
            to="/"
            routes={testRoutes}
            ContextConsumer={ContextConsumer}
            preload={false}
            onPreload={onPreLoad}
            onLoaded={onLoaded}
          />
        </ContextProvider>
      </MemoryRouter>
    );
    renderedComponent.find('a').simulate('mouseover');
    expect(onPreLoad).not.toHaveBeenCalled();
    renderedComponent.find('a').simulate('click');
    expect(onLoaded).not.toHaveBeenCalled();
  });

  it('should onClick with delay', () => {
    const onClick = jest.fn();
    const onPageChange = jest.fn();
    const renderedComponent = mount(
      <MemoryRouter initialEntries={['/']}>
        <ContextProvider>
          <Link
            to="/"
            routes={testRoutes}
            ContextConsumer={ContextConsumer}
            preload
            delay={200}
            onClick={onClick}
            onPageChange={onPageChange}
          />
        </ContextProvider>
      </MemoryRouter>
    );
    renderedComponent.find('a').simulate('click');
    expect(onClick).toHaveBeenCalled();
    setTimeout(() => {
      expect(onPageChange).toHaveBeenCalled();
    }, 250);
  }, 300);

  it('should onClick with delay as a function', () => {
    const onClick = jest.fn();
    const onPageChange = jest.fn();
    const renderedComponent = mount(
      <MemoryRouter initialEntries={['/']}>
        <ContextProvider>
          <Link
            to="/"
            routes={testRoutes}
            ContextConsumer={ContextConsumer}
            preload
            delay={() => 200}
            onClick={onClick}
            onPageChange={onPageChange}
          />
        </ContextProvider>
      </MemoryRouter>
    );
    renderedComponent.find('a').simulate('click');
    expect(onClick).toHaveBeenCalled();
    setTimeout(() => {
      expect(onPageChange).toHaveBeenCalled();
    }, 250);
  }, 300);
});
