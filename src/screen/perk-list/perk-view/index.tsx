import React from 'react';
import { Card, H3 } from '@blueprintjs/core';
import { selectors, useSelector } from '../../../store';
import { Level } from './level';
import './index.scss';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Condition } from './condition';

export function PerkView() {
  const { perkID = '' } = useParams<{ perkID: string }>();
  const perk = useSelector((state) => {
    const perkByPerkId = selectors.core.getPerkByPerkId(state);
    return perkByPerkId[perkID] ?? { id: '' };
  });

  return (
    <section className={classNames('perk-view')}>
      <header className="perk-view-header">
        <Card>
          <H3>{perk.name}</H3>
          {perk.detail.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </Card>
      </header>
      <div className="perk-view-levels">
        {perk.levels.map((level, i) => {
          const key = `${perk.id}-${i}`;
          return <Level key={key} index={i} level={level} />;
        })}
        <Condition perk={perk} />
      </div>
    </section>
  );
}
