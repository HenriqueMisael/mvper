import { AbstractSorcery, Sorcery, SorceryJSON } from '../../../../common/model/sorcery';

export type GrimMorID = string;

export interface GrimMorJSON {
  id: GrimMorID;
  name: string;
  sorceries: SorceryJSON[];
}

export class GrimMor {
  constructor(
    public readonly id: GrimMorID,
    public readonly name: string,
    public readonly sorceries: Sorcery[],
  ) {}

  toJSON(): GrimMorJSON {
    return {
      id: this.id,
      name: this.name,
      sorceries: this.sorceries.map((sorcery) => sorcery.toJSON()),
    };
  }

  static fromJSON(json: GrimMorJSON) {
    return new GrimMor(
      json.id,
      json.name,
      json.sorceries.map((sorceryJSON) => AbstractSorcery.fromJSON(sorceryJSON)),
    );
  }
}
