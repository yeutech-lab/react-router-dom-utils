import React from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import makeRoutes from './makeRoutes';

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
 * ```javascript
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
    /** the path the link will go to */
    to: PropTypes.string.isRequired,
    /** pass the component to be used for rendering */
    tag: PropTypes.any,
    /** event when click */
    onClick: PropTypes.func,
    /** event when page has changed */
    onPageChange: PropTypes.func,
    /** event when preloading start (react-loadable) */
    onPreload: PropTypes.func,
    /** event when preloading stop  (react-loadable) */
    onLoaded: PropTypes.func,
    /** event when mouse fly over */
    onMouseOver: PropTypes.func,
    /** define if react-router should change the page before or after the chunk is loaded */
    waitChunk: PropTypes.bool,
    /** the route list of the application, it supports childRoutes */
    routes: PropTypes.array,
    /**
     * A context consumer that will provide routes from it's context,
     * It also supports childRoutes.
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
    waitChunk: false,
    onClick: null,
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
    return makeRoutes(routes)
      .filter((route) => route.props.path === path)[0]
      .props.component;
  }

  onMouseOver = (e, routes) => {
    e.preventDefault();
    e.stopPropagation();
    const {
      to,
      onMouseOver,
      onPreload,
      onLoaded,
    } = this.props;
    const component = this.getComponent(to, routes);

    if (onMouseOver) {
      onMouseOver();
    }
    if (component.preload) {
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
      history,
      to,
      onClick,
      onPageChange,
      onPreload,
      onLoaded,
      waitChunk,
    } = this.props;
    const component = this.getComponent(to, routes);
    if (onClick) {
      onClick(e);
    }
    if (waitChunk && component.preload) {
      if (onPreload) {
        onPreload(e);
      }
      component.preload().then(() => {
        if (onPageChange) {
          onPageChange(e);
        }
        if (onLoaded) {
          onLoaded(e);
        }
        history.push(to);
      });
      return;
    }
    if (onPageChange) {
      onPageChange(e);
    }
    if (onLoaded) {
      onLoaded(e);
    }
    history.push(to);
  };

  render() {
    const {
      tag: Tag,
      to,
      routes,
      ContextConsumer,
      // unused below
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
      ...rest
    } = this.props;
    return ContextConsumer ? (
      <ContextConsumer>
        {({ routes: contextRoutes }) => (
          <Tag
            {...rest}
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
        {...rest}
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
