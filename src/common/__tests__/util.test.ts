import { distribute } from '../util';

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
