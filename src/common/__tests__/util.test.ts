import { distribute } from '../util';

describe('Distributing utility function', () => {
  it('should try to distribute equally', () => {
    expect(distribute([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
      [1, 2, 3],
      [4, 5],
      [6, 7],
    ]);
  });
  describe('when requested one group', () => {
    it('should return only one group', () => {
      expect(distribute([1, 2, 3], 1)).toEqual([[1, 2, 3]]);
    });
  });
  describe('when requested two groups', () => {
    it('should return two groups', () => {
      expect(distribute([1, 2, 3], 2)).toEqual([[1, 2], [3]]);
    });
    describe("and there's not enough items", () => {
      it('should return only one group', () => {
        expect(distribute([1], 2)).toEqual([[1]]);
      });
    });
  });
});
