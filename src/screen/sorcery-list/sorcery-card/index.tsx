import React from 'react';
import { Card } from '@blueprintjs/core';
import { Sorcery } from '../../../common/model/sorcery';

import { SorceryCardHeader } from './sorcery-card-header';
import SorceryDescription from './sorcery-description';
import { SorceryLevelPowerIndicator } from './sorcery-level-power-indicator';
import './sorcery-card.scss';

interface Props {
  sorcery: Sorcery;
}

const SorceryCard = ({ sorcery }: Props) => {
  const opacity = sorcery.experience.blocked ? 0.25 : 1;
  return (
    <Card style={{ position: 'relative', padding: 0, opacity }}>
      <section className="sorcery-card">
        <div className="sorcery-card-content">
          <SorceryCardHeader sorcery={sorcery} />
          <SorceryDescription sorcery={sorcery} />
        </div>
        <SorceryLevelPowerIndicator sorcery={sorcery} />
      </section>
    </Card>
  );
};

export default SorceryCard;
