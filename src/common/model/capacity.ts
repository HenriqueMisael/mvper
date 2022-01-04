import { ComplexEntity } from './complex-entity';
import Papa from 'papaparse';

export interface CapacityLevel {
  name: string;
  description: string;
}

export type CapacityID = string;
export interface Capacity extends ComplexEntity<CapacityID, CapacityLevel> {
  specializations: string[];
}

export const importCapacities = async () => {
  const response = await fetch('/data/capacities.csv');
  const text = await response.text();
  const parsed = await Papa.parse(text, { delimiter: '\t', header: true });
  return parsed.data
    .filter((data: any) => !!data['Name'])
    .map((data: any) => {
      const id = data['Abbreviation'].toLowerCase();
      const name = data['Name'];
      const detail = [data['Description']];
      const specializations = data['Specialization'].split(', ');
      const levels = [];
      for (let i = -1; i < 6; i++) {
        const [name, description] = data[`${i}`].split(':');
        levels.push({ name, description });
      }

      return {
        id,
        name,
        detail,
        specializations,
        levels,
      } as Capacity;
    });
};
