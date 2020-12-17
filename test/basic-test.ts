import 'mocha';
import { expect } from 'chai';
import { superpermute, superperm_length } from '../src';

describe("Check that superpermutations have the expected lengths", () => {
  for (let i = 0; i <= 10; i++) {
    const l = Number(superperm_length(i));
    it(`Should produce ${ l } digits of the superpermutation of order ${ i }`, () => {
      let j = 0;
      for (const _ of superpermute(i)) j++;
      expect(j).to.eql(l);
    });
  }
});