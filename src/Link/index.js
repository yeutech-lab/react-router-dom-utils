import { createElement } from 'react';
import { withRouter } from 'react-router';
import Link from './Link';

export default ({ push, ...rest }) => push
  ? createElement(Link, { ...rest, push })
  : createElement(withRouter(Link), rest);
