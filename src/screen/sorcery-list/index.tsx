import React, { ReactNode } from 'react';

import { useSelector } from '../../store';
import { getSorceries } from '../../store/core/selectors';
import FlexibleGrid from '../../components/flexible-grid';
import { WeightedItem } from '../../common/util';

import SorceryCard from './sorcery-card';

const SorceryListScreen = () => {
  const sorceries = useSelector(getSorceries);

  const items: WeightedItem<ReactNode>[] = sorceries.map((sorcery) => {
    const key = sorcery.id;
    const node = <SorceryCard key={key} sorcery={sorcery} />;
    return { t: node, weight: 1 };
  });

  return (
    <div className="screen-root">
      <div style={{ padding: '0 1rem' }}>
        <FlexibleGrid items={items} size="md" />
      </div>
    </div>
  );
};

export default SorceryListScreen;
