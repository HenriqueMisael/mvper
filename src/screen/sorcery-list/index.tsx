import React, { ReactNode } from 'react';

import { useSelector } from '../../store';
import { getSorceries } from '../../store/core/selectors';
import FlexibleGrid from '../../components/flexible-grid';
import { WeightedItem } from '../../common/util';

import SorceryCard from './sorcery-card';
import SorceryListControlPanel from './sorcery-list-control-panel';
import { usePowerFilter, useSelectedEntities, useSphereRequirementFilter } from './hooks';
import './index.scss';

const SorceryListScreen = () => {
  const sorceries = useSelector(getSorceries);
  const [selectedEntities] = useSelectedEntities();
  const [maxSpheres] = useSphereRequirementFilter();
  const [maxPower] = usePowerFilter();

  const items: WeightedItem<ReactNode>[] = sorceries
    .filter((sorcery) => {
      return (
        selectedEntities.includes(sorcery.entity) &&
        sorcery.level <= maxSpheres &&
        sorcery.power <= maxPower
      );
    })
    .map((sorcery) => {
      const key = sorcery.id;
      const node = <SorceryCard key={key} sorcery={sorcery} />;
      return { t: node, weight: 1 };
    });

  return (
    <div className="screen-root sorcery-list-screen-root">
      <SorceryListControlPanel />
      <div style={{ padding: '0 1rem' }}>
        <FlexibleGrid items={items} size="md" />
      </div>
    </div>
  );
};

export default SorceryListScreen;
