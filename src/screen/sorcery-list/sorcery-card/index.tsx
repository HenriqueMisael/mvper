import React from 'react';
import { Card } from '@blueprintjs/core';

import { Sorcery } from '../../../common/model/sorcery';

import './sorcery-card.scss';
import { SorceryCardHeader } from './sorcery-card-header';
import SorceryDescription from './SorceryDescription';
import { SorceryLevelPowerIndicator } from './sorcery-level-power-indicator';

interface Props {
  sorcery: Sorcery;
}

const SorceryCard = ({ sorcery }: Props) => {
  return (
    <Card style={{ padding: 0 }}>
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
