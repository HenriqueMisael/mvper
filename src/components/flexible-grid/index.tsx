import React, { ReactNode, useRef } from 'react';

import './index.scss';
import { FlexibleGridSize, useFlexibleGrid } from './hooks';

interface FlexibleGridProps {
  items: ReactNode[];
  size: FlexibleGridSize;
}
const FlexibleGrid = ({ items, size }: FlexibleGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const columns = useFlexibleGrid({ items, size, ref });

  return (
    <div className="flexible-grid-root" ref={ref}>
      {columns.map((column, i) => (
        <div key={i} className="flexible-grid-column">
          {column}
        </div>
      ))}
    </div>
  );
};

export default FlexibleGrid;
