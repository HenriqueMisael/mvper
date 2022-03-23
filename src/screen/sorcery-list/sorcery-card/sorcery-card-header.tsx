import { H4 } from '@blueprintjs/core';
import React from 'react';

import { Sorcery } from '../../../common/model/sorcery';

import SorceryExperienceMeter from './sorcery-experience-meter';

interface Props {
  sorcery: Sorcery;
}

export const SorceryCardHeader = ({ sorcery }: Props) => {
  const experience = 0;
  return (
    <header className="sorcery-card-header">
      <SorceryExperienceMeter entity={sorcery.entity} experience={experience} />
      <H4>{sorcery.name}</H4>
    </header>
  );
};
