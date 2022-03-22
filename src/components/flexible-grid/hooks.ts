import { ReactNode, RefObject, useEffect, useState } from 'react';

import { distribute, WeightedItem } from '../../common/util';

const sizes = {
  pt: 256, //16rem
  sm: 320, //20rem
  md: 384, //24rem
  lg: 512, //32rem
};
export type FlexibleGridSize = 'pt' | 'sm' | 'md' | 'lg';

interface Options {
  items: WeightedItem<ReactNode>[];
  ref: RefObject<HTMLElement>;
  size: FlexibleGridSize;
}

export function useFlexibleGrid({ items, ref, size }: Options) {
  const [columns, setColumns] = useState<ReactNode[][]>([]);
  const [columnCount, setColumnCount] = useState(0);

  useEffect(() => {
    setColumns(distribute(items, columnCount));
  }, [items, columnCount, setColumns]);

  useEffect(() => {
    let timeout: number | null = null;
    const handleResize = () => {
      if (timeout != null) window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        const targetColumnWidth = sizes[size];
        const availableWidth = ref.current?.getBoundingClientRect().width ?? 0;
        const columnCount = Math.floor(availableWidth / targetColumnWidth);
        setColumnCount(columnCount);
      }, 64);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setColumnCount]);

  return columns;
}
