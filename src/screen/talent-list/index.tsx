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
      <div className="talents-view">
        <FlexibleGrid items={items} size="sm" />
      </div>
    </div>
  );
};

export default TalentList;
