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

export function isValidNumber(value) {
  return (typeof value === 'number' || value instanceof Number) && !isNaN(value) && value !== Infinity;
}

export function renderNodeFromTemplate(template) {
  const fragment = document.createElement('div');
  fragment.innerHTML = template;
  return fragment.children[0];
}