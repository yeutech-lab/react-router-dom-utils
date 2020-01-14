import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import makeRoutes from './makeRoutes';
import matchParamsPath from './matchParamsPath';

/**
 * @name Link
 * @description
 *
 * This link component can preload a [react-loadable](https://github.com/jamiebuilds/react-loadable#loadablecomponentpreload) chunk on **mouseOver**
 * It can also block the page change before the chunk is loaded,
 * This give control on how the page change should work.
 *
 * @example
 *
 * Usually, you would create a `<Link />` component in your application `src/components/Link/index.js` as follow:
 *
 * ```jsx
 * export default (
 *   <Link
 *    tag={A}
 *    waitChunk={true}
 *    // You can pass routes as props
 *    routes={[{ name: 'Home', component: Home, path: '/' }]}
 *    // Or/With a routes map
 *    routesMap={getRoutesMap([{ name: 'Home', component: Home, path: '/' }])}
 *    // ContextConsumer will override routes and routesMap and get them directly from the ContextConsumer
 *    ContextConsumer={AppContextConsumer}
 *    onClick={actionStartLoadingIndicator}
 *    onPreload={() => console.log(`
 *      chunk load in the background on mouseover or
 *      when user click if waitChunk is true
 *    `)}
 *    onLoaded={actionStopLoadingIndicator}
 *   />
 * );
 * ```
 *
 */
class Link extends React.Component {
  static propTypes = {
    /** The path the link will go to */
    to: PropTypes.string.isRequired,
    /** Pass the component to be used for rendering */
    tag: PropTypes.any,
    /**
     * Avoiding Flash Of Loading Component
     * Sometimes components load really quickly (<200ms) and the loading screen only quickly flashes on the screen.
     * A number of user studies have proven that this causes users to perceive things taking longer than they really have.
     * If you don't show anything, users perceive it as being faster.
     * Useful if you use with waitChunk, To take over the delay of react-loadable
     * When delay is a function, it's return must be the number value of the delay
     *
     * See https://github.com/jamiebuilds/react-loadable#avoiding-flash-of-loading-component
     */
    delay: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
    /** Define if preloading of chunks should happen */
    preload: PropTypes.bool,
    /** Event when click */
    onClick: PropTypes.func,
    /** Event when page has changed */
    onPageChange: PropTypes.func,
    /** Event when preloading start (react-loadable) */
    onPreload: PropTypes.func,
    /** Event when preloading stop  (react-loadable) */
    onLoaded: PropTypes.func,
    /** Event when mouse fly over */
    onMouseOver: PropTypes.func,
    /** Event fired just before the page change */
    onBeforePageChange: PropTypes.func,
    /**
     * Define if react-router should change the page before or after the chunk is loaded
     * When waitChunk is true, it will call the preload of the loadable component before triggering the page change
     * If waitChink is false, it will trigger the page change as soon as possible.
     * This behavior is disabled by default, but is required if you expect to start an animation before freezing the animation for the page change
     */
    waitChunk: PropTypes.bool,
    /**
     * The array of routes configuration of the application.
     * It can be used internally to retrieve the Loadable component.
     * It will be used as a fallback if props.routesMaps does not contains any loadable component.
     */
    routes: PropTypes.array,
    /**
     * The routesMap
     * It can be used internally to retrieve the Loadable component.
     * props.routes when defined will be used as a fallback when no component is found using the routesMap.
     */
    routesMap: PropTypes.instanceOf(Map),
    /**
     * A context consumer that can override props.routes and props.routesMap props
     * The ContextConsumer must consume at least routes or routesMap,
     * If both are in the context, it will first check within routesMap and if it doesn't find it,
     * It will check for the routes to find the Loadable component
     */
    ContextConsumer: PropTypes.any,
    /** @ignore */
    match: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
    /** @ignore */
    history: PropTypes.object.isRequired,
  };

