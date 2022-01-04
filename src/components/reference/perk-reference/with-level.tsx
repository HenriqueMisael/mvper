import React from 'react';
import ReferencePopover from '../reference-popover';
import { Perk, PerkLevel } from '../../../common/model/perk';
import { H4 } from '@blueprintjs/core';
import { PerkLevelActions } from '../../../screen/perk-list/perk-view/perk-level-actions';

const PerkReferenceWithLevel = (props: {
  perk: Perk;
  levelIndex: number;
  level: PerkLevel;
}) => {
  const { perk, levelIndex, level } = props;
  const text = `${perk.name} N${levelIndex + 1}`;
  const title = `${perk.name}: ${level.name}`;

  const content = (
    <section>
      <header>
        <H4>{title}</H4>
      </header>
      <section>{<PerkLevelActions level={level} />}</section>
    </section>
  );
  return <ReferencePopover content={content} text={text} />;
};

export default PerkReferenceWithLevel;
