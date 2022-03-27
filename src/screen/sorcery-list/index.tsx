import React, { ReactNode } from 'react';
import { t } from 'i18next';

import FlexibleGrid from '../../components/flexible-grid';
import NoResults from '../../components/no-results';
import { WeightedItem } from '../../common/util';

import SorceryCard from './sorcery-card';
import SorceryListControlPanel from './sorcery-list-control-panel';
import GrimMorSuggestions from './grim-mor/suggestions';
import { useFilteredSorceryList } from './hooks';
import './index.scss';

const SorceryListScreen = () => {
  const filteredSorceries = useFilteredSorceryList();
  const items: WeightedItem<ReactNode>[] = filteredSorceries.map((sorcery) => {
    const key = sorcery.id;
    const node = <SorceryCard key={key} sorcery={sorcery} />;
    return { t: node, weight: 1 };
  });

  return (
    <div className="screen-root sorcery-list-screen-root">
      <SorceryListControlPanel />
      <div style={{ padding: '0 1rem' }}>
        {items.length === 0 && <NoResults label={t('sorcery-list:noResults')} />}
        <GrimMorSuggestions />
        <FlexibleGrid items={items} size="md" />
      </div>
    </div>
  );
};

export default SorceryListScreen;
