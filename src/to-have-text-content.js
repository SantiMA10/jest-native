import { matcherHint } from 'jest-matcher-utils';
import { compose, defaultTo, is, join, map, path } from 'ramda';

import { checkReactElement, getMessage, matches, normalize } from './utils';

function getText(child, currentValue = '') {
  let value = currentValue;

  if (!child) {
    return value;
  } else if (typeof child === 'object') {
    return getText(path(['props', 'children'], child), value);
  } else {
    return `${value}${child}`;
  }
}

export function toHaveTextContent(element, checkWith) {
  checkReactElement(element, toHaveTextContent, this);

  // step 8: enjoy your text content ☺️
  const textContent = compose(
    // step 7: strip out extra whitespace
    normalize,
    // step 6: join the resulting array
    join(''),
    // step 5: map the array to get text content
    map(child => (typeof child === 'object' ? getText(child) : child)),
    // step 4: make sure non-array children end up in an array
    child => (is(Array, child) ? child : [child]),
    // step 3: default to an array
    defaultTo([]),
    // step 2: drill down to the children
    path(['props', 'children']),
    // step 1: get the element
  )(element);

  return {
    pass: matches(textContent, checkWith),
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      return getMessage(
        matcherHint(`${this.isNot ? '.not' : ''}.toHaveTextContent`, 'element', ''),
        `Expected element ${to} have text content`,
        checkWith,
        'Received',
        textContent,
      );
    },
  };
}
