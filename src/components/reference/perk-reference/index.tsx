import React from 'react';
import { t } from 'i18next';

import { selectors, useSelector } from '../../../store';

import ReferencePopover from '../reference-popover';
import { ReferenceComponent } from '../index';
import { H4 } from '@blueprintjs/core';
import { PerkLevelActions } from '../../../screen/perk-list/perk-view/perk-level-actions';

const Index: ReferenceComponent = (props) => {
  const parts = props.name.split('$');
  const name = parts[0];
  const perk = useSelector((state) =>
    selectors.core.getPerks(state).find((perk) => perk.name === name),
  );

  if (perk == null) {
    return <span>{t('reference:perk.notFound', { notFound: name })}</span>;
  }

  const levelIndex = Number(parts[1]) - 1;
  const level = Number.isNaN(levelIndex) ? null : perk.levels[levelIndex];
  const text = level ? `${perk.name} N${levelIndex + 1}` : perk.name;
  const title = level ? `${perk.name}: ${level.name}` : perk.name;

  const content = (
    <section>
      <header>
        <H4>{title}</H4>
      </header>
      <p>{perk.detail[0]}</p>
      <section>{level && <PerkLevelActions level={level} />}</section>
    </section>
  );
  return <ReferencePopover content={content} text={text} />;
};

export default Index;
