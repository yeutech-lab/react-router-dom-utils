import React from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
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
 *    // OR a ContextConsumer that own it
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
    /** Define if prel oading of chunks should happen */
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
    /** Define if react-router should change the page before or after the chunk is loaded */
    waitChunk: PropTypes.bool,
    /**
     * The route configuration of the application, it supports routes.
     * To work with react-loadable, a route must contain a key named component that is the react-loadable component
     */
    routes: PropTypes.array,
    /**
     * A context consumer that will provide routes from it's context,
     * It also supports routes.
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
    ContextConsumer: null,
  };

  componentWillMount() {
    const { routes, ContextConsumer } = this.props;
    if (routes.length && ContextConsumer && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        'You passed routes and ContextConsumer props. You must use only one, ContextConsumer will be used and routes will be ignored.'
      );
    }
  }

  getComponent(path, routes) {
    let component = null;
    const res = makeRoutes(routes)
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
      for (let i = 0; i < res.length; i += 1) {
        if (res[i].props.component) {
          component = res[i].props.component; // eslint-disable-line prefer-destructuring
          break;
        }
      }
    }
    return component;
  }

  onMouseOver = (e, routes) => {
    e.preventDefault();
    e.stopPropagation();
    const {
      to,
      onMouseOver,
      onPreload,
      onLoaded,
      preload,
    } = this.props;

    const component = this.getComponent(to, routes);

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

  onClick = (e, routes) => {
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
    const component = this.getComponent(to, routes);
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
        {({ routes: contextRoutes }) => (
          <Tag
            onClick={(e) => this.onClick(e, contextRoutes)}
            onFocus={(e) => this.onMouseOver(e, contextRoutes)}
            onMouseOver={(e) => this.onMouseOver(e, contextRoutes)}
            href={to}
            {...rest}
          />
        )}
      </ContextConsumer>
    ) : (
      <Tag
        onClick={(e) => this.onClick(e, routes)}
        onFocus={(e) => this.onMouseOver(e, routes)}
        onMouseOver={(e) => this.onMouseOver(e, routes)}
        href={to}
        {...rest}
      />
    );
  }
}

export default withRouter(Link);
