import React from 'react';
import { t } from 'i18next';

import ReferencePopover from './reference-popover';
import { ReferenceComponentProps } from './index';
import UnknownReference from './unknown-reference';

const SimpleReference = (props: ReferenceComponentProps & { context: string }) => {
  const [name, amount] = props.name.split('$');
  const translatePrefix = `reference:simple.${props.context}.`;
  const details = t<string[]>(`${translatePrefix}${name}.detail`);
  const content = (
    <section>
      {details.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  );
  const label = t(`${translatePrefix}${name}.label`);
  if (!label) return <UnknownReference group={`${name}:${props.name}`} />;
  const text = (amount ? `${amount} ` : '') + label;
  return <ReferencePopover content={content} text={text} />;
};

export default SimpleReference;
