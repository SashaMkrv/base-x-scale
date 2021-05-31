const NUM_OF_KEYS = 12;
const EXPONENT = 3;
const ROOT = EXPONENT ** (1/NUM_OF_KEYS);
const STEADY_A = 729;

const getFreq = (root, constant, steps) => constant * root ** steps;

const KEYS = 'awsedftgyhujkolp;\']'.split('').reverse();

const KEY_MAP_ALGO = (() => {
  let map = {};
  for (let i = 0; i < KEYS.length; i++) {
    map[KEYS[i]] = getFreq(ROOT, STEADY_A, -i);
  }
  return map;
})()

export default {
  root: ROOT,
  exponent: EXPONENT,
  keyNum: NUM_OF_KEYS,
  constant: STEADY_A,
  keys: KEY_MAP_ALGO,
  characters: KEYS,
}