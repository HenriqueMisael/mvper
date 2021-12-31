import React from 'react';
import { useParams } from 'react-router-dom';

import { selectors, useSelector } from '../../store';
import ComplexEntityList from '../../components/complex-entity-list';

import { PerkView } from './perk-view';

const PerkListScreen = () => {
  const { perkID } = useParams();
  const perks = useSelector(selectors.core.getPerks);

  return (
    <ComplexEntityList
      items={perks}
      selected={perkID}
      textRenderer={(perk) => perk.name}
      entityView={PerkView}
      name="perk"
    />
  );
};

export default PerkListScreen;
