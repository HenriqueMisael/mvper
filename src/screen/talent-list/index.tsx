import React from 'react';

import { selectors, useSelector } from '../../store';

import { TalentCard } from './talent-card';
import './index.scss';
import FlexibleGrid from '../../components/flexible-grid';

const TalentList = () => {
  const talents = useSelector((state) => {
    return selectors.core.getTalents(state);
  });
  const items = talents.map((talent) => {
    const titleSize = 2;
    const descriptionSize = Math.floor(talent.description.length / 32);
    const preRequirementSize = talent.preRequirement
      ? Math.floor(talent.preRequirement.length / 32)
      : 0;
    const ranksCount = talent.ranks.reduce(
      (acc, rank) => acc + Math.floor(rank.description.length / 32),
      0,
    );
    const cardSize = ranksCount + titleSize + descriptionSize + preRequirementSize;
    const node = <TalentCard key={talent.id} talent={talent} />;

    return {
      t: node,
      weight: cardSize,
    };
  });

  return (
    <div className={'screen-root'}>
      <div className="talents-view">
        <FlexibleGrid items={items} size="sm" />
      </div>
    </div>
  );
};

export default TalentList;
