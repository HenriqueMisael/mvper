import React, { ReactNode, useRef } from 'react';

import { WeightedItem } from '../../common/util';

import './index.scss';
import { FlexibleGridSize, useFlexibleGrid } from './hooks';

interface FlexibleGridProps {
  items: WeightedItem<ReactNode>[];
  size: FlexibleGridSize;
}

const FlexibleGrid = ({ items, size }: FlexibleGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const columns = useFlexibleGrid({ items, size, ref });

  return (
    <div className="flexible-grid-root" ref={ref}>
      {columns.map((column, i) => {
        const key = `column-${i}`;
        return (
          <div key={key} className="flexible-grid-column">
            {column}
          </div>
        );
      })}
    </div>
  );
};

export default FlexibleGrid;
