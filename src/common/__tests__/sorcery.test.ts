import { CommonSorcery, PureSorcery } from '../model/sorcery';
import { MagicalExperience } from '../model/magical-experience';

describe('PureSorcery.incrementExperience', () => {
  describe('below the common marks limit', () => {
    it('should increase common marks count', () => {
      const sorcery = new PureSorcery('', '', '', 'Azul', 0, new MagicalExperience(0, 0), 1, [
        ['Azul', 1],
      ]);
      sorcery.incrementExperience();
      expect(sorcery.experience.common).toEqual(1);
      expect(sorcery.experience.distinct).toEqual(0);
      expect(sorcery.power).toEqual(1);
      expect(sorcery.level).toEqual(1);

      sorcery.incrementExperience();
      sorcery.incrementExperience();
      sorcery.incrementExperience();
      sorcery.incrementExperience(); // <<- 0/1
      sorcery.incrementExperience();
      expect(sorcery.experience.common).toEqual(1);
      expect(sorcery.experience.distinct).toEqual(1);
      expect(sorcery.power).toEqual(1);
      expect(sorcery.level).toEqual(1);

      sorcery.incrementExperience();
      sorcery.incrementExperience();
      sorcery.incrementExperience(); // <<- 0/2
      sorcery.incrementExperience();
      expect(sorcery.experience.common).toEqual(1);
      expect(sorcery.experience.distinct).toEqual(2);
      expect(sorcery.power).toEqual(1);
      expect(sorcery.level).toEqual(1);

      sorcery.incrementExperience();
      sorcery.incrementExperience(); // <<- 0/3
      sorcery.incrementExperience();
      expect(sorcery.experience.common).toEqual(1);
      expect(sorcery.experience.distinct).toEqual(3);
      expect(sorcery.power).toEqual(1);
      expect(sorcery.level).toEqual(1);
    });
  });
  describe('at the common marks limit', () => {
    describe('at the distinct marks limit', () => {
      describe('below the power limit', () => {
        it('should resets experience and increase power', () => {
          const sorcery = new PureSorcery(
            '',
            '',
            '',
            'Azul',
            0,
            new MagicalExperience(1, 3),
            1,
            [['Azul', 1]],
          );
          sorcery.incrementExperience();
          expect(sorcery.experience.common).toEqual(0);
          expect(sorcery.experience.distinct).toEqual(0);
          expect(sorcery.power).toEqual(2);
          expect(sorcery.level).toEqual(1);
        });
      });
      describe('at the power limit', () => {
        describe('below the level limit', () => {
          it('should resets experience and power, and increase level', () => {
            const sorcery = new PureSorcery(
              '',
              '',
              '',
              'Azul',
              0,
              new MagicalExperience(1, 3),
              5,
              [['Azul', 1]],
            );
            sorcery.incrementExperience();
            expect(sorcery.experience.common).toEqual(0);
            expect(sorcery.experience.distinct).toEqual(0);
            expect(sorcery.power).toEqual(2);
            expect(sorcery.level).toEqual(2);
          });
        });
        describe('at the level limit', () => {
          it('should block the sorcery', () => {
            const sorcery = new PureSorcery(
              '',
              '',
              '',
              'Azul',
              0,
              new MagicalExperience(1, 3),
              5,
              [['Azul', 5]],
            );
            sorcery.incrementExperience();
            expect(sorcery.experience.common).toEqual(0);
            expect(sorcery.experience.distinct).toEqual(4);
            expect(sorcery.power).toEqual(5);
            expect(sorcery.level).toEqual(5);
          });
        });
      });
    });
  });
});
describe('PureSorcery.decrementExperience', () => {
  describe('without usages', () => {
    it('should do nothing', () => {
      const noUsages = new PureSorcery('', '', '', 'Azul', 0, new MagicalExperience(0, 0), 3, [
        ['Azul', 2],
      ]);

      noUsages.decrementExperience();

      expect(noUsages.power).toEqual(3);
      expect(noUsages.level).toEqual(2);
      expect(noUsages.usageCount).toEqual(0);
      expect(noUsages.experience.common).toEqual(0);
      expect(noUsages.experience.distinct).toEqual(0);
    });
  });
  describe('with some usage', () => {
    describe('above initial experience meter', () => {
      it('should decrease experience and usageCount', () => {
        const aboveInitialExperienceMeter = new PureSorcery(
          '',
          '',
          '',
          'Azul',
          2,
          new MagicalExperience(2, 2),
          3,
          [['Azul', 2]],
        );

        aboveInitialExperienceMeter.decrementExperience();

        expect(aboveInitialExperienceMeter.power).toEqual(3);
        expect(aboveInitialExperienceMeter.level).toEqual(2);
        expect(aboveInitialExperienceMeter.usageCount).toEqual(1);
        expect(aboveInitialExperienceMeter.experience.common).toEqual(1);
        expect(aboveInitialExperienceMeter.experience.distinct).toEqual(2);
      });
    });
    describe('at initial experience meter', () => {
      describe('with power above level', () => {
        describe('and level above 1', () => {
          it('should decrement power and usage count, and max out experience', () => {
            const aboveInitialExperienceMeter = new PureSorcery(
              '',
              '',
              '',
              'Azul',
              2,
              new MagicalExperience(0, 0),
              3,
              [['Azul', 2]],
            );

            aboveInitialExperienceMeter.decrementExperience();

            expect(aboveInitialExperienceMeter.power).toEqual(2);
            expect(aboveInitialExperienceMeter.level).toEqual(2);
            expect(aboveInitialExperienceMeter.usageCount).toEqual(1);
            expect(aboveInitialExperienceMeter.experience.common).toEqual(1);
            expect(aboveInitialExperienceMeter.experience.distinct).toEqual(3);
          });
        });
      });
      describe('with power at level', () => {
        it('should decrement level and usage, power up to maximum and max out experience', () => {
          const aboveInitialExperienceMeter = new PureSorcery(
            '',
            '',
            '',
            'Azul',
            2,
            new MagicalExperience(0, 0),
            2,
            [['Azul', 2]],
          );

          aboveInitialExperienceMeter.decrementExperience();

          expect(aboveInitialExperienceMeter.power).toEqual(5);
          expect(aboveInitialExperienceMeter.level).toEqual(1);
          expect(aboveInitialExperienceMeter.usageCount).toEqual(1);
          expect(aboveInitialExperienceMeter.experience.common).toEqual(1);
          expect(aboveInitialExperienceMeter.experience.distinct).toEqual(3);
        });
      });
    });
  });
});

