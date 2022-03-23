import { H4 } from '@blueprintjs/core';
import React from 'react';

import { Sorcery } from '../../../common/model/sorcery';

import SorceryExperienceMeter from './sorcery-experience-meter';
import UnpinSorceryButton from './unpin-sorcery-button';
import PinSorceryButton from './pin-sorcery-button';
import { useSelectedGrimMorSorceries } from '../hooks';

interface Props {
  sorcery: Sorcery;
}

export const SorceryCardHeader = ({ sorcery }: Props) => {
  const sorceries = useSelectedGrimMorSorceries();
  const isPinned = sorceries?.includes(sorcery) ?? false;

  return (
    <header className="sorcery-card-header">
      <SorceryExperienceMeter sorcery={sorcery} />
      <H4>
        {sorcery.name}
        {isPinned ? (
          <UnpinSorceryButton sorcery={sorcery} />
        ) : (
          <PinSorceryButton sorcery={sorcery} />
        )}
      </H4>
    </header>
  );
};
