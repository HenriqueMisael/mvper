import React, { ReactNode, useEffect, useState } from 'react';

import './index.scss';

interface FlexibleGridProps {
  items: ReactNode[];
  size: 'pt' | 'sm' | 'md' | 'lg';
}
const sizes = {
  pt: 256, //16rem
  sm: 320, //20rem
  md: 384, //24rem
  lg: 512, //32rem
};
const FlexibleGrid = ({ items, size }: FlexibleGridProps) => {
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
        const targetColumnWidth = sizes[size];
        const columnCount = Math.floor(window.innerWidth / targetColumnWidth);
        console.log({ targetColumnWidth, achieved: window.innerWidth / columnCount });
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
