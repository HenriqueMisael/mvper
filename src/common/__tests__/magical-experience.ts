import { MagicalExperience } from '../model/magical-experience';

describe('MagicalExperience.increment', () => {
  describe('below the common marks limit', () => {
    it('should increase common marks count', () => {
      const noDistinct = new MagicalExperience(0, 0);
      const noDistinctResult = noDistinct.increment();
      expect(noDistinctResult.common).toEqual(1);
      expect(noDistinctResult.distinct).toEqual(0);

      const oneDistinct = new MagicalExperience(0, 1);
      const oneDistinctResult = oneDistinct.increment();
      expect(oneDistinctResult.common).toEqual(1);
      expect(oneDistinctResult.distinct).toEqual(1);

      const twoDistinct = new MagicalExperience(0, 2);
      const twoDistinctResult = twoDistinct.increment();
      expect(twoDistinctResult.common).toEqual(1);
      expect(twoDistinctResult.distinct).toEqual(2);

      const threeDistinct = new MagicalExperience(0, 3);
      const threeDistinctResult = threeDistinct.increment();
      expect(threeDistinctResult.common).toEqual(1);
      expect(threeDistinctResult.distinct).toEqual(3);
    });
  });
  describe('at the common marks limit', () => {
    describe('with distinct marks below 3', () => {
      it('should increase distinct marks count', () => {
        const noDistinct = new MagicalExperience(4, 0);
        const noDistinctResult = noDistinct.increment();
        expect(noDistinctResult.common).toEqual(0);
        expect(noDistinctResult.distinct).toEqual(1);

        const oneDistinct = new MagicalExperience(3, 1);
        const oneDistinctResult = oneDistinct.increment();
        expect(oneDistinctResult.common).toEqual(0);
        expect(oneDistinctResult.distinct).toEqual(2);

        const twoDistinct = new MagicalExperience(2, 2);
        const twoDistinctResult = twoDistinct.increment();
        expect(twoDistinctResult.common).toEqual(0);
        expect(twoDistinctResult.distinct).toEqual(3);
      });
    });
    describe('with distinct marks at 3', () => {
      it('should resets back to 0', () => {
        const threeDistinct = new MagicalExperience(1, 3);
        const threeDistinctResult = threeDistinct.increment();
        expect(threeDistinctResult.common).toEqual(0);
        expect(threeDistinctResult.distinct).toEqual(0);
      });
    });
  });
});
describe('MagicalExperience.decrement', () => {
  describe('above the common marks limit', () => {
    it('should decrease common marks count', () => {
      const noDistinct = new MagicalExperience(4, 0);
      const noDistinctResult = noDistinct.decrement();
      expect(noDistinctResult.common).toEqual(3);
      expect(noDistinctResult.distinct).toEqual(0);

      const oneDistinct = new MagicalExperience(3, 1);
      const oneDistinctResult = oneDistinct.decrement();
      expect(oneDistinctResult.common).toEqual(2);
      expect(oneDistinctResult.distinct).toEqual(1);

      const twoDistinct = new MagicalExperience(2, 2);
      const twoDistinctResult = twoDistinct.decrement();
      expect(twoDistinctResult.common).toEqual(1);
      expect(twoDistinctResult.distinct).toEqual(2);

      const threeDistinct = new MagicalExperience(1, 3);
      const threeDistinctResult = threeDistinct.decrement();
      expect(threeDistinctResult.common).toEqual(0);
      expect(threeDistinctResult.distinct).toEqual(3);
    });
  });
  describe('at the common marks limit', () => {
    describe('with distinct marks above 0', () => {
      it('should decrease distinct marks count', () => {
        const oneDistinct = new MagicalExperience(0, 1);
        const oneDistinctResult = oneDistinct.decrement();
        expect(oneDistinctResult.common).toEqual(4);
        expect(oneDistinctResult.distinct).toEqual(0);

        const twoDistinct = new MagicalExperience(0, 2);
        const twoDistinctResult = twoDistinct.decrement();
        expect(twoDistinctResult.common).toEqual(3);
        expect(twoDistinctResult.distinct).toEqual(1);

        const threeDistinct = new MagicalExperience(0, 3);
        const threeDistinctResult = threeDistinct.decrement();
        expect(threeDistinctResult.common).toEqual(2);
        expect(threeDistinctResult.distinct).toEqual(2);
      });
    });
    describe('with no distinct marks', () => {
      it('should do nothing', () => {
        const noDistinct = new MagicalExperience(0, 0);
        const noDistinctResult = noDistinct.decrement();
        expect(noDistinctResult.common).toEqual(0);
        expect(noDistinctResult.distinct).toEqual(0);
      });
    });
  });
});
describe('MagicalExperience.value', () => {
  describe('with no distinct orbs', () => {
    it('should return values below 5', () => {
      expect(new MagicalExperience(0, 0).value).toEqual(0);
      expect(new MagicalExperience(1, 0).value).toEqual(1);
      expect(new MagicalExperience(2, 0).value).toEqual(2);
      expect(new MagicalExperience(3, 0).value).toEqual(3);
      expect(new MagicalExperience(4, 0).value).toEqual(4);
    });
  });
  describe('with only one distinct orbs', () => {
    it('should return values below 9', () => {
      expect(new MagicalExperience(0, 1).value).toEqual(5);
      expect(new MagicalExperience(1, 1).value).toEqual(6);
      expect(new MagicalExperience(2, 1).value).toEqual(7);
      expect(new MagicalExperience(3, 1).value).toEqual(8);
    });
  });
  describe('with only two distinct orbs', () => {
    it('should return values below 12', () => {
      expect(new MagicalExperience(0, 2).value).toEqual(9);
      expect(new MagicalExperience(1, 2).value).toEqual(10);
      expect(new MagicalExperience(2, 2).value).toEqual(11);
    });
  });
  describe('with only three distinct orbs', () => {
    it('should return values below 14', () => {
      expect(new MagicalExperience(0, 3).value).toEqual(12);
      expect(new MagicalExperience(1, 3).value).toEqual(13);
    });
  });
});
