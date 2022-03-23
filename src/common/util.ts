export interface WeightedItem<T> {
  t: T;
  weight: number;
}

export function distribute<T>(items: WeightedItem<T>[], groupCount: number): T[][] {
  const columns = Array<T[]>(groupCount);

  const totalWeight = items.reduce((acc, { weight }) => acc + weight, 0);

  const minWeightPerColumn = Math.floor(totalWeight / groupCount);

  let column: T[] = [];
  let weight = 0;

  items.forEach((item) => {
    if (weight < minWeightPerColumn) {
      column.push(item.t);
      weight += item.weight;
    } else {
      columns.push(column);

      column = [item.t];
      weight = item.weight;
    }
  });

  columns.push(column);

  return columns.filter((column) => column.length > 0);
}

export function range(...args: number[]) {
  const start = args.length === 1 ? 0 : args[0];
  const end = args.length === 1 ? args[0] : args[1];

  return Array.from(new Array(end - start).keys()).map((x) => x + start);
}
