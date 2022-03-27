import Papa from 'papaparse';

import { MagicalExperience, MagicalExperienceJSON } from './magical-experience';

export type SorceryID = string;
export type Entity = 'Livre' | PureEntity;
export type PureEntity = 'Azul' | 'Branca' | 'Negra' | 'Verde' | 'Vermelha';

export interface SorceryJSON {
  id: SorceryID;
  name: string;
  description: string;
  entity: Entity;
  experience: MagicalExperienceJSON;
  power: number;
  spheres: [PureEntity, number][];
  usageCount: number;
}

export interface Sorcery {
  id: SorceryID;
  name: string;
  description: string;
  entity: Entity;
  experience: MagicalExperience;
  power: number;
  spheres: [PureEntity, number][];
  level: number;
  usageCount: number;

  incrementExperience(): void;
  decrementExperience(): void;

  toJSON(): SorceryJSON;
}

export abstract class AbstractSorcery<T extends Entity> implements Sorcery {
  constructor(
    public readonly id: SorceryID,
    public readonly name: string,
    public readonly description: string,
    public readonly entity: T,
    protected _usageCount: number,
    protected _experience: MagicalExperience,
    protected _power: number,
    protected _spheres: [PureEntity, number][],
  ) {}

  get usageCount() {
    return this._usageCount;
  }

  get experience() {
    return this._experience;
  }

  get power() {
    return this._power;
  }

  get spheres() {
    return this._spheres;
  }

  get level() {
    return this.spheres.reduce((acc, [_, amount]) => acc + amount, 0);
  }

  static toJSON(sorcery: Sorcery): SorceryJSON {
    const { common, distinct } = sorcery.experience;
    return {
      id: sorcery.id,
      name: sorcery.name,
      description: sorcery.description,
      entity: sorcery.entity,
      experience: { common, distinct },
      usageCount: sorcery.usageCount,
      power: sorcery.power,
      spheres: sorcery.spheres,
    };
  }

  static fromJSON(sorcery: SorceryJSON): Sorcery {
    const {
      id,
      name,
      description,
      entity,
      usageCount,
      experience: { common, distinct },
      power,
      spheres,
    } = sorcery;

    return entity === 'Livre'
      ? new CommonSorcery(
          id,
          name,
          description,
          entity,
          usageCount,
          new MagicalExperience(common, distinct),
          power,
          spheres,
        )
      : new PureSorcery(
          id,
          name,
          description,
          entity,
          usageCount,
          new MagicalExperience(common, distinct),
          power,
          spheres,
        );
  }

  abstract incrementExperience(): void;
  abstract decrementExperience(): void;

  toJSON(): SorceryJSON {
    return AbstractSorcery.toJSON(this);
  }
}

export class PureSorcery<T extends PureEntity> extends AbstractSorcery<T> {
  incrementExperience() {
    this._experience = this.experience.increment();

    if (this.experience.initial) {
      if (this.power < 5) {
        this._power += 1;
      } else if (this.level < 5) {
        this._spheres[0][1] += 1;
        this._power = this.level;
      } else {
        this._spheres[0][1] = 5;
        this._power = 5;
        this._experience = new MagicalExperience(0, 4);
      }
    }
    this._usageCount++;
  }

  decrementExperience() {
    if (this.usageCount === 0) return;

    if (!this.experience.initial) {
      this._experience = this.experience.decrement();
    } else {
      if (this.power > this.level) {
        if (this.level > 1) {
          this._experience = new MagicalExperience(1, 3);
          this._power -= 1;
        }
      } else {
        this._spheres[0][1] -= 1;
        this._power = 5;
        this._experience = new MagicalExperience(1, 3);
      }
    }
    this._usageCount--;
  }
}

export class CommonSorcery extends AbstractSorcery<'Livre'> {
  incrementExperience() {
    if (this.experience.blocked) return;

    this._experience = this.experience.increment();

    if (this.experience.initial) {
      if (this.power < 5) {
        this._power += 1;
      } else {
        this._experience = new MagicalExperience(0, 4);
      }
    }
    this._usageCount++;
  }

  decrementExperience() {
    if (this.usageCount === 0) return;

    if (!this.experience.initial) {
      this._experience = this.experience.decrement();
      this._usageCount--;
    } else if (this.power > this.level) {
      this._experience = new MagicalExperience(1, 3);
      this._power -= 1;
      this._usageCount--;
    }
  }
}

export const pureEntities: PureEntity[] = ['Azul', 'Branca', 'Negra', 'Verde', 'Vermelha'];
export const entities: Entity[] = ['Livre', ...pureEntities];

export const importSorceries = async (): Promise<SorceryJSON[]> => {
  const response = await fetch('/data/sorceries.csv');
  const text = await response.text();
  const parsed = await Papa.parse(text, { delimiter: '\t', header: true });
  return parsed.data
    .filter((data: any) => !!data['Name'])
    .map((data: any, i) => {
      const entity = data['Entity'] as Entity;
      const id = `${entity}-${i + 1}`;
      const power = Number(data['Power']);
      const name = data['Name'];
      const description = data['Description'];
      const experience = new MagicalExperience(0, 0);
      const level = data['Level'] as string;

      if (entity === 'Livre') {
        const spheres = level
          .split(',')
          .map((n, i) => {
            const amount = Number(n);
            if (amount === 0) return null;
            return [pureEntities[i], amount];
          })
          .filter((x) => x != null) as [PureEntity, number][];
        return new CommonSorcery(
          id,
          name,
          description,
          entity,
          0,
          experience,
          power,
          spheres,
        ).toJSON();
      }

      const spheres = [[entity, Number(level)]] as [PureEntity, number][];
      return new PureSorcery(
        id,
        name,
        description,
        entity,
        0,
        experience,
        power,
        spheres,
      ).toJSON();
    });
};
