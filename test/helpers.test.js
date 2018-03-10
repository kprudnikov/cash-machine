import { expect } from 'chai';

import {
  pushNTimes,
  isValidNumber,
} from '../src/script/helpers';

describe('helper functions:', () => {
  describe('pushNTimes', () => {
    it('throws an error if first argument is not an array', () => {
      expect(pushNTimes).to.throw();
      expect(pushNTimes.bind(null, 1)).to.throw();
      expect(pushNTimes.bind(null, {})).to.throw();
    });

    it('throws an error if second argument is not a valid number', () => {
      expect(pushNTimes.bind(null, [], NaN)).to.throw();
      expect(pushNTimes.bind(null, [], '1')).to.throw();
      expect(pushNTimes.bind(null, [], {})).to.throw();
    });

    it('doesn\'t push when second argument is <= 0', () => {
      const array = [];
      const initialLength = array.length;
      pushNTimes(array, 0, 'test');
      expect(array).to.have.lengthOf(initialLength);
      pushNTimes(array, -1, 'test');
      expect(array).to.have.lengthOf(initialLength);
    });

    it('pushes passed value', () => {
      const array = [];
      const initialLength = array.length;
      const n = 1;
      const pushedValue = 'test';
      pushNTimes(array, n, pushedValue);
      expect(array).to.have.lengthOf(initialLength + n);
      expect(array[array.length - 1]).to.equal(pushedValue);
    });
  });

  describe('isValidNumber', () => {
    it('returns true for number literal', () => {
      expect(isValidNumber(1)).to.be.true;
      expect(isValidNumber(0)).to.be.true;
      expect(isValidNumber(-1)).to.be.true;
    });

    it('returns true for number object', () => {
      const num = new Number(1);
      expect(isValidNumber(num)).to.be.true;
    });

    it('returns false for NaN', () => {
      expect(isValidNumber(NaN)).to.be.false;
    });

    it('returns false for a string', () => {
      expect(isValidNumber('1')).to.be.false;
    });

    it('returns false for null', () => {
      expect(isValidNumber(null)).to.be.false;
    });

    it('returns false for a plain object', () => {
      expect(isValidNumber({})).to.be.false;
    });

    it('returns false for Infinity', () => {
      expect(isValidNumber(Infinity)).to.be.false;
    });

    it('returns false when no arguments are passed', () => {
      expect(isValidNumber()).to.be.false;
    });
  });
});
