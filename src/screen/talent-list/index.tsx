import React, { useEffect, useState } from 'react';

import { selectors, useSelector } from '../../store';

import { TalentCard } from './talent-card';
import './index.scss';

const placeholders = [
  [1025, 3],
  [1201, 4],
  [1441, 5],
  [1921, 7],
];

const TalentList = () => {
  const talents = useSelector((state) => {
    return selectors.core.getTalents(state);
  });
  const [columns, setColumns] = useState([talents]);
  const [columnCount, setColumnCount] = useState(0);

  useEffect(() => {
    const offset = Math.ceil(talents.length / columnCount);
    const columns = [];
    for (let i = 0; i < columnCount; i++) {
      const start = offset * i;
      const end = offset * (i + 1);
      columns.push(talents.slice(start, end));
    }
    setColumns(columns.filter((column) => column.length > 0));
  }, [talents, columnCount, setColumns]);

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
    <div className={'screen-root'}>
      <div className={'talents-view'}>
        {columns.map((column, i) => (
          <div key={i} className="talents-column">
            {column.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentList;
