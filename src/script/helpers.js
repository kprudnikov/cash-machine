/**
 * Pushes a value into an array n times. Mutates source array.
 * @param {array} array - array to push value into
 * @param {number} n - number of repeats
 * @param {*} value - value to be pushed
 * @returns {array} - updated array
 */
export function pushNTimes (array, n, value) {
  if (!Array.isArray(array)) throw new TypeError('First argument must be an array');
  if (!isValidNumber(n)) throw new TypeError('Second argument must be a number');

  if(n < 1) return array;
  const maxBatch = 10000;
  while(n > 0) {
    const batch = n >= maxBatch ? maxBatch : n;
    array.push.apply(array, new Array(batch).fill(value));
    n -= batch;
  }

  return array;
}

/**
 * Checks whether a value is a valid finite number
 * @param {*} value - value to check
 * @returns {boolean}
 */
export function isValidNumber(value) {
  return (typeof value === 'number' || value instanceof Number) && !isNaN(value) && value !== Infinity;
}

/**
 * Turns a template into a HTML element. Must have only one root element, if more than one is passed, the rest will be ignored
 * @param {string} template
 * @returns {HTMLElement}
 */
export function renderNodeFromTemplate(template) {
  const fragment = document.createElement('div');
  fragment.innerHTML = template;
  return fragment.children[0];
}