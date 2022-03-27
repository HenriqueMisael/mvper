import { range } from '../util';

export interface MagicalExperienceJSON {
  common: number;
  distinct: number;
}

export class MagicalExperience {
  constructor(public readonly common: number, public readonly distinct: number) {}

  get initial() {
    return this.common === 0 && this.distinct === 0;
  }

  get blocked() {
    return this.common === 0 && this.distinct === 4;
  }

  get value() {
    return range(5)
      .sort((a, b) => b - a)
      .slice(0, this.distinct)
      .reduce((acc, count) => acc + count, this.common + this.distinct);
  }

  increment() {
    if (this.value === 13) return new MagicalExperience(0, 0);
    switch (this.distinct) {
      case 0:
        if (this.common < 4) return new MagicalExperience(this.common + 1, this.distinct);
        return new MagicalExperience(0, this.distinct + 1);
      case 1:
        if (this.common < 3) return new MagicalExperience(this.common + 1, this.distinct);
        return new MagicalExperience(0, this.distinct + 1);
      case 2:
        if (this.common < 2) return new MagicalExperience(this.common + 1, this.distinct);
        return new MagicalExperience(0, this.distinct + 1);
      case 3:
        if (this.common < 2) return new MagicalExperience(this.common + 1, this.distinct);
    }
    return this;
  }

  decrement() {
    if (this.distinct === 0 && this.common === 0) return this;

    const distinct = this.common > 0 ? this.distinct : this.distinct - 1;
    const common = this.common > 0 ? this.common - 1 : 4 - distinct;

    return new MagicalExperience(common, distinct);
  }
}
