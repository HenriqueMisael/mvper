import React, { ReactNode, useEffect, useState } from 'react';

import './index.scss';

interface FlexibleGridProps {
  items: ReactNode[];
  placeholders: [number, number][];
}

const FlexibleGrid = ({ items, placeholders }: FlexibleGridProps) => {
  const [columns, setColumns] = useState([items]);
  const [columnCount, setColumnCount] = useState(0);

  useEffect(() => {
    const offset = Math.ceil(items.length / columnCount);
    const columns = [];
    for (let i = 0; i < columnCount; i++) {
      const start = offset * i;
      const end = offset * (i + 1);
      columns.push(items.slice(start, end));
    }
    setColumns(columns.filter((column) => column.length > 0));
  }, [items, columnCount, setColumns]);

  useEffect(() => {
    let timeout: number | null = null;
    const handleResize = () => {
      if (timeout != null) window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        const columnCount = placeholders.reduce(
          (acc, [maxWidth, columnCount]) => (maxWidth < window.innerWidth ? columnCount : acc),
          2,
        );
        setColumnCount(columnCount);
      }, 64);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setColumnCount]);

  return (
    <div className="flexible-grid-root">
      {columns.map((column, i) => (
        <div key={i} className="flexible-grid-column">
          {column}
        </div>
      ))}
    </div>
  );
};

export default FlexibleGrid;
