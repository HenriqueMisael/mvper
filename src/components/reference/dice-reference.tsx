import React from 'react';
import { H4 } from '@blueprintjs/core';
import { t } from 'i18next';

import { ReferenceComponent } from './index';
import ReferencePopover from './reference-popover';

const ActionReference: ReferenceComponent = (props) => {
  const [count = 0, faceCount = 0] = props.name.split('d').map((x) => Number(x));
  const text = Number.isNaN(count) ? `xd${faceCount}` : `${count}d${faceCount}`;
  const title = Number.isNaN(count)
    ? t('reference:dice.title_undefined', { count, faceCount })
    : t('reference:dice.title', { count, faceCount });
  const content = (
    <section>
      <header>
        <H4>{title}</H4>
      </header>
      {t<string[]>('reference:dice.detail').map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  );
  return <ReferencePopover content={content} text={text} />;
};

export default ActionReference;