describe('CommonSorcery.incrementExperience', () => {
  describe('below the common marks limit', () => {
    it('should increase common marks count', () => {
      const sorcery = new CommonSorcery(
        '',
        '',
        '',
        'Livre',
        0,
        new MagicalExperience(0, 0),
        1,
        [['Azul', 1]],
      );
      sorcery.incrementExperience();
      expect(sorcery.experience.common).toEqual(1);
      expect(sorcery.experience.distinct).toEqual(0);
      expect(sorcery.power).toEqual(1);
      expect(sorcery.level).toEqual(1);

      sorcery.incrementExperience();
      sorcery.incrementExperience();
      sorcery.incrementExperience();
      sorcery.incrementExperience(); // <<- 0/1
      sorcery.incrementExperience();
      expect(sorcery.experience.common).toEqual(1);
      expect(sorcery.experience.distinct).toEqual(1);
      expect(sorcery.power).toEqual(1);
      expect(sorcery.level).toEqual(1);

      sorcery.incrementExperience();
      sorcery.incrementExperience();
      sorcery.incrementExperience(); // <<- 0/2
      sorcery.incrementExperience();
      expect(sorcery.experience.common).toEqual(1);
      expect(sorcery.experience.distinct).toEqual(2);
      expect(sorcery.power).toEqual(1);
      expect(sorcery.level).toEqual(1);

      sorcery.incrementExperience();
      sorcery.incrementExperience(); // <<- 0/3
      sorcery.incrementExperience();
      expect(sorcery.experience.common).toEqual(1);
      expect(sorcery.experience.distinct).toEqual(3);
      expect(sorcery.power).toEqual(1);
      expect(sorcery.level).toEqual(1);
    });
  });
  describe('at the common marks limit', () => {
    describe('at the distinct marks limit', () => {
      it('should not change experience', () => {
        const sorcery = new CommonSorcery(
          '',
          '',
          '',
          'Livre',
          0,
          new MagicalExperience(1, 3),
          5,
          [['Azul', 1]],
        );
        sorcery.incrementExperience();
        expect(sorcery.experience.common).toEqual(0);
        expect(sorcery.experience.distinct).toEqual(4);
        expect(sorcery.power).toEqual(5);
        expect(sorcery.level).toEqual(1);
      });
    });
  });
});
describe('CommonSorcery.decrementExperience', () => {
  describe('without usages', () => {
    it('should do nothing', () => {
      const noUsages = new CommonSorcery(
        '',
        '',
        '',
        'Livre',
        0,
        new MagicalExperience(0, 0),
        3,
        [['Azul', 2]],
      );

      noUsages.decrementExperience();

      expect(noUsages.power).toEqual(3);
      expect(noUsages.level).toEqual(2);
      expect(noUsages.usageCount).toEqual(0);
      expect(noUsages.experience.common).toEqual(0);
      expect(noUsages.experience.distinct).toEqual(0);
    });
  });
  describe('with some usage', () => {
    describe('above initial experience meter', () => {
      it('should decrease experience and usageCount', () => {
        const aboveInitialExperienceMeter = new CommonSorcery(
          '',
          '',
          '',
          'Livre',
          2,
          new MagicalExperience(2, 2),
          3,
          [['Azul', 2]],
        );

        aboveInitialExperienceMeter.decrementExperience();

        expect(aboveInitialExperienceMeter.power).toEqual(3);
        expect(aboveInitialExperienceMeter.level).toEqual(2);
        expect(aboveInitialExperienceMeter.usageCount).toEqual(1);
        expect(aboveInitialExperienceMeter.experience.common).toEqual(1);
        expect(aboveInitialExperienceMeter.experience.distinct).toEqual(2);
      });
    });
    describe('at initial experience meter', () => {
      describe('with power above level', () => {
        describe('and level above 1', () => {
          it('should decrement power and usage count, and max out experience', () => {
            const aboveInitialExperienceMeter = new CommonSorcery(
              '',
              '',
              '',
              'Livre',
              2,
              new MagicalExperience(0, 0),
              3,
              [['Azul', 2]],
            );

            aboveInitialExperienceMeter.decrementExperience();

            expect(aboveInitialExperienceMeter.power).toEqual(2);
            expect(aboveInitialExperienceMeter.level).toEqual(2);
            expect(aboveInitialExperienceMeter.usageCount).toEqual(1);
            expect(aboveInitialExperienceMeter.experience.common).toEqual(1);
            expect(aboveInitialExperienceMeter.experience.distinct).toEqual(3);
          });
        });
      });
      describe('with power at level', () => {
        it('should do nothing', () => {
          const aboveInitialExperienceMeter = new CommonSorcery(
            '',
            '',
            '',
            'Livre',
            2,
            new MagicalExperience(0, 0),
            2,
            [['Azul', 2]],
          );

          aboveInitialExperienceMeter.decrementExperience();

          expect(aboveInitialExperienceMeter.power).toEqual(2);
          expect(aboveInitialExperienceMeter.level).toEqual(2);
          expect(aboveInitialExperienceMeter.usageCount).toEqual(2);
          expect(aboveInitialExperienceMeter.experience.common).toEqual(0);
          expect(aboveInitialExperienceMeter.experience.distinct).toEqual(0);
        });
      });
    });
  });
});
