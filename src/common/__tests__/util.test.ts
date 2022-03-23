import { distribute, range } from '../util';

describe('Distributing utility function', () => {
  it('should try to distribute equally', () => {
    expect(
      distribute(
        [
          { t: 1, weight: 1 },
          { t: 2, weight: 1 },
          { t: 3, weight: 1 },
          { t: 4, weight: 1 },
          { t: 5, weight: 1 },
          { t: 6, weight: 1 },
          { t: 7, weight: 1 },
        ],
        3,
      ),
    ).toEqual([
      [1, 2, 3],
      [4, 5],
      [6, 7],
    ]);
  });
  describe('when requested one group', () => {
    it('should return only one group', () => {
      expect(
        distribute(
          [
            { t: 1, weight: 1 },
            { t: 2, weight: 1 },
            { t: 3, weight: 1 },
          ],
          1,
        ),
      ).toEqual([[1, 2, 3]]);
    });
  });
  describe('when requested two groups', () => {
    it('should return two groups', () => {
      expect(
        distribute(
          [
            { t: 1, weight: 1 },
            { t: 2, weight: 1 },
            { t: 3, weight: 1 },
          ],
          2,
        ),
      ).toEqual([[1, 2], [3]]);
    });
    describe("and there's not enough items", () => {
      it('should return only one group', () => {
        expect(distribute([{ t: 1, weight: 1 }], 2)).toEqual([[1]]);
      });
    });
  });
});

describe('Range utility function', () => {
  it('should return a range from 0 to X-1 if only X is provided', () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(3)).toEqual([0, 1, 2]);
    expect(range(1)).toEqual([0]);
  });
  it('should return a range from X to Y-1 if both X and Y are provided', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(2, 5)).toEqual([2, 3, 4]);
    expect(range(2, 3)).toEqual([2]);
    expect(range(0, 1)).toEqual([0]);
  });
  it('should return no interval for X=Y', () => {
    expect(range(1, 1)).toEqual([]);
    expect(range(5, 5)).toEqual([]);
  });
});
