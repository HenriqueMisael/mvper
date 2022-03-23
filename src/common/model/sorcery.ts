import Papa from 'papaparse';

export type SorceryID = string;
export type Entity = 'Livre' | PureEntity;
export type PureEntity = 'Azul' | 'Branca' | 'Negra' | 'Verde' | 'Vermelha';

export type Sorcery = {
  id: SorceryID;
  name: string;
  description: string;
  entity: Entity;
  level: number;
  spheres: [PureEntity, number][];
  power: number;
};

const entities: PureEntity[] = ['Azul', 'Branca', 'Negra', 'Verde', 'Vermelha'];

export function parseLevel(
  entityRaw: Entity,
  levelRaw: string,
): [number, [PureEntity, number][]] {
  const splitRaw = levelRaw.split(',');
  const spheres: [PureEntity, number][] =
    entityRaw !== 'Livre'
      ? [[entityRaw, Number(levelRaw)]]
      : (splitRaw
          .map((n, i) => {
            const amount = Number(n);
            if (amount === 0) return null;
            return [entities[i], amount];
          })
          .filter((x) => x != null) as [PureEntity, number][]);
  const level = spheres.reduce((acc, [_, amount]) => acc + amount, 0);
  return [level, spheres];
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
      const [level, spheres] = parseLevel(entity, data['Level']);
      const power = Number(data['Power']);
      const name = data['Name'];
      const description = data['Description'];

      return { id, name, description, entity, level, spheres, power } as Sorcery;
    });
};
