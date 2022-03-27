import React from 'react';

import { useSelectedGrimMorSorceries } from '../../hooks';
import { pureEntities } from '../../../../common/model/sorcery';

import SuggestionCard from './suggestion-card';
import './index.scss';

const GrimMorSuggestions = () => {
  const grimMorSorceries = useSelectedGrimMorSorceries();
  return grimMorSorceries == null || grimMorSorceries.length > 0 ? null : (
    <div className="grim-mor-suggestions-root">
      {pureEntities.map((entity) => (
        <SuggestionCard entity={entity} />
      ))}
    </div>
  );
};

export default GrimMorSuggestions;
