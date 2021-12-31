import React from 'react';

import { selectors, useSelector } from '../../store';

import { TalentCard } from './talent-card';
import './index.scss';
import FlexibleGrid from '../../components/flexible-grid';

const TalentList = () => {
  const talents = useSelector((state) => {
    return selectors.core.getTalents(state);
  });
  const items = talents.map((talent) => <TalentCard key={talent.id} talent={talent} />);

  return (
    <div className={'screen-root'}>
      <FlexibleGrid
        items={items}
        placeholders={[
          [1025, 3],
          [1201, 4],
          [1441, 5],
          [1921, 7],
        ]}
      />
    </div>
  );
};

export default TalentList;
