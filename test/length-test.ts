import 'mocha';
import { expect } from 'chai';
import { superperm_length } from '../src';

const expected_lengths = [0n, 1n, 3n, 9n, 33n, 153n, 872n, 5908n, 46205n, 408966n, 4037047n]
describe("Length calculations", () => {
  it("should calculate correct superpermutation lengths", () => {
    const lengths = Array.from({ length: 11 }, (_, i) => superperm_length(i));
    expect(lengths).to.eql(expected_lengths);
  });
});