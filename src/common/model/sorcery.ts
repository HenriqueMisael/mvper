import Papa from 'papaparse';

export type SorceryID = string;
export type Entity = 'Livre' | 'Verde';

export interface Sorcery {
  id: SorceryID;
  name: string;
  description: string;
  entity: Entity;
  level: 1 | 2 | 3 | 4 | 5;
  power: 1 | 2 | 3 | 4 | 5;
}

export const importSorceries = async () => {
  const response = await fetch('/data/sorceries.csv');
  const text = await response.text();
  const parsed = await Papa.parse(text, { delimiter: '\t', header: true });
  return parsed.data
    .filter((data: any) => !!data['Name'])
    .map((data: any, i) => {
      const entity = data['Entity'];
      const id = `${entity}-${i + 1}`;
      const level = Number(data['Level']);
      const power = Number(data['Power']);
      const name = data['Name'];
      const description = data['Description'];

      return { id, name, description, entity, level, power } as Sorcery;
    });
};
