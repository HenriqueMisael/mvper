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

export interface Perk {
  id?: PerkID;
  name: string;
  detail: string[];
  levels: PerkLevel[];
  condition: string;
}
