import { Sorcery } from '../../../common/model/sorcery';
import { range } from '../../../common/util';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { t } from 'i18next';

interface Props {
  sorcery: Sorcery;
}

export function SorceryLevelPowerIndicator({ sorcery }: Props) {
  const spheres = sorcery.spheres.reduce((acc, [entity, amount], i) => {
    const classes = ['level', 'dot', 'active', `entity-${entity}`];
    range(amount).forEach((j) => {
      const key = `${sorcery.id}-sphere-${entity}-${i}-${j}`;
      const node = <span key={key} className={classNames(classes)} />;
      acc.push(node);
    });
    return acc;
  }, [] as ReactNode[]);

  const power = t('sorcery-list:power-indicator', { power: sorcery.power });
  const level = t('sorcery-list:level-indicator', { level: sorcery.level });

  const title = `${level}\n${power}`;

  return (
    <div className="sorcery-level-power-indicator" title={title}>
      {spheres}
      {range(spheres.length, 5).map((i) => {
        const classes = ['power', 'dot'];
        if (sorcery.power > i) {
          classes.push('active');
        }
        return <span key={i} className={classNames(classes)} />;
      })}
    </div>
  );
}
