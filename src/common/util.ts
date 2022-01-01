export function distribute<T>(items: T[], groupCount: number): T[][] {
  const columns = Array(groupCount);
  const min = Math.floor(items.length / groupCount);
  const fullColumns = items.length - min * groupCount;
  let start = 0;
  let end = 0;
  for (let i = 0; i < groupCount; i++) {
    const offset =
      fullColumns > i
        ? Math.ceil(items.length / groupCount)
        : Math.floor(items.length / groupCount);
    end += offset;
    columns[i] = items.slice(start, end);
    start = end;
  }

  return columns.filter((column) => column.length > 0);
}
