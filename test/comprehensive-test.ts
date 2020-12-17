import 'mocha';
import { expect } from 'chai';
import { superpermute } from '../src';

const cases = [
  [5, 120],
  [6, 720],
  [7, 5040],
  [8, 40320],
  [9, 362880],
];

const letters = 'abcdefghij'.split('');

function count<T extends { toString: () => string }>(p: Generator<T>, l: number) {
  const window: T[] = [];
  const ps = new Set<string>();
  for (const d of p) {
    window.push(d);
    if (window.length === l) {
      if ((new Set(window)).size === l) {
        const h = window.join('-');
        ps.add(h);
      }
      window.shift();
    }
  }

  return ps.size;
}

describe("Check that sequences are superpermutations", () => {
  for (const [i, f] of cases) {
    it(`Should produce ${ f } permutations of ${ i } digits`, function() {
      this.timeout(0);
      const size = count(superpermute(i), i);
      expect(size).to.eql(f);
    });

    it(`Should produce ${ f } permutations of ${ i } letters`, function() {
      this.timeout(0);
      const size = count(superpermute(letters.slice(0, i)), i);
      expect(size).to.eql(f);
    });
  }
});