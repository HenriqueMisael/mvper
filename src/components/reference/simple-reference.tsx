import React from 'react';
import { exists, t } from 'i18next';

import ReferencePopover from './reference-popover';
import { ReferenceComponentProps } from './index';
import UnknownReference from './unknown-reference';
import { H4 } from '@blueprintjs/core';

const SimpleReference = (props: ReferenceComponentProps & { context: string }) => {
  const [name, amount] = props.name.split('$');
  const translatePrefix = `reference:simple.${props.context}.${name}`;
  const hasTitle = exists(`${translatePrefix}.title`);
  const detail = t<string[]>(`${translatePrefix}.detail`);

  const content = (
    <section>
      {hasTitle && (
        <header>
          <H4>{t(`${translatePrefix}.title`)}</H4>
        </header>
      )}
      {detail.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  );
  const label = t(`${translatePrefix}.label`);
  if (!label) return <UnknownReference group={`${name}:${props.name}`} />;
  const text = (amount ? `${amount} ` : '') + label;
  return <ReferencePopover content={content} text={text} />;
};

export default SimpleReference;
