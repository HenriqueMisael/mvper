import React from 'react';
import { t } from 'i18next';

import ReferencePopover from './reference-popover';
import { ReferenceComponent } from './index';
import UnknownReference from './unknown-reference';

const ActionReference: ReferenceComponent = (props) => {
  const [name, amount] = props.name.split('$');
  const content = (
    <section>
      {t<string[]>(`action:${name}.detail`).map((paragraph) => (
        <p>{paragraph}</p>
      ))}
    </section>
  );
  const label = t(`action:${name}.label`);
  if (!label) return <UnknownReference group={`action:${props.name}`} />;
  const text = (amount ? `${amount} ` : '') + label;
  return <ReferencePopover content={content} text={text} />;
};

export default ActionReference;
