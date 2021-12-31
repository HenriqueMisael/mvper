import { ComplexEntity } from './complex-entity';

export interface PerkAction {
  cost: number;
  description: string;
}

export interface PerkLevel {
  name: string;
  actions: PerkAction[];
  preRequirement?: string;
  requirement?: string;
}

export type PerkID = string;
export interface Perk extends ComplexEntity<PerkID, PerkLevel> {
  condition: string;
}

export const importPerks = async () => {
  const response = await fetch('/data/perks.json');
  const json = await response.json();
  return json.map((perk: any, i: number) => {
    const id = `${i + 1}`;
    const { name, detail, levels, condition } = perk;
    return {
      id,
      name,
      detail,
      levels,
      condition,
    } as Perk;
  });
};