  static defaultProps = {
    tag: 'a',
    delay: 0,
    waitChunk: false,
    preload: true,
    onClick: null,
    onBeforePageChange: null,
    onPageChange: null,
    onPreload: null,
    onLoaded: null,
    onMouseOver: null,
    routes: [],
    routesMap: new Map(),
    ContextConsumer: null,
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { routes, routesMap, ContextConsumer } = this.props;
    if ((routes.length || routesMap.size) && ContextConsumer && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        'You passed routes and/or routesMap and ContextConsumer props. It will skip routes and routesMap and use the ContextConsumer to retrieve them from the context.'
      );
    }
  }

  /**
   * @private
   * @description
   * This function will look through a list of routes configuration object and a routes Map to try to retrieve
   * a component that may be attached to the root.
   * It will look first using the map, and if not found, using the routes
   * @param {string} path - Real path to get component for
   * @param {array} routes - List of route configuration object
   * @param {Map<string, object>|RoutesMap<string, object>} routesMap - Routes map of all routes.
   * @return {component} - React component attached to the routes
   */
  getComponent(path, routes = [], routesMap = new Map()) {
    let component;
    // Find in the map (only work for RoutesMap)
    const inMap = routesMap.get(path);
    if (inMap && inMap.component) {
      return inMap.component;
    }
    // support for routes and standard Map
    const list = [Array.from((routesMap).values()), routes];
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].length) {
        const res = makeRoutes(list[i])
          .filter((route) => {
            const dest = route.props.path;
            if (!dest) {
              return false;
            }
            if (dest === path) {
              return true;
            }
            return matchParamsPath(path, dest);
          });
        if (res.length) {
          let exitLoop = false;
          for (let j = 0; j < res.length; j += 1) {
            if (res[j].props.component) {
              component = res[j].props.component; // eslint-disable-line prefer-destructuring
              exitLoop = true;
              break;
            }
          }
          if (exitLoop) {
            break;
          }
        }
      }
    }
    return component;
  }

  onMouseOver = (e, routes, routesMap) => {
    e.preventDefault();
    e.stopPropagation();
    const {
      to,
      onMouseOver,
      onPreload,
      onLoaded,
      preload,
    } = this.props;

    const component = this.getComponent(to, routes, routesMap);

    if (onMouseOver) {
      onMouseOver();
    }
    if (preload && component && component.preload) {
      if (onPreload) {
        onPreload(e);
      }
      component.preload().then(() => {
        if (onLoaded) {
          onLoaded(e);
        }
      });
    }
  };

  onClick = (e, routes, routesMap) => {
    e.preventDefault();
    e.stopPropagation();
    const {
      to,
      preload,
      onClick,
      onPreload,
      onLoaded,
      waitChunk,
    } = this.props;
    const component = this.getComponent(to, routes, routesMap);
    if (onClick) {
      onClick(e);
    }
    if (preload && waitChunk && component && component.preload) {
      if (onPreload) {
        onPreload(e);
      }
      component.preload().then(() => {
        if (onLoaded) {
          onLoaded(e);
        }
        this.changePage(e, to);
      });
      return;
    }
    this.changePage(e, to);
  };

  changePage = (e, path) => {
    const {
      history,
      delay,
      onPageChange,
      onBeforePageChange,
    } = this.props;
    const timeout = delay === 0 ? (cb) => cb() : setTimeout;
    const ms = typeof delay === 'function' ? delay() : delay;
    if (onBeforePageChange) {
      onBeforePageChange(e);
    }
    timeout(() => {
      if (onPageChange) {
        onPageChange(e);
      }
      history.push(path);
    }, ms);
  };

  render() {
    const {
      tag: Tag,
      to,
      routes,
      routesMap,
      ContextConsumer,
      // unused below
      delay,
      preload,
      match,
      location,
      history,
      onClick,
      onPreload,
      onPageChange,
      onLoaded,
      onMouseOver,
      staticContext, // eslint-disable-line react/prop-types
      waitChunk,
      onBeforePageChange,
      ...rest
    } = this.props;
    return ContextConsumer ? (
      <ContextConsumer>
        {({ routes: contextRoutes, routesMap: contextRoutesMap }) => (
          <Tag
            onClick={(e) => this.onClick(e, contextRoutes, contextRoutesMap)}
            onFocus={(e) => this.onMouseOver(e, contextRoutes, contextRoutesMap)}
            onMouseOver={(e) => this.onMouseOver(e, contextRoutes, contextRoutesMap)}
            href={to}
            {...rest}
          />
        )}
      </ContextConsumer>
    ) : (
      <Tag
        onClick={(e) => this.onClick(e, routes, routesMap)}
        onFocus={(e) => this.onMouseOver(e, routes, routesMap)}
        onMouseOver={(e) => this.onMouseOver(e, routes, routesMap)}
        href={to}
        {...rest}
      />
    );
  }
}

export default withRouter(Link);
