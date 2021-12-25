import Papa from 'papaparse';

export type TalentID = string;

type Rank = 'I' | 'II' | 'III' | 'IV' | 'V';

interface TalentRank {
  rank: Rank;
  description: string;
}

export interface Talent {
  id: TalentID;
  name: string;
  description: string;
  preRequirement: string;
  ranks: TalentRank[];
}

const ranksAvailable: Rank[] = ['I', 'II', 'III', 'IV', 'V'];
export const importTalents = async () => {
  const response = await fetch('/data/talents.csv');
  const text = await response.text();
  const parsed = await Papa.parse(text, { delimiter: '\t', header: true });
  return parsed.data
    .filter((data: any) => !!data['Name'])
    .map((data: any, i) => {
      const id = `${i + 1}`;
      const name = data['Name'];
      const description = data['Description'];
      const preRequirement = data['PreRequirement'];

      const ranks: TalentRank[] = ranksAvailable
        .filter((rank) => data[rank])
        .map((rank) => {
          let description = data[rank];
          return {
            rank,
            description,
          };
        });
      return {
        id,
        name,
        description,
        preRequirement,
        ranks,
      };
    });
};
