import React from 'react';
import { H4 } from '@blueprintjs/core';

import { Perk } from '../../../common/model/perk';
import ReferencePopover from '../reference-popover';

const PerkReferenceWithLevel = (props: { perk: Perk }) => {
  const { perk } = props;
  const text = `${perk.name}`;

  const content = (
    <section>
      <header>
        <H4>{text}</H4>
      </header>
      <section>
        <small>
          {perk.detail.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </small>
      </section>
    </section>
  );
  return <ReferencePopover content={content} text={text} />;
};

export default PerkReferenceWithLevel;
